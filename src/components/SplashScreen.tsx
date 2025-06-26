// components/SplashScreen.tsx
'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen = () => {
  const [showText, setShowText] = useState(false);
  const [showPulse, setShowPulse] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Stagger the animations
    const textTimer = setTimeout(() => setShowText(true), 800);
    const pulseTimer = setTimeout(() => setShowPulse(true), 1200);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(pulseTimer);
    };
  }, []);

  // if (!mounted) {
  //   return (
  //     <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
  //       <div className="text-center">
  //         <Image
  //           src="/EmoTunes-logo.png"
  //           alt="EmoTunes Logo"
  //           width={120}
  //           height={120}
  //           className="mx-auto drop-shadow-2xl"
  //         />
  //       </div>
  //     </div>
  //   );
  // }

  // Animation variants
  const containerVariants = {
    initial: { 
      opacity: 0 
    },
    animate: { 
      opacity: 1
    },
    exit: {
      opacity: 0,
      scale: 1.1
    }
  };

  const logoVariants = {
    initial: { 
      scale: 0,
      rotate: -180,
      opacity: 0
    },
    animate: { 
      scale: 1,
      rotate: 0,
      opacity: 1
    },
    hover: {
      scale: 1.05,
      rotate: [0, -5, 5, 0]
    }
  };

  const textVariants = {
    initial: { 
      y: 50,
      opacity: 0,
      scale: 0.8
    },
    animate: { 
      y: 0,
      opacity: 1,
      scale: 1
    }
  };

  const musicNoteVariants = {
    initial: { 
      y: -20,
      opacity: 0,
      rotate: -45
    },
    animate: { 
      y: [0, -10, 0],
      opacity: 1,
      rotate: 0
    }
  };

  const pulseVariants = {
    initial: { 
      scale: 0, 
      opacity: 0.8 
    },
    animate: {
      scale: [1, 1.5, 2],
      opacity: [0.8, 0.4, 0]
    }
  };

  const waveVariants = {
    animate: {
      pathLength: [0, 1, 0]
    }
  };

  return (
          <motion.div 
      className="fixed inset-0 z-[9999] bg-gradient-to-br dark:from-gray-900 dark:via-purple-900 dark:to-black flex items-center justify-center overflow-hidden"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        duration: 0.8,
        ease: "easeOut"
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating music notes */}
        <motion.div
          className="absolute top-[10%] left-[15%] text-white/10 text-2xl"
          variants={musicNoteVariants}
          initial="initial"
          animate="animate"
          transition={{
            delay: 0,
            y: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            },
            opacity: { duration: 0.5 },
            rotate: { duration: 0.8, ease: "easeOut" }
          }}
        >
          ♪
        </motion.div>
        <motion.div
          className="absolute top-[20%] right-[20%] text-white/10 text-2xl"
          variants={musicNoteVariants}
          initial="initial"
          animate="animate"
          transition={{
            delay: 0.2,
            y: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            },
            opacity: { duration: 0.5 },
            rotate: { duration: 0.8, ease: "easeOut" }
          }}
        >
          ♫
        </motion.div>
        <motion.div
          className="absolute top-[60%] left-[10%] text-white/10 text-2xl"
          variants={musicNoteVariants}
          initial="initial"
          animate="animate"
          transition={{
            delay: 0.4,
            y: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            },
            opacity: { duration: 0.5 },
            rotate: { duration: 0.8, ease: "easeOut" }
          }}
        >
          ♪
        </motion.div>
        <motion.div
          className="absolute top-[70%] right-[15%] text-white/10 text-2xl"
          variants={musicNoteVariants}
          initial="initial"
          animate="animate"
          transition={{
            delay: 0.6,
            y: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            },
            opacity: { duration: 0.5 },
            rotate: { duration: 0.8, ease: "easeOut" }
          }}
        >
          ♫
        </motion.div>
        <motion.div
          className="absolute top-[30%] left-[80%] text-white/10 text-2xl"
          variants={musicNoteVariants}
          initial="initial"
          animate="animate"
          transition={{
            delay: 0.8,
            y: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            },
            opacity: { duration: 0.5 },
            rotate: { duration: 0.8, ease: "easeOut" }
          }}
        >
          ♪
        </motion.div>
        <motion.div
          className="absolute top-[50%] left-[5%] text-white/10 text-2xl"
          variants={musicNoteVariants}
          initial="initial"
          animate="animate"
          transition={{
            delay: 1.0,
            y: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            },
            opacity: { duration: 0.5 },
            rotate: { duration: 0.8, ease: "easeOut" }
          }}
        >
          ♫
        </motion.div>

        {/* Animated sound waves */}
        <svg className="absolute inset-0 w-full h-full">
          <motion.path
            d="M 0 250 Q 400 200 800 250 T 1600 250"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
            fill="none"
            variants={waveVariants}
            animate="animate"
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.path
            d="M 0 300 Q 500 250 1000 300 T 2000 300"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
            fill="none"
            variants={waveVariants}
            animate="animate"
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </svg>
      </div>

      {/* Main content */}
      <div className="text-center relative z-10">
        {/* Pulse effect behind logo */}
        <AnimatePresence>
          {showPulse && (
            <motion.div 
              className="absolute inset-0 rounded-full bg-white/20"
              style={{
                width: '120px',
                height: '120px',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
              variants={pulseVariants}
              initial="initial"
              animate="animate"
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          )}
        </AnimatePresence>

        {/* Logo */}
        <motion.div
          variants={logoVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="relative z-20 mb-6"
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            duration: 1.2
          }}
        >
          <Image
            src="/EmoTunes-logo.png"
            alt="EmoTunes Logo"
            width={170}
            height={170}
            className="mx-auto drop-shadow-2xl"
          />
        </motion.div>

        {/* Text content */}
        <AnimatePresence>
          {showText && (
            <motion.div
              variants={textVariants}
              initial="initial"
              animate="animate"
              className="space-y-2"
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.3
              }}
            >
              <motion.p 
                className="text-lg text-white/80 font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                Feel the Music
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading indicator */}
        <motion.div 
          className="mt-8 flex justify-center space-x-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-white rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SplashScreen;