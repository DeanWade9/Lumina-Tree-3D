import React, { useState } from 'react';
import { Settings2, X, ChevronRight, Sliders, Palette, Activity } from 'lucide-react';
import { TreeConfig } from '../types';

interface ControlPanelProps {
  config: TreeConfig;
  setConfig: React.Dispatch<React.SetStateAction<TreeConfig>>;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ config, setConfig }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleChange = (key: keyof TreeConfig, value: number | string) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="absolute top-4 right-4 z-50 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all shadow-lg border border-white/10"
      >
        <Settings2 size={24} />
      </button>
    );
  }

  return (
    <div className="absolute top-0 right-0 h-full w-full sm:w-80 bg-black/40 backdrop-blur-xl border-l border-white/10 text-white z-50 shadow-2xl overflow-y-auto transition-all duration-300">
      <div className="p-6 space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Activity className="text-green-400" size={20} />
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-emerald-500">
              Tree Settings
            </h2>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Color Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-300 uppercase tracking-wider">
            <Palette size={16} /> Color & Light
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Base Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={config.treeColor}
                onChange={(e) => handleChange('treeColor', e.target.value)}
                className="w-10 h-10 rounded cursor-pointer bg-transparent border border-white/20"
              />
              <span className="text-xs font-mono text-gray-500">{config.treeColor}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-gray-400">Bloom Intensity</label>
              <span className="text-xs text-gray-500">{config.bloomIntensity.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="4"
              step="0.1"
              value={config.bloomIntensity}
              onChange={(e) => handleChange('bloomIntensity', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500 hover:accent-green-400 transition-all"
            />
          </div>
        </div>

        {/* Structure Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-300 uppercase tracking-wider">
            <Sliders size={16} /> Structure
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-gray-400">Height</label>
              <span className="text-xs text-gray-500">{config.treeHeight}u</span>
            </div>
            <input
              type="range"
              min="5"
              max="20"
              step="0.5"
              value={config.treeHeight}
              onChange={(e) => handleChange('treeHeight', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-gray-400">Base Radius</label>
              <span className="text-xs text-gray-500">{config.baseRadius}u</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="0.5"
              value={config.baseRadius}
              onChange={(e) => handleChange('baseRadius', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

           <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-gray-400">Spiral Turns</label>
              <span className="text-xs text-gray-500">{config.spiralTurns}</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="0.5"
              value={config.spiralTurns}
              onChange={(e) => handleChange('spiralTurns', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
        </div>

        {/* Particles Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-300 uppercase tracking-wider">
            <Activity size={16} /> Particles
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-gray-400">Count</label>
              <span className="text-xs text-gray-500">{config.particleCount}</span>
            </div>
            <input
              type="range"
              min="500"
              max="10000"
              step="100"
              value={config.particleCount}
              onChange={(e) => handleChange('particleCount', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-gray-400">Size</label>
              <span className="text-xs text-gray-500">{config.particleSize.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.01"
              max="0.5"
              step="0.01"
              value={config.particleSize}
              onChange={(e) => handleChange('particleSize', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-gray-400">Chaos</label>
              <span className="text-xs text-gray-500">{config.randomness.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="2"
              step="0.05"
              value={config.randomness}
              onChange={(e) => handleChange('randomness', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>

           <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-gray-400">Twinkle Speed</label>
              <span className="text-xs text-gray-500">{config.sparkleSpeed.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={config.sparkleSpeed}
              onChange={(e) => handleChange('sparkleSpeed', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
            />
          </div>
        </div>

        <div className="pt-4 text-xs text-gray-600 text-center border-t border-white/5">
          Drag to rotate • Scroll to zoom
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
