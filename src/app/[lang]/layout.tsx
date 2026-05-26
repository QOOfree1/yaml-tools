import { supportedLangs } from "@/lib/i18n";

export async function generateStaticParams() {
  return supportedLangs.map((lang) => ({ lang }));
}

export default function LangLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
