import './App.css';
import React from 'react';
import './buttoncomp'
import ButtonComponent from './buttoncomp';
import CUHK from './CUHK.png'
import cpii from './CPII.png'
import { useRef, useState, useEffect } from 'react';
import DynamicHeightVideo from './dynamicvideo';
import { useLayoutEffect } from 'react';

const inVideos = [
  require('./videos/Station1_in.mp4'),
  require('./videos/Station2_in.mp4'),
  require('./videos/station3_in.mp4'),
  require('./videos/station6_in.mp4'),

]

const outVideos = [
  require('./videos/station1_out.mp4'),
  require('./videos/Station2_out.mp4'),
  require('./videos/station3_out.mp4'),
  require('./videos/station4_out.mp4'),

]


const VideoPane = () => {
    const videoContainerRef = useRef(null);
    const vidme = useRef(null);

 
      const handleScroll = (event) => {
       const leftScroll = event.target.scrollLeft 
       videoContainerRef.current.scrollLeft = leftScroll;
        
      };
  



    const handleScrollRightTop = () => {
      if (vidme.current) {
        vidme.current.scrollBy({
          left: 400, // Scroll to reveal the remaining 2 video columns
          behavior: 'smooth',
        });
        videoContainerRef.current.scrollBy({
          left: 400, // Scroll to reveal the remaining 2 video columns
          behavior: 'smooth',
        });
      }
    };
  
    const handleScrollRight = () => {
      if (videoContainerRef.current) {
        videoContainerRef.current.scrollBy({
          left: 600, // Scroll to reveal the remaining 2 video columns
          behavior: 'smooth',
        });
      }
    };
    const [upPanel, setUpPanel] = useState(inVideos);
    const [downPanel, setDownPanel] = useState(outVideos)
      const fileInputRef = useRef(null);

    
      const handleFileUpload = (event) => {
        const files = event.target.files;
        const newVideos = Array.from(files).map((file) => URL.createObjectURL(file));
        setUpPanel((prevVideos) => [...prevVideos, ...newVideos]);
      }
      const handleButtonClick = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.multiple = true;
        fileInput.accept = 'video/*';
        fileInput.style.display = 'none';
        fileInput.addEventListener('change', handleFileUpload);
        document.body.appendChild(fileInput);
        fileInput.click();
        document.body.removeChild(fileInput);
      };

      const handleFileUploadDown = (event) => {
        const files = event.target.files;
        const newVideos = Array.from(files).map((file) => URL.createObjectURL(file));
        setDownPanel((prevVideos) => [...prevVideos, ...newVideos]);
      }
      const handleButtonClickDown = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.multiple = true;
        fileInput.accept = 'video/*';
        fileInput.style.display = 'none';
        fileInput.addEventListener('change', handleFileUploadDown);
        document.body.appendChild(fileInput);
        fileInput.click();
        document.body.removeChild(fileInput);
      };
  
  
  
  return (
    <div className="video-pane">
    <div className='header1'>
    <div className='logos'>
    <img src={CUHK} className='logo'/>
    <img src={cpii} className='logo'/> 
    </div>
    <h3>OD Matrix Generator</h3>
    </div>

      <div className="video-row">
      <div className="video-column-container" ref={vidme} onScroll={handleScroll}>
        {upPanel.map((videoUrl, index) => (
        console.log(videoUrl),
        <DynamicHeightVideo src={videoUrl} text={`Entrance ${index+1}`}/>

    ))}
       

        <div style={{ display: 'flex !important', flexDirection: 'column !important', alignItems: 'center !important' }}>
        <button
          onClick={handleButtonClick}
          style={{
            padding: '0.5rem 1rem !important',
            fontSize: '1rem !important',
            border: 'none !important',
            borderRadius: '4px !important',
            backgroundColor: '#4CAF50 !important',
            color: 'white !important',
            cursor: 'pointer !important',
            marginLeft: '150px',
            marginTop: '200px',
          }}
        >
         +
        </button>  
    </div>

        <div className="scroll-button">
          <button onClick={handleScrollRightTop}>{">"}</button>
        </div>
        </div>
      </div>

      <div className="video-row"> 
      <div className="bottom-column-container" ref={videoContainerRef}>

      {downPanel.map((videoUrl, index) => (
   
        <DynamicHeightVideo src={videoUrl} text={`Exit ${index+1}`}/>

    ))}
            <div style={{ display: 'flex !important', flexDirection: 'column !important', alignItems: 'center !important' }}>
        <button
          onClick={handleButtonClickDown}
          style={{
            padding: '0.5rem 1rem !important',
            fontSize: '1rem !important',
            border: 'none !important',
            borderRadius: '4px !important',
            backgroundColor: '#4CAF50 !important',
            color: 'white !important',
            cursor: 'pointer !important',
            marginLeft: '150px',
            marginTop: '200px',
          }}
        >
         +
        </button>  
    </div>
  
      {/* <div className="bottom-scroll-button">
          <button onClick={handleScrollRight}>{">"}</button>
        </div> */}
        </div>
      </div>
      <ButtonComponent
      upPanel={upPanel} 
      downPanel={downPanel}/>
    </div>
  );
};

export default VideoPane;