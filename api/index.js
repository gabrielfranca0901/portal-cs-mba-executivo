import fs from 'fs';
import path from 'path';
import server from '../dist/server/server.js';

export default async function handler(req, res) {
  try {
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
    const url = `${protocol}://${host}${req.url}`;

    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          for (const v of value) headers.append(key, v);
        } else {
          headers.set(key, value);
        }
      }
    }

    let body = undefined;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      body = Buffer.concat(chunks);
    }

    const webReq = new Request(url, {
      method: req.method,
      headers,
      body,
    });

    const serverFetch = server.fetch || (server.default && server.default.fetch) || server.default;
    const webRes = await serverFetch(webReq);

    res.statusCode = webRes.status;

    webRes.headers.forEach((val, key) => {
      if (key.toLowerCase() !== 'content-encoding') {
        res.setHeader(key, val);
      }
    });

    if (webRes.body) {
      const arrayBuffer = await webRes.arrayBuffer();
      res.end(Buffer.from(arrayBuffer));
    } else {
      res.end();
    }
  } catch (err) {
    console.error('Vercel SSR Handler error:', err);
    try {
      const indexPath = path.resolve('dist/client/index.html');
      if (fs.existsSync(indexPath)) {
        res.statusCode = 200;
        res.setHeader('content-type', 'text/html; charset=utf-8');
        res.end(fs.readFileSync(indexPath, 'utf-8'));
        return;
      }
    } catch (fallbackErr) {
      console.error('Fallback error:', fallbackErr);
    }
    res.statusCode = 500;
    res.setHeader('content-type', 'text/plain; charset=utf-8');
    res.end('Erro interno do servidor SSR: ' + err.message);
  }
}
