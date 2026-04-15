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
        url: "https://your-domain.com/ogp.png",
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
    images: ["https://your-domain.com/ogp.png"],
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}