const express = require('express');
const router = express.Router();

// NOTIFICATION
// cuma buat noifikasi, krn proto jadi ke terminal aja
router.post('/notifications', (req, res) => {
    const { user_id, message } = req.body;
    
    console.log(`[UTILITY LOG] 🔔 Mengirim Notifikasi ke ${user_id}: "${message}"`);
    
    res.json({ sent: true });
});

module.exports = router;