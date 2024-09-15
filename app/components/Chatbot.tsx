'use client'
import { useState, useEffect, useRef } from 'react';
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
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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
            setTimeout(() => {
                router.push('/');
                handleClose();
            }, 1500);
        } else if (lowerInput.includes('hakkımızda')) {
            response = 'Hakkımızda sayfasına yönlendiriliyorsunuz...';
            setTimeout(() => {
                router.push('/about');
                handleClose();
            }, 1500);
        } else if (lowerInput.includes('iletişim')) {
            response = 'İletişim sayfasına yönlendiriliyorsunuz...';
            setTimeout(() => {
                router.push('/contact');
                handleClose();
            }, 1500);
        } else if (lowerInput.includes('kurslar')) {
            response = 'Kurslar sayfasına yönlendiriliyorsunuz...';
            setTimeout(() => {
                router.push('/courses');
                handleClose();
            }, 1500);
        } else if (lowerInput.includes('eğitmenler')) {
            response = 'Eğitmenler sayfasına yönlendiriliyorsunuz...';
            setTimeout(() => {
                router.push('/instructors');
                handleClose();
            }, 1500);
        } else if (lowerInput.includes('merhaba')) {
            response = 'Merhaba! Size nasıl yardımcı olabilirim?';
        } else if (lowerInput.includes('teşekkürler')) {
            response = 'Rica ederim! Başka bir şey yardımcı olabilir miyim?';
        } else if (lowerInput.includes('nasılsın')) {
            response = 'Ben bir yapay zekayım, bu yüzden duygularım yok, ama size yardımcı olabilmek için buradayım!';
        } else if (lowerInput.includes('yardım')) {
            response = 'Elbette, nasıl yardımcı olabilirim? Ana sayfa, Hakkımızda, İletişim, Kurslar veya Eğitmenler hakkında bilgi mi almak istiyorsunuz?';
        } else {
            response = 'Anlayamadım, lütfen tekrar deneyin veya farklı bir şey sorun.';
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
                            <div ref={messagesEndRef} />
                        </div>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            className="chatbot-input"
                            placeholder="Bana yaz..."
                        />
                        <button onClick={handleSend} className="chatbot-send-button">Gönder</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;
