declare global {
    interface Window {
        responsiveVoice: {
            speak: (text: string, voice: string) => void;
            isPlaying: () => boolean;
            // İhtiyacınıza göre diğer yöntemleri ekleyin
        };
    }
}

export {};
