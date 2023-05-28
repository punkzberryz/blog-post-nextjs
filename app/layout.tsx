import Navbar from "./components/Navbar";
import AuthContext from "./context/AuthContext";
import "./globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next Apps!",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="bg-red-300">
          <AuthContext>
            <>
              <Navbar />
              {children}
            </>
          </AuthContext>
        </main>
      </body>
    </html>
  );
}
