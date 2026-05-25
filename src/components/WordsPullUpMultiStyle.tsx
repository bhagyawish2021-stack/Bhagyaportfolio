import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
}

export const WordsPullUpMultiStyle: React.FC<WordsPullUpMultiStyleProps> = ({
  segments,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  // Map each segment to its words list, keeping track of class names
  const allWords = segments.flatMap((segment) => {
    return segment.text.split(' ').map((word) => ({
      word,
      className: segment.className || '',
    }));
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const wordVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={`inline-flex flex-wrap justify-center ${className}`}
    >
      {allWords.map((item, index) => {
        if (item.word === '') return null;
        return (
          <span key={index} className="inline-block mr-[0.25em] last:mr-0 select-none">
            <motion.span
              variants={wordVariants}
              className={`inline-block ${item.className}`}
            >
              {item.word}
            </motion.span>
          </span>
        );
      })}
    </motion.div>
  );
};
