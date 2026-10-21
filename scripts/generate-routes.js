import { Generator, getConfig } from '@tanstack/router-generator';

async function generate() {
  const config = await getConfig({
    routesDirectory: './app/routes',
    generatedRouteTree: './app/routeTree.gen.ts',
  });
  const g = new Generator({
    config,
    root: process.cwd(),
  });
  await g.run();
  console.log('✓ TanStack Route Tree sincronizado com sucesso.');
}

generate().catch((err) => {
  console.error('Falha ao gerar árvore de rotas:', err);
  process.exit(1);
});
