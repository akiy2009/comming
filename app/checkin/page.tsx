"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

export default function Checkin() {
  const scannerRef = useRef<any>(null);
  const [result, setResult] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

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
        false // ← これが必要（ビルドエラー対策）
      );

      scanner.render(
        (decodedText: string) => {
          if (!result) {
            setResult(decodedText);
            setStatus("success");

            // ここでチェックインAPI叩いてもOK
            console.log("Scanned:", decodedText);
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
  }, [result]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 space-y-6">
      <h1 className="text-2xl font-bold">チェックイン</h1>

      <div
        id="reader"
        className="w-full max-w-md bg-white rounded-xl shadow-md p-4"
      />

      {status === "success" && result && (
        <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg text-sm">
          読み取り成功：{result}
        </div>
      )}

      {status === "error" && (
        <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg text-sm">
          読み取り失敗
        </div>
      )}
    </div>
  );
}
