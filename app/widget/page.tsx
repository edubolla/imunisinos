import type { Metadata } from "next";
import ImuniWidgetChat from "@/components/ImuniWidgetChat";

export const metadata: Metadata = {
  title: "Imuni",
  robots: { index: false, follow: false },
};

export default function WidgetPage() {
  return <ImuniWidgetChat />;
}
