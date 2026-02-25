"use client";

import { useEffect, useRef, useState } from "react";

export default function Checkin() {
  const scannerRef = useRef<any>(null);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    let mounted = true;

    const startScanner = async () => {
      const { Html5QrcodeScanner } = await import("html5-qrcode");

      if (!mounted) return;

      const scanner = new Html5QrcodeScanner(
        "reader",
        {
          fps: 10,
          qrbox: 250,
        },
        false
      );

      scanner.render(
        async (decodedText: string) => {
          try {
            // QRの中身がURLの場合に対応
            const id = decodedText.includes("/")
              ? decodedText.split("/").pop()
              : decodedText;

            const res = await fetch("/api/checkin", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                decodedText: id,
              }),
            });

            const result = await res.json();

            if (!res.ok) {
              setStatus("error");
              setMessage(result.error || "チェックイン失敗");
              return;
            }

            setStatus("success");
            setMessage(`${result.user.name} さんチェックイン完了`);

            // スキャン停止（連続実行防止）
            scanner.clear().catch(() => {});
          } catch (err) {
            console.error(err);
            setStatus("error");
            setMessage("通信エラー");
          }
        },
        () => {}
      );

      scannerRef.current = scanner;
    };

    startScanner();

    return () => {
      mounted = false;
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 space-y-6">
      <h1 className="text-2xl font-bold">チェックイン</h1>

      <div
        id="reader"
        className="w-full max-w-md bg-white rounded-xl shadow-md p-4"
      />

      {status === "success" && (
        <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg text-sm">
          {message}
        </div>
      )}

      {status === "error" && (
        <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg text-sm">
          {message}
        </div>
      )}
    </div>
  );
}