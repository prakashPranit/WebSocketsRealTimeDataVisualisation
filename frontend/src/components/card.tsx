import React from 'react';

// Define the props interface for the Card component
interface CardProps {
  children: React.ReactNode; // Content of the card
  className?: string; // Additional class name for styling
}

const Card: React.FC<CardProps> = ({ children, className }: CardProps) => {
  return (
    <>
      {/* Card container */}
      <div className={`block max-w:w-full p-6 bg-white border border-gray-200 rounded-lg shadow ${className}`}>
        {/* Render children inside the card */}
        {children}
      </div>
    </>
  );
}

export default Card;
