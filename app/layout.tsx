import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DemandRadar AI',
  description: 'AI-powered demand discovery and opportunity analysis'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
