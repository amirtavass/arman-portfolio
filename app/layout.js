import NavBar from "@/app/components/layout/NavBar";
import "@/app/_styles/globals.css";
import { Vazirmatn } from "next/font/google";
import Footer from "./components/layout/Footer";
import { ThemeProvider } from "./contexts/ThemeContext";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-vazirmatn",
});

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable} `}>
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className={vazirmatn.className}>
        <ThemeProvider>
          <NavBar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
