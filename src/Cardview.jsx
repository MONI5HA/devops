import bgc from './bg.png'
import music from './absurd.mp3';

import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { FFmpeg } from '@ffmpeg/ffmpeg';



function Cardview({data}) {
  const cardRef = useRef(null); // Reference to the card view

  const handleDownloadVideo = async () => {
    // Capture the card as a canvas (image)
    const canvas = await html2canvas(cardRef.current);
    const imageUrl = canvas.toDataURL(); // This is the image URL in base64 format

    // Initialize ffmpeg.js
    const ffmpeg = FFmpeg.createFFmpeg({ log: true });
    await ffmpeg.load();

    // Write the captured image and audio file to ffmpeg's virtual file system
    ffmpeg.FS('writeFile', 'card.png', await FFmpeg.fetchFile(imageUrl));
    ffmpeg.FS('writeFile', 'background-music.mp3', await FFmpeg.fetchFile(music));

    // Run ffmpeg command to create the video
    await ffmpeg.run(
      '-framerate', '1',        // Set frame rate to 1 frame per second (adjust for desired speed)
      '-i', 'card.png',         // Input image file
      '-i', 'background-music.mp3', // Input music file
      '-c:v', 'libx264',        // Video codec
      '-c:a', 'aac',            // Audio codec
      '-strict', 'experimental', // Allow experimental codecs if needed
      '-shortest',              // End the video when the shortest input ends
      'output.mp4'              // Output file name
    );

    // Read the output video from ffmpeg's virtual file system
    const data = ffmpeg.FS('readFile', 'output.mp4');

    // Create a URL for the video and download it
    const videoUrl = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
    const link = document.createElement('a');
    link.href = videoUrl;
    link.download = 'card_with_music.mp4';
    link.click();
  };

  return (
    <div>
    <div className='flex flex-col  drop-shadow-md w-[500px] h-[500px] p-20 justify-center items-center '       
style={{ backgroundImage: `url(${bgc})`, backgroundSize: 'cover', backgroundPosition: 'center' }} ref={cardRef}
>
    <h1 className='font-serif font-extrabold text-[60px] p-10 ml-24' >{data}</h1>
    <audio >
    <source src={music} type="audio/mp3" />
    Your browser does not support the audio element.

        </audio>
      </div>

      {/* Button to trigger video download */}
      <button onClick={handleDownloadVideo}>Download Video with Music</button>
    </div>
  );
}

export default Cardview;

