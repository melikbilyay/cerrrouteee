'use client';
import './css/globals.css';
import { Inter } from 'next/font/google';
import Header from './components/ui/header';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import MainButton from "@/app/components/MainButton";
import { usePathname } from 'next/navigation';
import BusinessHeader from "@/app/components/ui/BusinessHeader";
import InstructorHeader from "@/app/components/ui/InstructorHeader";
import { useEffect } from 'react';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap'
});

// Açıklama oluşturma fonksiyonu
const generateDescription = (predictions) => {
    const distinctClasses = [...new Set(predictions.map(pred => pred.class))];

    let description = 'Bu fotoğrafta ';

    // Farklı nesne sınıflarını kontrol et
    if (distinctClasses.length > 1) {
        description += `${distinctClasses.join(', ')} gibi birden fazla nesne var.`;
    } else if (distinctClasses.length === 1) {
        description += `bir ${distinctClasses[0]} var.`;
    } else {
        description += 'hiçbir nesne tanımlanamadı.';
    }

    return description;
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    const pathname = usePathname(); // Mevcut yolu al

    // Header belirleme
    let HeaderComponent;
    if (pathname.startsWith('/corporate')) {
        HeaderComponent = BusinessHeader;
    } else if (pathname.startsWith('/instructor')) {
        HeaderComponent = InstructorHeader;
    } else {
        HeaderComponent = Header;
    }

    useEffect(() => {
        const loadCocoSsd = async () => {
            // TensorFlow.js ve CocoSSD modelini yükleyin
            await import('@tensorflow/tfjs'); // TensorFlow.js
            const cocoSsd = await import('@tensorflow-models/coco-ssd');

            const model = await cocoSsd.load(); // CocoSSD modelini yükle
            console.log('CocoSSD modeli yüklendi.');

            // Tüm img etiketlerini bul
            const images = document.querySelectorAll('img');
            images.forEach(async (img) => {
                const predictions = await model.detect(img); // Resmi tahmin et
                const description = generateDescription(predictions); // Açıklamayı oluştur

                // Buton oluştur
                const btn = document.createElement('button');
                btn.textContent = 'Sesli Betimle';
                btn.className = 'betimleme-buton'; // Buton için stil sınıfı
                btn.style.position = 'absolute'; // Konumlandırma
                btn.style.bottom = '10px'; // Alt kenardan 10px yukarı
                btn.style.right = '10px'; // Sağ kenardan 10px içeri
                btn.style.backgroundColor = 'blue'; // Arka plan rengi
                btn.style.color = 'white'; // Yazı rengi
                btn.style.border = 'none'; // Kenarlık yok
                btn.style.padding = '10px 20px'; // İç boşluk
                btn.style.cursor = 'pointer'; // İmleç değiştirme

                // Butona tıklandığında sesli betimleme yap
                btn.onclick = () => {
                    const utterance = new SpeechSynthesisUtterance(description);
                    utterance.lang = 'tr'; // Türkçe ayarla
                    speechSynthesis.speak(utterance); // Sesli olarak betimle
                };


                img.parentElement?.appendChild(btn); // Butonu ekle
            });
        };

        loadCocoSsd();
    }, [pathname]); // Sayfa her değiştiğinde çalışır

    return (
        <html lang="en">
        <head>
            <link rel="icon" href="/fav.jpg" />
            <title>Cerroute</title>
            <meta name="description" content="Cerroute" />
        </head>
        <body className={`${inter.variable} font-inter antialiased bg-white text-gray-900 tracking-tight`}>
        <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
            <AuthProvider>
                <CartProvider>
                    <HeaderComponent />
                    {children}
                </CartProvider>
            </AuthProvider>
            <MainButton />
        </div>
        </body>
        </html>
    );
}
