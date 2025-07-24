// Backend proxy pour sécuriser la clé API Kimi
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const KIMI_API_KEY = process.env.KIMI_API_KEY;
const KIMI_API_URL = process.env.KIMI_API_URL || "https://api.moonshot.cn/v1/chat/completions";

app.post('/api/kimi', async (req, res) => {
  const { messages, model = "Kimi-K2-Instruct", temperature = 0.7, max_tokens = 500 } = req.body;
  const payload = {
    model,
    messages,
    temperature,
    max_tokens,
  };
  try {
    const response = await fetch(KIMI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIMI_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const err = await response.text();
      return res.status(response.status).json({ error: err });
    }
    const data = await response.json();
    res.status(200).json({ reply: data.choices?.[0]?.message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Proxy Kimi lancé sur http://localhost:${PORT}`)); 