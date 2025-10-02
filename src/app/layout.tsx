import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";



export const metadata: Metadata = {
  title: "Cloud Hosting",
  description: "Cloud Hosting Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="fix-heigth">
          <Toaster position="top-center" reverseOrder={false} />
          {children}
        </main>
        <Footer />
      </body>

    </html>
  );
}
