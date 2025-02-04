import React, { useState } from "react";
import Slider from "react-slick";
import ReactPlayer from "react-player";

const videos = [
    {
        name: "Animation Reel",
        thumbnail: "/assets/animation_thumbnail.png",
        videoSrc: "/assets/animation.mp4",
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
        setSelectedVideo(null); // Auto-close popup when video ends
    };

    return (
        <div className="video-section">
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
                <div className="video-popup">
                    <ReactPlayer
                        url={selectedVideo.videoSrc}
                        playing={true}
                        controls={true}
                        width="80%"
                        height="auto"
                        onEnded={handleVideoEnd}
                    />
                    <button className="close-btn" onClick={() => setSelectedVideo(null)}>✖</button>
                </div>
            )}
        </div>
    );
};

export default VideoRendersSection;
