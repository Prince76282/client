import React from 'react';
import Stream from './components/Stream';
import OverlayManager from "./components/OverlayManager";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white flex flex-col justify-center items-center space-y-10 p-8">
      
   
      <header className="w-full text-center">
        <h1 className="text-4xl font-bold drop-shadow-lg tracking-wide">
          Live Streaming Dashboard
        </h1>
        <p className="text-xl font-light mt-2">
          Manage your live streams and customize overlay settings seamlessly
        </p>
      </header>

      <section className="w-full max-w-6xl bg-white text-gray-800 shadow-lg rounded-lg p-6 mb-10">
        <h2 className="text-2xl font-semibold mb-4">Live Stream</h2>
        <Stream />
      </section>


      <section className="w-full max-w-6xl bg-white text-gray-800 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Overlay Manager</h2>
        <OverlayManager />
      </section>
      

      <footer className="text-center text-sm font-light text-gray-200 mt-10">
        © 2024 Streaming Dashboard by YourName
      </footer>
    </div>
  );
}

export default App;
