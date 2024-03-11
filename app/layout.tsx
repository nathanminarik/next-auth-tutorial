import type { Metadata } from 'next';

import './globals.css';
import Nav from './(components)/Nav';
import AuthProvider from './(components)/AuthProvider';

export const metadata: Metadata = {
  title: 'Next Auth Tutorial',
  description: 'Simple nextauth app with custom server and session management',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className="bg-gray-100">
          <Nav />
          <div className="m-2">{children}</div>
        </body>
      </AuthProvider>
    </html>
  );
}
