import React, { useRef, useState, useEffect } from 'react';
import './App.css'


const DynamicHeightVideo = ({ src , text}) => {
  const videoRef = useRef(null);
  const [videoHeight, setVideoHeight] = useState(370); // Initial height in pixels


  const handlePlaybackRate = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7; // Adjust the playback rate to slow down the video
    }
  };


  useEffect(() => {
    const video = videoRef.current;

    const handlePlaying = () => {
      setVideoHeight(450);
    };
    

    const handleEnded = () => {
      setVideoHeight(370); // Reset to the initial height after video ends
    };

    video.addEventListener('playing', handlePlaying);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('pause', handleEnded)

    return () => {
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('ended', handleEnded);
      video.addEventListener('pause', handleEnded)

    };
  }, []);


  return (
    <div className="video-column">
      <h4> {text}</h4>
    <div style={{ width: '420px', height: videoHeight, margin:'10px'}}>
          <video ref={videoRef}     
          controls
          onPlay={handlePlaybackRate}
          
         width="450px" height={videoHeight} >
            <source src={src} type="video/mp4" />
          </video>
    </div>
    </div>
  );
};

export default DynamicHeightVideo;