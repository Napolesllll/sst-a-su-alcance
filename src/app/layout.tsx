import "./globals.css";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ConditionalNav } from "./ConditionalNav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-white text-gray-900">
        <ConditionalNav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
