import React, { ReactNode } from 'react';
import Navbar from '../components/Navbar.js';

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Header: delegated to Navbar component */}
      <Navbar />

      {/* Main content: center page content horizontally and vertically when possible */}
      <main className="flex-1 w-full bg-gray-50 p-6 flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto">
          {children}
        </div>
      </main>

      {/* Footer: center inner content to align with main */}
      <footer className="bg-gray-100 w-full">
        <div className="max-w-4xl mx-auto w-full text-center text-sm text-gray-600 p-4">
          © 2025 All Kutchi Community's Hub. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
