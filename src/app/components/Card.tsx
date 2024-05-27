"use client";

import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <figure className="bg-gray-300 h-auto rounded-lg shadow-md overflow-hidden">
      {children}
    </figure>
  );
};

export default Card;
