const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

const PI_API_KEY = process.env.PI_API_KEY; // 🔒 Securely injected from .env

// ✅ Approve payment
router.post('/approve', async (req, res) => {
  const { paymentId } = req.body;
  const accessToken = req.headers.authorization?.replace('Bearer ', '');

  if (!paymentId || !accessToken) {
    return res.status(400).json({ error: 'Missing paymentId or access token' });
  }

  try {
    const piResponse = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Client-API-Key': PI_API_KEY,
      },
    });

    const data = await piResponse.json();

    if (!piResponse.ok) {
      console.error("❌ Pi approve error:", data);
      return res.status(500).json({ error: 'Approval failed', detail: data });
    }

    return res.json({ txid: data.txid });
  } catch (err) {
    console.error("💥 Server error approving payment:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Complete payment
router.post('/complete', async (req, res) => {
  const { paymentId, txid } = req.body;
  const accessToken = req.headers.authorization?.replace('Bearer ', '');

  if (!paymentId || !txid || !accessToken) {
    return res.status(400).json({ error: 'Missing data' });
  }

  try {
    const piResponse = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Client-API-Key': PI_API_KEY,
      },
      body: JSON.stringify({ txid }),
    });

    const data = await piResponse.json();

    if (!piResponse.ok) {
      console.error("❌ Pi complete error:", data);
      return res.status(500).json({ error: 'Completion failed', detail: data });
    }

    return res.json({ success: true, data });
  } catch (err) {
    console.error("💥 Server error completing payment:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
