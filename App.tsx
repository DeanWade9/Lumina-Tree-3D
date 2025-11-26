import React, { useState } from 'react';
import Scene from './components/Scene';
import ControlPanel from './components/ControlPanel';
import { TreeConfig, DEFAULT_CONFIG } from './types';

const App: React.FC = () => {
  const [config, setConfig] = useState<TreeConfig>(DEFAULT_CONFIG);

  return (
    <div className="relative w-full h-screen bg-neutral-900 overflow-hidden font-sans text-white">
      {/* 3D Canvas Layer */}
      <div className="absolute inset-0 z-0">
        <Scene config={config} />
      </div>

      {/* UI Overlay Layer */}
      <ControlPanel config={config} setConfig={setConfig} />
      
      {/* Title Overlay (Bottom Left) */}
      <div className="absolute bottom-6 left-6 z-10 pointer-events-none select-none">
        <h1 className="text-4xl font-light tracking-tighter text-white/80 drop-shadow-lg">
          Lumina<span className="font-bold text-green-400">Tree</span>
        </h1>
        <p className="text-sm text-white/50 tracking-widest mt-1 uppercase">
          Interactive Particle Simulation
        </p>
      </div>
    </div>
  );
};

export default App;
