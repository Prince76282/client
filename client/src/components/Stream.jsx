import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'video.js/dist/video-js.css';

const Stream = () => {
    const [overlays, setOverlays] = useState([]);
    const [newOverlay, setNewOverlay] = useState({ content: '', position: { top: '', left: '' }, size: '' });
  
  
    useEffect(() => {
      axios.get('http://127.0.0.1:5000/api/overlays')
        .then(response => setOverlays(response.data))
        .catch(error => console.error('Error fetching overlays:', error));
    }, []);
  
    
    const handleAddOverlay = () => {
      axios.post('http://localhost:5000/api/overlays', newOverlay)
        .then(() => {
          setOverlays([...overlays, newOverlay]);
          setNewOverlay({ content: '', position: { top: '', left: '' }, size: '' });
        })
        .catch(error => console.error('Error adding overlay:', error));
    };
  
    return (
      <div className="App bg-gradient-to-b from-gray-100 to-blue-50 min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 animate-fadeIn">RTSP Livestream with Overlays</h1>
  
       
        <div className="video-container relative w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mb-12 bg-black rounded-lg overflow-hidden shadow-lg transition duration-300 hover:shadow-2xl">
          <video
            id="video-player"
            className="video-js vjs-default-skin w-full h-auto rounded-t-lg"
            controls
          >
     
            <source src="your_rtsp_stream_url_here" type="application/x-rtsp" />
          </video>
  
  
          {overlays.map((overlay, idx) => (
            <div
              key={idx}
              className="absolute transition-opacity duration-500 ease-in-out"
              style={{
                top: `${overlay.position.top}%`,
                left: `${overlay.position.left}%`,
                fontSize: overlay.size,
                color: 'white',
              }}
            >
              {overlay.content}
            </div>
          ))}
        </div>
  
        <div className="overlay-controls w-full md:w-3/4 lg:w-2/3 xl:w-1/2 bg-white p-6 rounded-lg shadow-md space-y-6 transition duration-300 hover:shadow-xl">
          <h3 className="text-2xl font-semibold text-gray-700">Add Overlay</h3>
  
  
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            placeholder="Overlay content"
            value={newOverlay.content}
            onChange={(e) => setNewOverlay({ ...newOverlay, content: e.target.value })}
          />
  
     
          <div className="flex space-x-4">
            <input
              type="text"
              className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              placeholder="Position top (in %)"
              value={newOverlay.position.top}
              onChange={(e) => setNewOverlay({
                ...newOverlay,
                position: { ...newOverlay.position, top: e.target.value },
              })}
            />
            <input
              type="text"
              className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              placeholder="Position left (in %)"
              value={newOverlay.position.left}
              onChange={(e) => setNewOverlay({
                ...newOverlay,
                position: { ...newOverlay.position, left: e.target.value },
              })}
            />
          </div>
  
       
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            placeholder="Size (e.g., 12px)"
            value={newOverlay.size}
            onChange={(e) => setNewOverlay({ ...newOverlay, size: e.target.value })}
          />
  
          <button
            className="w-full p-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-200"
            onClick={handleAddOverlay}
          >
            Add Overlay
          </button>
        </div>
      </div>
    );
  };

export default Stream;
