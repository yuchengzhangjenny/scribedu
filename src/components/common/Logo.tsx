import React from 'react';
import { Headphones } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'white';
}

const Logo: React.FC<LogoProps> = ({ size = 'md', variant = 'default' }) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const colorClasses = {
    default: 'text-primary-600',
    white: 'text-white',
  };

  return (
    <div className={`flex items-center font-bold ${sizeClasses[size]} ${colorClasses[variant]}`}>
      <Headphones className="mr-2" />
      <span>VoxScript</span>
    </div>
  );
};

export default Logo;