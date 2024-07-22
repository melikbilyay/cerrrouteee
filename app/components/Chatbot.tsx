import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    text: string;
    user: boolean;
}

const Chatbot = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isVisible, setIsVisible] = useState(true);
    const router = useRouter();

    const handleSend = () => {
        if (input.trim() !== '') {
            setMessages([...messages, { text: input, user: true }]);
            processInput(input);
            setInput('');
        }
    };

    const processInput = (input: string) => {
        const lowerInput = input.toLowerCase();
        let response = '';

        if (lowerInput.includes('ana sayfa')) {
            response = 'Ana sayfaya yönlendiriliyorsunuz...';
            setTimeout(() => router.push('/'), 1500);
        } else if (lowerInput.includes('hakkımızda')) {
            response = 'Hakkımızda sayfasına yönlendiriliyorsunuz...';
            setTimeout(() => router.push('/about'), 1500);
        } else if (lowerInput.includes('iletişim')) {
            response = 'İletişim sayfasına yönlendiriliyorsunuz...';
            setTimeout(() => router.push('/contact'), 1500);
        } else if (lowerInput.includes('kurslar')) {
            response = 'Kurslar sayfasına yönlendiriliyorsunuz...';
            setTimeout(() => router.push('/courses'), 1500);
        } else if (lowerInput.includes('eğitmenler')) {
            response = 'Eğitmenler sayfasına yönlendiriliyorsunuz...';
            setTimeout(() => router.push('/instructors'), 1500);
        } else {
            response = 'Anlayamadım, lütfen tekrar deneyin.';
        }

        setMessages((prevMessages) => [
            ...prevMessages,
            { text: response, user: false }
        ]);
    };

    const handleClose = () => {
        setIsVisible(false);
    };

    return (
        <>
            {isVisible && (
                <div className="chatbot-container">
                    <div className="chatbot-popup-window">
                        <div className="chatbot-brand-bar">
                            <span className="brand-name">Cerroute</span>
                            <button onClick={handleClose} className="chatbot-exit-button">×</button>
                        </div>
                        <div className="chatbot-messages">
                            <AnimatePresence>
                                {messages.map((msg, index) => (
                                    <motion.div
                                        key={index}
                                        className={`chatbot-message ${msg.user ? 'chatbot-message-user' : 'chatbot-message-bot'}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {msg.text}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            className="chatbot-input"
                            placeholder="Write me..."
                        />
                        <button onClick={handleSend} className="chatbot-send-button">Gönder</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;
