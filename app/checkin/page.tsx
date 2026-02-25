"use client";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useRef } from "react";

export default function Checkin() {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const isScanningRef = useRef(true);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 250,
    });

    scannerRef.current = scanner;

    scanner.render(async (decodedText) => {
      if (!isScanningRef.current) return; // 🔒 連続防止
      isScanningRef.current = false;

      const res = await fetch("/api/checkin", {
        method: "POST",
        body: JSON.stringify({ decodedText }),
      });

      const data = await res.json();

      if (data.success) {
        alert("チェックイン完了");
      } else {
        alert(data.error);
      }

      // 🔥 カメラ停止（重要）
      await scanner.clear();
    });

    return () => {
      scanner.clear().catch(() => {});
    };
  }, []);

  return <div id="reader" />;
}