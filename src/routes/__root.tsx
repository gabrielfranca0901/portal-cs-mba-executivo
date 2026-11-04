import { createRootRoute, Outlet, ScrollRestoration, HeadContent, Scripts } from '@tanstack/react-router';
import { Toaster } from 'sonner';
import appCss from '~/styles/app.css?url';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Portal de Customer Success & Operações — MBA Executivo (v2.0 | 2026)' },
      { name: 'description', content: 'Plataforma oficial de CS, Procedimentos Operacionais Padrão, Guia de Saúde e Calculadora de Rescisão Contratual do MBA Executivo.' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-[#121212] text-zinc-100 antialiased selection:bg-blue-600/30 selection:text-blue-200">
        <Outlet />
        <Toaster
          position="top-right"
          theme="dark"
          closeButton
          richColors
          toastOptions={{
            style: {
              background: '#18181b',
              border: '1px solid #262626',
              color: '#f4f4f5',
            },
          }}
        />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
