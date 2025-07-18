const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // 🔑 Loads PI_API_KEY from .env

const paymentRoutes = require('./routes/payments');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// 🔁 Routes
app.use('/payments', paymentRoutes);

app.get('/', (req, res) => {
  res.send('✅ WePi backend is live.');
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
