import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faComments, faPlus } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import useVoice from '@/app/hook/useVoice'; // Import the custom hook
import Chatbot from './Chatbot';

const MainButton = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showChatbot, setShowChatbot] = useState(false);

    const { isSpeaking, toggleSpeech } = useVoice();

    const toggleExpand = () => {
        if (isExpanded) {
            setShowChatbot(false); // Close chatbot if expanded
        }
        setIsExpanded(!isExpanded);
    };

    const handleVoiceClick = () => {
        toggleSpeech();
    };

    const handleChatbotClick = () => {
        setShowChatbot(!showChatbot);
    };

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
                                initial={{ opacity: 0, y: -50, scale: 0.8 }}
                                animate={{ opacity: 1, y: -70, scale: 1 }}
                                exit={{ opacity: 0, y: -50, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                                className="expanded-button"
                                onClick={handleVoiceClick}
                            >
                                <FontAwesomeIcon icon={faMicrophone} size="lg" />
                            </motion.button>
                            <motion.button
                                initial={{ opacity: 0, y: -120, scale: 0.8 }}
                                animate={{ opacity: 1, y: -140, scale: 1 }}
                                exit={{ opacity: 0, y: -120, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                                className="expanded-button"
                                onClick={handleChatbotClick}
                            >
                                <FontAwesomeIcon icon={faComments} size="lg" />
                            </motion.button>
                        </>
                    )}
                </AnimatePresence>
            </motion.div>

            <motion.button
                className="main-button"
                onClick={toggleExpand}
                initial={{scale: 1}}
                animate={{scale: isExpanded ? 1.2 : 1}}
                exit={{scale: 1}}
                transition={{duration: 0.3}}
            >
                <span className="icon-text">CR</span>
            </motion.button>

            {showChatbot && <Chatbot/>}
        </div>
    );
};

export default MainButton;
