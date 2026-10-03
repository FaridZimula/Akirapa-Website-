import React from "react";
import { motion, Variants } from "framer-motion";

export interface AnimatedWordsProps {
  text?: string;
  children?: React.ReactNode;
  className?: string;
  wordClassName?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  delay?: number;
  duration?: number;
  stagger?: number;
  animation?: "luxury" | "blur" | "glide" | "shimmer" | "mask";
  once?: boolean;
  shimmer?: boolean;
  interactive?: boolean;
}

/**
 * AnimatedWords: Professional Senior UI Word-by-Word Split Animation
 * 
 * Features:
 * - Lengthy, visible kinetic word-by-word reveal (default 1.2s - 1.4s duration per word)
 * - Cubic-bezier easing [0.16, 1, 0.3, 1] inspired by high-end Apple / Linear design
 * - 3D perspective rotation, vertical translation, and progressive blur de-noising
 * - Overflow-masked inline containers preventing baseline clipping
 * - Optional continuous lengthy iridescent shimmer across words
 * - Interactive word hover physics
 */
export const AnimatedWords: React.FC<AnimatedWordsProps> = ({
  text,
  children,
  className = "",
  wordClassName = "",
  as = "div",
  delay = 0.05,
  duration = 1.25, // Lengthy, noticeable duration
  stagger = 0.045, // Cascading stagger between words
  animation = "luxury",
  once = true,
  shimmer = false,
  interactive = true,
}) => {
  // Extract text string from text prop or children if string
  const rawText = text || (typeof children === "string" ? children : "");

  // If text is available, split into words preserving spaces
  const words = rawText ? rawText.split(/\s+/).filter(Boolean) : [];

  // Container motion variant controlling staggered child execution
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
      },
    },
  };

  // Word variant configurations
  const getWordVariants = (): Variants => {
    switch (animation) {
      case "blur":
        return {
          hidden: {
            opacity: 0,
            y: 35,
            filter: "blur(10px)",
            scale: 0.95,
          },
          visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            scale: 1,
            transition: {
              duration: duration,
              ease: [0.16, 1, 0.3, 1],
            },
          },
        };
      case "glide":
        return {
          hidden: {
            opacity: 0,
            x: -25,
            y: 20,
            filter: "blur(6px)",
          },
          visible: {
            opacity: 1,
            x: 0,
            y: 0,
            filter: "blur(0px)",
            transition: {
              duration: duration,
              ease: [0.16, 1, 0.3, 1],
            },
          },
        };
      case "mask":
        return {
          hidden: {
            opacity: 0,
            y: "115%",
            rotateX: 30,
          },
          visible: {
            opacity: 1,
            y: "0%",
            rotateX: 0,
            transition: {
              duration: duration,
              ease: [0.16, 1, 0.3, 1],
            },
          },
        };
      case "luxury":
      default:
        return {
          hidden: {
            opacity: 0,
            y: 42,
            rotateX: 25,
            scale: 0.94,
            filter: "blur(8px)",
          },
          visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            filter: "blur(0px)",
            transition: {
              duration: duration,
              ease: [0.16, 1, 0.3, 1],
            },
          },
        };
    }
  };

  const wordVariants = getWordVariants();

  // If complex JSX children are provided rather than a single string, wrap them gracefully
  if (!rawText && children) {
    return (
      <motion.div
        className={`inline-block ${className}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: 0.15, margin: "0px 0px -40px 0px" }}
        variants={{
          hidden: { opacity: 0, y: 35, filter: "blur(6px)" },
          visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
          },
        }}
      >
        {children}
      </motion.div>
    );
  }

  const MotionComponent = motion[as] || motion.div;

  return (
    <MotionComponent
      className={`inline-flex flex-wrap items-baseline gap-x-[0.28em] gap-y-[0.1em] ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15, margin: "0px 0px -40px 0px" }}
      variants={containerVariants}
      style={{ perspective: 1000 }}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden py-[0.15em] -my-[0.15em] px-[0.05em] -mx-[0.05em] align-top"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.span
            variants={wordVariants}
            className={`inline-block transform-gpu origin-bottom will-change-transform ${
              shimmer ? "word-shimmer-lengthy" : ""
            } ${
              interactive
                ? "transition-colors duration-300 hover:text-[#40ddd3] hover:-translate-y-0.5 cursor-default"
                : ""
            } ${wordClassName}`}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionComponent>
  );
};

/**
 * WordShimmer: Displays continuous radiant lengthy gradient sweep across words
 */
export const WordShimmer: React.FC<{
  children: React.ReactNode;
  className?: string;
  speedSeconds?: number;
}> = ({ children, className = "" }) => {
  return (
    <span
      className={`word-shimmer-lengthy font-black ${className}`}
      style={{
        display: "inline-block",
        willChange: "background-position",
      }}
    >
      {children}
    </span>
  );
};

/**
 * AnimatedHeadline: Pre-configured for prominent editorial and hero titles
 */
export const AnimatedHeadline: React.FC<{
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4";
  delay?: number;
  highlightWords?: string[];
  highlightClassName?: string;
}> = ({
  text,
  className = "",
  as = "h2",
  delay = 0.05,
  highlightWords = [],
  highlightClassName = "text-[#40ddd3] word-shimmer-lengthy",
}) => {
  const words = text.split(/\s+/).filter(Boolean);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: 0.055, // Lengthy cascading rhythm
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 46,
      rotateX: 30,
      filter: "blur(10px)",
      scale: 0.93,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        duration: 1.35, // Lengthy 1.35s duration
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const MotionComponent = motion[as] || motion.h2;

  return (
    <MotionComponent
      className={`inline-flex flex-wrap items-baseline gap-x-[0.3em] gap-y-[0.1em] ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
      variants={containerVariants}
      style={{ perspective: 1200 }}
    >
      {words.map((word, idx) => {
        const cleanWord = word.replace(/[^a-zA-Z0-9]/g, "");
        const isHighlight = highlightWords.some(
          (hw) => hw.toLowerCase() === cleanWord.toLowerCase()
        );

        return (
          <span
            key={`${word}-${idx}`}
            className="inline-block overflow-hidden py-[0.15em] -my-[0.15em] px-[0.05em] -mx-[0.05em] align-top"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.span
              variants={wordVariants}
              className={`inline-block transform-gpu origin-bottom will-change-transform transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 ${
                isHighlight ? highlightClassName : ""
              }`}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </MotionComponent>
  );
};

export default AnimatedWords;
