import fs from 'fs';
import path from 'path';

async function generateFallbackIndex() {
  try {
    const serverPath = path.resolve('dist/server/server.js');
    if (!fs.existsSync(serverPath)) {
      console.log('dist/server/server.js não encontrado.');
      return;
    }

    const serverModule = await import('../dist/server/server.js');
    const handler = serverModule.default?.fetch || serverModule.default;
    
    // Renderiza a página de autenticação/portal como HTML inicial
    const req = new Request('http://localhost:3000/auth?mode=login&redirect=%2Fportal');
    const res = await handler(req);
    const html = await res.text();

    const clientDir = path.resolve('dist/client');
    if (!fs.existsSync(clientDir)) {
      fs.mkdirSync(clientDir, { recursive: true });
    }

    const indexPath = path.join(clientDir, 'index.html');
    fs.writeFileSync(indexPath, html, 'utf-8');
    console.log('✓ dist/client/index.html gerado com sucesso (' + html.length + ' bytes).');
  } catch (err) {
    console.error('Aviso ao gerar index.html fallback:', err);
  }
}

generateFallbackIndex();
