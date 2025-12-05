const express = require('express');
const router = express.Router();
const multer = require('multer'); 
const upload = multer({ storage: multer.memoryStorage() }); 
const db = require('../db'); 


// KREATOR
router.post('/creators/upload', upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'File wajib ada' });
    
    const fakeUrl = `https://storage.gaka.com/${Date.now()}_${req.file.originalname}`;
    
    res.json({ file_url: fakeUrl });
});

// yah tau lah ya
router.get('/creators/:id/works', (req, res) => {
    const works = db.works.filter(w => w.creator_id === req.params.id);
    res.json(works);
});


// WORKS 
// dibawah ini cuma buat nerima judul dll, bakal langsung di simpen ke db tapi status awalnya draft
router.post('/works', (req, res) => {
    const { creator_id, title, description, file_url } = req.body;
    
    const newWork = {
        id: `work_${Date.now()}`, 
        creator_id, 
        title, 
        description, 
        file_url,
        status: 'draft', 
        price: 0
    };
    
    db.works.push(newWork);
    res.json(newWork);
});

// dia bakal cari karya berdasar id terus bisa ubah status, misal dari draft ke published
router.put('/works/:id/status', (req, res) => {
    const work = db.works.find(w => w.id === req.params.id);
    
    if (work) {
        work.status = req.body.status; 
        res.json(work);
    } else {
        res.status(404).json({ error: 'Work not found' });
    }
});


// TIER
// dia buat nentuin tier
router.post('/works/:id/tiers', (req, res) => {
    const price = parseInt(req.body.price);
    
    const newTier = { work_id: req.params.id, price: price };
    db.tiers.push(newTier);
    
    const work = db.works.find(w => w.id === req.params.id);
    if (work) work.price = price;
    
    res.json(newTier);
});


// USER BALANCE 
// dia buat liat saldo user
router.get('/users/:id/balance', (req, res) => {
    const user = db.users.find(u => u.id === req.params.id);
    if (user) res.json({ balance: user.balance });
    else res.status(404).json({ error: 'User not found' });
});

// intinya dia ngeproses pemindahan saldo
router.patch('/users/balance', (req, res) => {
    const { from_user_id, to_user_id, amount } = req.body;
    
    const sender = db.users.find(u => u.id === from_user_id);
    const receiver = db.users.find(u => u.id === to_user_id);

    if (sender && receiver && sender.balance >= amount) {
        sender.balance -= amount; 
        receiver.balance += amount; 
        
        res.json({ status: 'success', sender_new_balance: sender.balance });
    } else {
        res.status(400).json({ error: 'Transaksi gagal / Saldo kurang' });
    }
});

module.exports = router;