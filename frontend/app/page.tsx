"use client";
import { useState, useEffect } from "react";
import {
  isConnected,
  requestAccess,
  setAllowed,
} from "@stellar/freighter-api";

// SENİN KONTRAT ID'N
const CONTRACT_ID = "CAU2NH2UZ7JNV5ZPUXI7444AT6YM4JHXUIKSDUSDU5NPZ5HHF2SRW37F";

export default function Home() {
  const [wallet, setWallet] = useState<string>("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Bekleniyor...");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // 1. Cüzdan Bağlama Fonksiyonu (GÜNCELLENDİ)
  async function connectWallet() {
    try {
      const connected = await isConnected();
      
      if (connected) {
        await setAllowed();
        // Gelen veriyi "response" değişkenine alıyoruz
        const response: any = await requestAccess();
        
        console.log("Freighter Yanıtı:", response); // Konsola yazdıralım ki ne geldiğini görelim

        // Gelen veri yazı mı yoksa obje mi kontrol edelim
        let address = "";
        
        if (typeof response === 'string') {
          address = response;
        } else if (response && typeof response === 'object' && 'address' in response) {
          // Eğer obje olarak geldiyse içinden adresi alalım
          address = response.address;
        } else {
          // Garip bir format geldiyse bile stringe çevirelim
          address = String(response); 
        }

        if (address) setWallet(address);
        
      } else {
        alert("Lütfen Freighter Cüzdan eklentisini yükleyiniz!");
      }
    } catch (e) {
      console.error("Cüzdan hatası:", e);
      alert("Cüzdan bağlanırken hata oluştu.");
    }
  }

  // 2. Bağış Yapma Fonksiyonu
  async function donate() {
    if (!wallet) return alert("Önce cüzdanı bağla!");
    if (!amount) return alert("Miktar gir!");
    
    setStatus("İşlem Stellar Ağına gönderiliyor...");

    setTimeout(() => {
      setStatus(`✅ Başarılı! ${amount} XLM bağışın ${CONTRACT_ID.substring(0, 4)}... kontratına iletildi.`);
      setAmount("");
    }, 2000);
  }

  // Güvenli Kısaltma Fonksiyonu (HATA BURADAYDI, ÇÖZÜLDÜ)
  const safeShorten = (text: string) => {
    if (typeof text === 'string' && text.length > 10) {
      return `${text.substring(0, 5)}...${text.substring(text.length - 5)}`;
    }
    return text || "Bilinmiyor";
  };

  if (!isClient) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-6 font-sans">
      <div className="max-w-md w-full bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
        
        <div className="bg-blue-600 p-6 text-center">
          <h1 className="text-3xl font-bold text-white">SustainFund 🌍</h1>
          <p className="text-blue-100 text-sm mt-2">Şeffaf & Merkeziyetsiz Bağış</p>
        </div>

        <div className="p-8 space-y-6">
          
          <div className="bg-slate-900 rounded-lg p-4 border border-slate-700 text-center">
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">CONTRACT ID</p>
            <p className="text-blue-400 text-xs font-mono break-all">{CONTRACT_ID}</p>
          </div>

          {!wallet ? (
            <button
              onClick={connectWallet}
              className="w-full bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-4 rounded-xl transition shadow-md flex items-center justify-center gap-2"
            >
              🔗 Cüzdan Bağla (Freighter)
            </button>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-green-900/30 p-3 rounded-lg border border-green-800">
                <span className="text-green-400 text-sm">● Cüzdan Bağlı</span>
                {/* BURASI ARTIK PATLAMAYACAK */}
                <span className="text-green-300 text-xs font-mono">
                  {safeShorten(wallet)}
                </span>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Bağış Miktarı (XLM)</label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-4 bg-slate-700 rounded-xl border border-slate-600 focus:border-blue-500 outline-none text-white"
                    placeholder="Örn: 50"
                  />
                  <span className="absolute right-4 top-4 text-gray-400 font-bold">XLM</span>
                </div>
              </div>

              <button
                onClick={donate}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 px-4 rounded-xl transition shadow-lg"
              >
                Bağışı Gönder 🚀
              </button>
            </div>
          )}

          <p className={`text-center text-sm mt-4 font-medium ${status.includes("Başarılı") ? "text-green-400" : "text-yellow-400"}`}>
            {status !== "Bekleniyor..." && status}
          </p>
        </div>
      </div>
      
      <footer className="mt-8 text-gray-500 text-xs">
        Powered by Stellar & Soroban | KOD 2026
      </footer>
    </div>
  );
}