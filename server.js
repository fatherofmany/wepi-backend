const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ WePi Backend is running!');
});

app.post('/payments/approve', (req, res) => {
  const { paymentId } = req.body;
  // In a real app, you'd verify the paymentId with Pi servers
  const mockTxId = `tx-${Date.now()}`;
  res.json({ txid: mockTxId });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
