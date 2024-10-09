'use client'

import { useEffect, useState } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

export default function Home() {
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState('');

    // Load TensorFlow model when the component is mounted
    useEffect(() => {
        const loadModel = async () => {
            window.model = await cocoSsd.load();
        };
        loadModel();
    }, []);

    // Function to detect and describe the image
    const describeImage = async (imageElement) => {
        setLoading(true);
        const predictions = await window.model.detect(imageElement);
        setLoading(false);

        if (predictions.length > 0) {
            const detectedObjects = predictions.map(p => p.class).join(', ');
            const desc = `Detected objects: ${detectedObjects}.`;
            setDescription(desc);
            speak(desc);
        } else {
            setDescription('No objects detected.');
            speak('No objects detected.');
        }
    };

    // Web Speech API for voice narration
    const speak = (text) => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        synth.speak(utterance);
    };

    // Add a button to each image for description
    useEffect(() => {
        const images = document.querySelectorAll('img');

        images.forEach((img) => {
            // Create "Describe" button
            const button = document.createElement('button');
            button.innerText = 'Betimle';
            button.style.position = 'absolute';
            button.style.top = '10px';
            button.style.left = '10px';
            button.style.backgroundColor = '#4a90e2';
            button.style.color = 'white';
            button.style.border = 'none';
            button.style.padding = '5px';
            button.style.cursor = 'pointer';
            button.style.zIndex = '10';

            // Add event listener for the button click
            button.addEventListener('click', () => describeImage(img));

            // Wrap the image with a relative container to position the button
            const wrapper = document.createElement('div');
            wrapper.style.position = 'relative';
            wrapper.style.display = 'inline-block';

            // Insert wrapper before image and move image into wrapper
            img.parentNode.insertBefore(wrapper, img);
            wrapper.appendChild(img);
            wrapper.appendChild(button);
        });
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Resim Betimleme ve Seslendirme</h1>
            {loading && <p>Betimleme yapılıyor...</p>}
            {description && <p>{description}</p>}
            <p>Sayfadaki herhangi bir resme "Betimle" butonuna tıklayarak sesli betimleme alabilirsiniz.</p>

            {/* Example images for testing */}
            <img src="/dog_bike_car.jpg" alt="Placeholder" style={{ marginRight: '20px', marginBottom: '20px' }} />
            <img src="/family-and-dog.jpg" alt="Placeholder 2" />
        </div>
    );
}
