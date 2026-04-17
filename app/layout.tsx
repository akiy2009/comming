export const metadata = {
  title: "参加者登録 | Event Check-in",
  description: "イベントの事前登録はこちら。QRコードでスムーズに受付できます。",
  openGraph: {
    title: "参加者登録 | Event Check-in",
    description: "QRコードでスムーズなイベント受付を実現",
    url: "https://comming.wirelessconf.com/",
    siteName: "Event Check-in",
    images: [
      {
        url: "https://comming.wirelessconf.com/ogp.jpg", // ← 修正
        width: 1200,
        height: 630,
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "参加者登録 | Event Check-in",
    description: "QRコードでスムーズなイベント受付",
    images: ["https://comming.wirelessconf.com/ogp.jpg"],
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-indigo-100 min-h-screen">
      {children}
    </div>
  );
}