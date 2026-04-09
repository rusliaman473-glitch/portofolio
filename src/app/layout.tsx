import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import BackgroundOrbs from "@/components/BackgroundOrbs";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Fuad Baharudin — UI/UX Designer",
  description: "Fuad Baharudin — Senior UI/UX Designer crafting digital experiences that delight users and drive results. Available for freelance & full-time roles.",
  keywords: "UI/UX Designer, Product Designer, Figma, Adobe XD, Interaction Design, Portfolio",
  openGraph: {
    title: "Fuad Baharudin — UI/UX Designer",
    description: "Senior UI/UX Designer crafting digital experiences that delight users and drive results.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />
        <BackgroundOrbs />
        <ScrollProgress />
        <Navbar />
        {children}
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
