const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const db = require('../db'); 

// PUBLISH WORKS
// dia gabungin: upload -> simpan -> set tier -> publish
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
        price: parseInt(req.body.tier_price) 
    };
    
    db.works.push(newWork);
    db.tiers.push({ work_id: newWork.id, price: newWork.price });
    
    console.log(`[Task Log] Karya "${newWork.title}" berhasil dipublish.`);
    console.log('PUBLISH END');

    res.json({ message: 'Sukses publish', data: newWork });
});


// DONATION TRANSACTIONS 
// dia gabungin: cek saldo -> transfer -> kirim notif
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

// CREATOR PROFILE
router.get('/creators/:id', (req, res) => {
    const user = db.users.find(u => u.id === req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    const works = db.works.filter(w => w.creator_id === user.id);
    
    res.json({ creator: user, works: works });
});

module.exports = router;