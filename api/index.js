import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'sholat-work-management' });
});

app.get('*', async (_req, res) => {
  try {
    const htmlPath = path.join(__dirname, '..', 'index.html');
    const html = await fs.readFile(htmlPath, 'utf8');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  } catch (err) {
    // Log the error server-side if desired
    console.error('Failed to read index.html:', err);
    res.status(500).send('Internal Server Error');
  }
});

export default app;
