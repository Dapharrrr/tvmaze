// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import Navigation from './components/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'TVMaze App',
  description: 'Application pour explorer les séries TV',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-gray-900 text-white min-h-screen pb-16`}>
        <main className="container mx-auto px-4 pt-4">
          {children}
        </main>
        <Navigation />
      </body>
    </html>
  );
}
