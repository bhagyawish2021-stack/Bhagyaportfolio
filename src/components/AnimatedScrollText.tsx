import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedScrollTextProps {
  text: string;
  className?: string;
}

export const AnimatedScrollText: React.FC<AnimatedScrollTextProps> = ({
  text,
  className = '',
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const chars = text.split('');
  const totalChars = chars.length;

  return (
    <p
      ref={containerRef}
      className={`flex flex-wrap justify-center leading-relaxed text-center ${className}`}
      style={{ color: '#DEDBC8' }}
    >
      {chars.map((char, index) => {
        return (
          <AnimatedLetter
            key={index}
            char={char}
            index={index}
            totalChars={totalChars}
            progress={scrollYProgress}
          />
        );
      })}
    </p>
  );
};

interface AnimatedLetterProps {
  char: string;
  index: number;
  totalChars: number;
  progress: MotionValue<number>;
}

const AnimatedLetter: React.FC<AnimatedLetterProps> = ({
  char,
  index,
  totalChars,
  progress,
}) => {
  const charProgress = index / totalChars;
  // Transition window from opacity 0.2 to 1 based on scroll progress
  const start = Math.max(0, charProgress - 0.1);
  const end = Math.min(1, charProgress + 0.05);
  
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <motion.span style={{ opacity }} className="inline-block whitespace-pre select-none">
      {char}
    </motion.span>
  );
};
