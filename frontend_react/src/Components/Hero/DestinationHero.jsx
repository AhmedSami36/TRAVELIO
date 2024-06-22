// Hero.js
import React, { useEffect, useState } from 'react';
import { Typography, Box, Container } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const words = ["Travel", "Explore", "Journey", "Experience", "TRVLO"];

const Hero = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000); // Change word every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const currentWord = words[currentWordIndex];

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '30vh',
        backgroundImage: 'url(https://miro.medium.com/v2/resize:fit:1400/1*RAxRtjQtibKFEWiK1A-EFg.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          height: '100%',
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{
            textAlign: 'center',
            fontSize: '4rem',
            fontWeight: 'bold',
            fontFamily: 'Poppins',
            color: '#fff', // White color for text to make it visible on the background
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', // Add some text shadow for better readability
          }}
        >
          <AnimatePresence
            onExitComplete={() => {
              setIsAnimating(false);
            }}
          >
            <motion.div
              key={currentWord}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: -40,
                x: 40,
                filter: 'blur(8px)',
                scale: 2,
                position: 'absolute',
              }}
              transition={{
                duration: 0.4,
                ease: 'easeInOut',
                type: 'spring',
                stiffness: 100,
                damping: 10,
              }}
              style={{
                display: 'inline-block',
                position: 'relative',
              }}
            >
              {currentWord.split('').map((letter, index) => (
                <motion.span
                  key={currentWord + index}
                  initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.4,
                  }}
                  style={{ display: 'inline-block' }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>
          </AnimatePresence>
        </Typography>
      </Container>
    </Box>
  );
};

export default Hero;