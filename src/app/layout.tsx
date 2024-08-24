import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '../styles/styles.css';
import Header from '@/components/Header';
import AuthProvider from '@/components/AuthProvider';
import { LoginProvider } from '@/components/LoginContext';
import React from 'react';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Love Calculator',
  description: 'Calculate your love with your Crush',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LoginProvider>
          <AuthProvider>
            <Header />
            {children}
            <Footer />
          </AuthProvider>
        </LoginProvider>
      </body>
    </html>
  );
}
