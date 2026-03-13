import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CarAdvisorAI — Your AI-Powered Car Buying Expert',
  description:
    'Get personalized car recommendations, compare models, and find your perfect car within budget — powered by Google Gemini AI.',
  keywords: ['car advisor', 'AI car recommendations', 'buy a car', 'car comparison'],
  openGraph: {
    title: 'CarAdvisorAI',
    description: 'AI-powered automotive consultant to help you find your perfect car.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
