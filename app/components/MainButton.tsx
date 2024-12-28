'use client';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faComments } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import useVoice from '@/app/hook/useVoice'; // Import the custom hook
import Chatbot from './Chatbot';
import { useVapi } from '@/app/components/vapiai'; // Import useVapi hook

interface MainButtonProps {
    isLoading: boolean;
    onCallButtonClick: () => void;
}

const MainButton: React.FC<MainButtonProps> = ({ isLoading }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showChatbot, setShowChatbot] = useState(false);
    const [isCallActive, setIsCallActive] = useState(false);

    const { toggleSpeech } = useVoice();
    const { startCall, endCall } = useVapi();

    const toggleExpand = () => {
        if (isExpanded) {
            setShowChatbot(false);
        }
        setIsExpanded(!isExpanded);
    };

    const handleVoiceClick = () => {
        toggleSpeech();
    };

    const handleChatbotClick = () => {
        setShowChatbot(!showChatbot);
    };

    const handleCallButtonClick = () => {
        if (isCallActive) {
            setIsCallActive(false);
            endCall();
        } else {
            setIsCallActive(true);
            startCall();
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => { // Specify the type here
            if (event.shiftKey) {
                if (isExpanded) {
                    setIsExpanded(false);
                    if (isCallActive) {
                        setIsCallActive(false);
                        endCall();
                    }
                } else {
                    setIsExpanded(true);
                    setTimeout(() => handleCallButtonClick(), 300);
                }
            }
        };
    
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isExpanded, isCallActive]);

    return (
        <div className="main-button-container">
            <motion.div
                className="buttons-wrapper"
                initial={{ opacity: 0 }}
                animate={{ opacity: isExpanded ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            >
                <AnimatePresence>
                    {isExpanded && (
                        <>
                            <motion.button
                                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                                animate={{ opacity: 1, y: -10, scale: 1 }}
                                exit={{ opacity: 0, y: 50, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                                className="expanded-button"
                                onClick={handleVoiceClick}
                            >
                                <FontAwesomeIcon icon={faMicrophone} size="lg" />
                            </motion.button>
                            <motion.button
                                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                                animate={{ opacity: 1, y: -80, scale: 1 }}
                                exit={{ opacity: 0, y: 50, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                                className="expanded-button"
                                onClick={handleChatbotClick}
                            >
                                <FontAwesomeIcon icon={faComments} size="lg" />
                            </motion.button>
                            <motion.button
                                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                                animate={{ opacity: 1, y: -170, scale: 1.5 }}
                                exit={{ opacity: 0, y: 50, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                                className="expanded-button1"
                                onClick={handleCallButtonClick}
                                disabled={isLoading}
                            >
                                {isLoading
                                    ? 'Connecting...'
                                    : isCallActive
                                        ? 'End Route'
                                        : 'Call Route'}
                            </motion.button>
                        </>
                    )}
                </AnimatePresence>
            </motion.div>

            <motion.button
                className="main-button"
                onClick={toggleExpand}
                initial={{ scale: 1 }}
                animate={{ scale: isExpanded ? 1.2 : 1 }}
                exit={{ scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <span className="icon-text">CR</span>
            </motion.button>

            {showChatbot && <Chatbot />}
        </div>
    );
};

export default MainButton;