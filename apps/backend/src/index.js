const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'qelva-backend', version: '0.1.0-beta' });
});


const intents = [];

// POST /intents/transfer
app.post('/intents/transfer', (req, res) => {
  const body = req.body || {};


  const required = ['id', 'fromPersonaId', 'toAddress', 'tokenMint', 'amountLamports', 'createdAt'];
  const missing = required.filter((key) => !body[key]);

  if (missing.length > 0) {
    return res.status(400).json({
      ok: false,
      error: 'INVALID_INTENT',
      missing
    });
  }

  intents.push(body);

  return res.status(201).json({
    ok: true,
    id: body.id
  });
});

// GET /intents
app.get('/intents', (_req, res) => {
  res.json({ count: intents.length, items: intents });
});

app.listen(PORT, () => {
  console.log(`Qelva backend listening on http://localhost:${PORT}`);
});
