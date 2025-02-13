import React, { useState, useRef } from "react";
import Slider from "react-slick";
import ReactPlayer from "react-player";
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp, FaExpand } from "react-icons/fa"; 

const videos = [
    {
        name: "Animation Reel",
        thumbnail: "./assets/Imagerender1.png",
        videoSrc: "./assets/Car_chase.mp4",
        metadata: "Rendered in Blender | 2024",
    },
    {
        name: "Sci-Fi Short",
        thumbnail: "/assets/scifi_thumbnail.png",
        videoSrc: "/assets/scifi.mp4",
        metadata: "Rendered in Unreal Engine | 2023",
    },
    {
        name: "Car Showcase",
        thumbnail: "/assets/car_thumbnail.png",
        videoSrc: "/assets/car.mp4",
        metadata: "Rendered in Blender | 2023",
    },
];

const VideoRendersSection = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [centeredVideoIndex, setCenteredVideoIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const playerRef = useRef(null);
    const sectionRef = useRef(null); // Reference for the Video Renders section

    const settings = {
        centerMode: true,
        centerPadding: "0px",
        slidesToShow: 1,
        infinite: true,
        speed: 500,
        arrows: true,
        focusOnSelect: true,
        beforeChange: (current, next) => setCenteredVideoIndex(next),
    };

    const handleVideoClick = (index) => {
        if (index === centeredVideoIndex) {
            setSelectedVideo(videos[index]);
        }
    };

    const handleVideoEnd = () => {
        setSelectedVideo(null);
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const handleFullscreen = () => {
        if (playerRef.current) {
            const playerElement = playerRef.current.getInternalPlayer();
            if (playerElement.requestFullscreen) {
                playerElement.requestFullscreen();
            }
        }
    };

    return (
        <div ref={sectionRef} className="video-section">
            <h2 className="section-title">Video Renders</h2>

            <Slider {...settings}>
                {videos.map((video, index) => (
                    <div
                        key={index}
                        className="video-card"
                        onClick={() => handleVideoClick(index)}
                        style={{
                            pointerEvents: index === centeredVideoIndex ? "auto" : "none",
                        }}
                    >
                        <img src={video.thumbnail} alt={video.name} className="thumbnail" />
                        <div className="video-info">
                            <h3>{video.name}</h3>
                            <p>{video.metadata}</p>
                        </div>
                    </div>
                ))}
            </Slider>

            {selectedVideo && (
                <div className="popup-wrapper">
                    <div className="video-popup">
                        <div className="video-container">
                            <ReactPlayer
                                ref={playerRef}
                                url={selectedVideo.videoSrc}
                                playing={isPlaying}
                                muted={isMuted}
                                controls={false}
                                width="100%"
                                height="100%"
                                onEnded={handleVideoEnd}
                            />

                            {/* Floating Controls */}
                            <div className="floating-controls">
                                <button onClick={togglePlay}>{isPlaying ? <FaPause /> : <FaPlay />}</button>
                                <button onClick={toggleMute}>{isMuted ? <FaVolumeMute /> : <FaVolumeUp />}</button>
                                <button onClick={handleFullscreen}><FaExpand /></button>
                            </div>
                        </div>
                        <button className="close-btn" onClick={() => setSelectedVideo(null)}>✖</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoRendersSection;
