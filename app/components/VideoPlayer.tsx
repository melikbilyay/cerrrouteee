import React, { useRef, useState } from 'react';

interface CustomVideoPlayerProps {
    videoUrl: string;
    title: string;
}

const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({ videoUrl, title }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1); // 0 to 1
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                if ("pause" in videoRef.current) {
                    videoRef.current.pause();
                }
            } else {
                if ("play" in videoRef.current) {
                    videoRef.current.play();
                }
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        if (videoRef.current) {
            if ("volume" in videoRef.current) {
                videoRef.current.volume = newVolume;
            }
        }
        setVolume(newVolume);
    };

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (videoRef.current) {
            const newTime = parseFloat(e.target.value);
            if ("currentTime" in videoRef.current) {
                videoRef.current.currentTime = newTime;
            }
            setCurrentTime(newTime);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            if ("currentTime" in videoRef.current) {
                setCurrentTime(videoRef.current.currentTime);
            }
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            if ("duration" in videoRef.current) {
                setDuration(videoRef.current.duration);
            }
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="custom-video-player">
            <video
                ref={videoRef}
                src={videoUrl}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                className="w-full h-auto"
            />
            <div className="controls mt-2">
                <button onClick={handlePlayPause} className="bg-orange-500 text-white py-1 px-3 rounded mr-2">
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
                <input
                    type="range"
                    min="0"
                    max={duration}
                    step="0.1"
                    value={currentTime}
                    onChange={handleProgressChange}
                    className="w-2/3 mr-2"
                />
                <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
            </div>
            <div className="volume-control mt-2">
                <label className="mr-2">Volume:</label>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-1/4"
                />
            </div>
        </div>
    );
};

export default CustomVideoPlayer;
