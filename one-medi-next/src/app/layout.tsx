import type { Metadata } from "next";
import { Lexend, Manrope } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { Layout } from "@/components/Layout";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "One Medi | Superapp",
  description: "One Medi - Kurnool's #1 Healthcare App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Material Symbols Outlined */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-25..0&display=block" />
      </head>
      <body
        className={`${lexend.variable} ${manrope.variable} antialiased bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-slate-100 selection:bg-primary/20`}
      >
        <AuthProvider>
          <Layout>
            {children}
          </Layout>
        </AuthProvider>
      </body>
    </html>
  );
}
