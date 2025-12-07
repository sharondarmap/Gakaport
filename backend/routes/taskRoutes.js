const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const db = require('../db');

// public works
router.post('/works/publish', upload.single('file'), (req, res) => {
    console.log('\nPUBLISH START');

    const fakeUrl = `https://storage.gaka.com/${req.file ? req.file.originalname : 'default.jpg'}`;
    
    const newWork = {
        id: `work_${Date.now()}`,
        creator_id: req.body.creator_id,
        title: req.body.title,
        description: req.body.description,
        file_url: fakeUrl,
        status: 'published', 
        price: parseInt(req.body.tier_price) || 0
    };
    
    db.works.push(newWork);
    db.tiers.push({ work_id: newWork.id, price: newWork.price });
    
    console.log(`[Task Log] Karya "${newWork.title}" berhasil dipublish.`);
    console.log('PUBLISH END');

    res.json({ message: 'Sukses publish', data: newWork });
});

// donation transactions
router.post('/donations', (req, res) => {
    console.log('\nDONASI START');
    const { donor_id, creator_id, amount } = req.body;
    const amt = parseInt(amount); 
    
    const donor = db.users.find(u => u.id === donor_id);
    const creator = db.users.find(u => u.id === creator_id);
    
    if (!donor || !creator) return res.status(404).json({ error: 'User invalid' });
    
    if (donor.balance >= amt) {
        donor.balance -= amt;
        creator.balance += amt;
        
        console.log(`[Task Log] Kirim notifikasi sukses ke ${creator.name}`);
        console.log(`[Task Log] Saldo Donor sisa: ${donor.balance}`);
        
        console.log('DONASI END');
        res.json({ status: 'success', message: 'Donasi Berhasil!' });
    } else {
        res.status(400).json({ error: 'Saldo Kurang' });
    }
});

// Featured creators
router.get('/creators/featured', (req, res) => {
    res.json(db.creators || []);
});

// Search creators
router.get('/creators/search', (req, res) => {
    const q = (req.query.q || '').toString().toLowerCase();
    if (!q) return res.json(db.creators || []);
    const results = (db.creators || []).filter(c =>
        (c.name || '').toLowerCase().includes(q) ||
        (c.description || '').toLowerCase().includes(q) ||
        (c.bio || '').toLowerCase().includes(q)
    );
    res.json(results);
});

//sum donations by user
function donatedThisMonth(userId, creatorId) {
    const now = new Date();
    return (db.transactions || []).reduce((sum, t) => {
        if (t.fromUserId !== userId) return sum;
        if (t.toCreatorId !== creatorId) return sum;
        if (!t.timestamp) return sum;
        const txDate = new Date(t.timestamp);
        if (txDate.getFullYear() === now.getFullYear() && txDate.getMonth() === now.getMonth()) {
            return sum + (parseInt(t.amount, 10) || 0);
        }
        return sum;
    }, 0);
}

// Get creator details, including exclusive access info
router.get('/creators/:id', (req, res) => {
    const creator = (db.creators || []).find(c => c.id === req.params.id);
    if (!creator) return res.status(404).json({ error: 'Creator not found' });

    let userId = req.query.userId;
    if (!userId && db.currentUser && db.currentUser.id) {
        userId = db.currentUser.id;
    }

    if (!userId) {
        return res.json(creator);
    }

    const required = parseInt(creator.exclusiveUnlockPrice || 0, 10) || 0;
    const donated = donatedThisMonth(userId, creator.id);
    const hasAccess = required > 0 && donated >= required;

    return res.json({
        creator,
        exclusive: {
            required,
            donatedThisMonth: donated,
            hasAccess
        }
    });
});

router.post('/creators/:id/exclusive', (req, res) => {
    const creator = (db.creators || []).find(c => c.id === req.params.id);
    if (!creator) return res.status(404).json({ error: 'Creator not found' });

    const price = parseInt(req.body.price, 10);
    if (isNaN(price) || price < 0) return res.status(400).json({ error: 'Invalid price' });

    creator.exclusiveUnlockPrice = price;
    res.json({ status: 'success', creator });
});

// Creator works
router.get('/creators/:id/works', (req, res) => {
    const works = (db.works || []).filter(w => w.creator_id === req.params.id);
    res.json(works);
});

// Current user info
router.get('/user/me', (req, res) => {
    res.json(db.currentUser || null);
});

// Send "sleep" (donation)
router.post('/sleep/send', (req, res) => {
    const { fromUserId, toCreatorId, amount, message } = req.body;
    const amt = parseInt(amount);
    const user = db.currentUser && db.currentUser.id === fromUserId ? db.currentUser : null;

    if (!user) {
        return res.status(404).json({ error: 'Sender not found' });
    }

    if (user.sleepBalance < amt) {
        return res.status(400).json({ error: 'Insufficient balance' });
    }

    // Deduct from sender
    user.sleepBalance -= amt;

    // Add to creator (if exists)
    const creator = (db.creators || []).find(c => c.id === toCreatorId);
    if (creator) {
        creator.sleepBalance = (creator.sleepBalance || 0) + amt;
        creator.sleepReceived = (creator.sleepReceived || 0) + amt;
    }

    // Add transaction with timestamp (ISO)
    const tx = {
        id: `t${Date.now()}`,
        fromUserId,
        fromUserName: user.name,
        toCreatorId,
        toCreatorName: creator ? creator.name : 'Unknown',
        amount: amt,
        timestamp: new Date().toISOString(),
        message
    };
    db.transactions.unshift(tx);

    res.json({ status: 'success', newBalance: user.sleepBalance, tx });
});

// Get sleep transactions for a user (sent or received)
router.get('/sleep/transactions/:userId', (req, res) => {
    const userId = req.params.userId;
    const results = (db.transactions || []).filter(t => t.fromUserId === userId || t.toCreatorId === userId);
    res.json(results);
});

// Withdraw sleep (creator converts received into spendable balance)
router.post('/sleep/withdraw', (req, res) => {
    const { userId, amount } = req.body;
    const amt = parseInt(amount);
    // Support only currentUser for now
    if (!db.currentUser || db.currentUser.id !== userId) {
        return res.status(404).json({ error: 'User not found' });
    }
    const cu = db.currentUser;
    if (!cu.creatorProfile || (cu.creatorProfile.sleepBalance || 0) < amt) {
        return res.status(400).json({ error: 'Insufficient creator balance' });
    }

    cu.creatorProfile.sleepBalance -= amt;
    cu.sleepBalance = (cu.sleepBalance || 0) + amt;
    res.json({ status: 'success', newBalance: cu.sleepBalance });
});

module.exports = router;