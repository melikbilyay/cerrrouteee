'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Message {
    text: string;
    user: boolean;
}

// Add SpeechRecognition type declaration here
interface SpeechRecognition extends EventTarget {
    new (): SpeechRecognition;
    start: () => void;
    stop: () => void;
    lang: string;
    interimResults: boolean;
    onresult: (event: SpeechRecognition) => void;
    onend: () => void;
    onerror: (event: SpeechRecognition) => void;
}

declare var SpeechRecognition: {
    prototype: SpeechRecognition;
    new (): SpeechRecognition;
};

declare global {
    interface Window {
        webkitSpeechRecognition: typeof SpeechRecognition;
    }
}

const Chatbot = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isVisible, setIsVisible] = useState(true);
    const [listening, setListening] = useState(false);
    const router = useRouter();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<SpeechRecognition | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (input.trim() !== '') {
            const userMessage = { text: input, user: true };
            setMessages((prev) => [...prev, userMessage]);

            if (input.toLowerCase() === 'corporate sayfasına gitmek istiyorum') {
                setIsVisible(false);
                router.push('/corporate');
                setInput('');
                return;
            }

            await processInput(input);
            setInput('');
        }
    };

    const processInput = async (input: string) => {
        try {
            const response = await axios.post('/api/openai', { message: input });
            const assistantResponse = response.data.assistantResponse;

            setMessages((prev) => [
                ...prev,
                { text: assistantResponse, user: false }
            ]);
        } catch (error) {
            console.error('Error communicating with OpenAI API:', error);
            setMessages((prev) => [
                ...prev,
                { text: 'AI ile iletişimde bir hata oluştu.', user: false }
            ]);
        }
    };

    const handleClose = () => {
        setIsVisible(false);
        if (recognitionRef.current) {
            if ("stop" in recognitionRef.current) {
                recognitionRef.current.stop();
            }
        }
    };

    const startRecognition = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert('Sesli tanıma desteklenmiyor. Lütfen başka bir tarayıcı kullanın.');
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.interimResults = true;
        recognition.lang = 'tr-TR';

        recognitionRef.current = recognition;

        recognition.start();
        setListening(true);
        setMessages((prev) => [...prev, { text: 'Sizi dinliyorum...', user: false }]);

        let silenceTimeout: NodeJS.Timeout;

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);

            clearTimeout(silenceTimeout);

            silenceTimeout = setTimeout(() => {
                recognition.stop();
                setListening(false);
                handleSend();
            }, 1000);
        };

        recognition.onend = () => {
            clearTimeout(silenceTimeout);
            if (input.trim() !== '') {
                handleSend();
            }
            setListening(false); // Update listening state when recognition ends
        };

        recognition.onerror = (event) => {

            setListening(false);
        };
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
                        <button
                            onClick={startRecognition}
                            className={`chatbot-mic-button ${listening ? 'listening' : ''}`}
                        >
                            <FontAwesomeIcon icon={faMicrophone} />
                        </button>
                    </div>
                </div>
            )}
            <style jsx>{`
                .chatbot-mic-button {
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    transition: opacity 0.3s;
                }
                .chatbot-mic-button.listening {
                    animation: blink 0.8s infinite alternate;
                }
                @keyframes blink {
                    0% {
                        opacity: 1;
                    }
                    100% {
                        opacity: 0.2;
                    }
                }
            `}</style>
        </>
    );
};

export default Chatbot;
