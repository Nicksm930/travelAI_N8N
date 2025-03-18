import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, Montserrat } from 'next/font/google';


const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair'
});

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat'
});

export const metadata: Metadata = {
  title: 'Travel Explorer',
  description: 'Discover amazing places around the world',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${montserrat.variable}`}>
        
          {children}
        
      </body>
    </html>
  );
}