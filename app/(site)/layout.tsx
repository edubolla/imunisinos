import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ImuniChat from "@/components/ImuniChat";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="sticky top-0 z-50">
        <ImuniChat />
        <Header />
      </div>
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
