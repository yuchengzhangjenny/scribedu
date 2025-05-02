import React from 'react';

const WaveAnimation: React.FC = () => {
  return (
    <div className="flex items-center justify-center space-x-1 h-16">
      {[1, 2, 3, 4, 5].map((bar) => (
        <div
          key={bar}
          className="w-1 bg-primary-500 rounded-full animate-pulse-slow"
          style={{
            height: `${(Math.sin(bar / 1.5) + 1.5) * 20}px`,
            animationDelay: `${bar * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
};

export default WaveAnimation;