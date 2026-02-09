import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useScrollImageSequence from '../hooks/useScrollImageSequence';

const HeroSection = () => {
    const canvasRef = useRef(null);
    const { images, currentFrame, isLoaded } = useScrollImageSequence(120);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Draw current frame to canvas
    useEffect(() => {
        if (!isLoaded || images.length === 0) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const img = images[currentFrame];

        if (img && img.complete) {
            // Set canvas size to window size
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Calculate scaling to cover entire canvas
            const scale = Math.max(
                canvas.width / img.width,
                canvas.height / img.height
            );

            const x = (canvas.width / 2) - (img.width / 2) * scale;
            const y = (canvas.height / 2) - (img.height / 2) * scale;

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, x, y, img.width * scale, img.height * scale);
        }
    }, [currentFrame, images, isLoaded]);

    // Track scroll progress for content transitions
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            const windowHeight = window.innerHeight;
            const progress = Math.min(scrollTop / (windowHeight * 2), 1);
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="home" className="relative h-[300vh]">
            {/* Fixed Canvas Background */}
            <div className="fixed top-0 left-0 w-full h-screen z-0">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-cover"
                />
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Hero Content */}
            <div className="sticky top-0 h-screen flex items-center justify-center z-10">
                <AnimatePresence>
                    {scrollProgress < 0.3 && (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            className="text-center px-4"
                        >
                            <motion.div
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.8, ease: 'easeOut' }}
                                className="flex flex-col items-center gap-6 md:gap-8"
                            >
                                <img src="/teclogo.svg" alt="TEC Logo" className="h-20 md:h-28 lg:h-32" />
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="font-orbitron text-base sm:text-lg md:text-2xl text-white/90 mb-8 md:mb-12 tracking-wide px-4"
                            >
                                TAKE AN ENTREPRENEURSHIP CHALLENGE
                            </motion.p>

                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255, 24, 1, 0.8)' }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-f1-red px-6 py-3 md:px-10 md:py-4 rounded-full font-montserrat font-bold text-base md:text-lg uppercase tracking-wider shadow-red-glow hover:shadow-red-glow-strong transition-all duration-300"
                            >
                                Start Your Engine
                            </motion.button>
                        </motion.div>
                    )}

                    {scrollProgress >= 0.3 && scrollProgress < 0.7 && (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            className="text-center px-4 max-w-4xl"
                        >
                            <h2 className="font-orbitron text-5xl md:text-7xl font-bold text-white mb-8 tracking-wide">
                                About <span className="text-f1-red">TEC</span>
                            </h2>
                            <p className="font-inter text-xl md:text-2xl text-white/80 leading-relaxed">
                                Tech & Entrepreneurship Challenge: A <span className="text-f1-red font-bold">3-Month Saga</span> of Innovation, where ideas accelerate from concept to reality.
                            </p>
                            <div className="mt-8 flex items-center justify-center gap-8">
                                <div className="text-center">
                                    <div className="font-racing text-4xl text-f1-red">6</div>
                                    <div className="font-montserrat text-sm text-white/60">PHASES</div>
                                </div>
                                <div className="h-12 w-px bg-white/20" />
                                <div className="text-center">
                                    <div className="font-racing text-4xl text-f1-red">3</div>
                                    <div className="font-montserrat text-sm text-white/60">MONTHS</div>
                                </div>
                                <div className="h-12 w-px bg-white/20" />
                                <div className="text-center">
                                    <div className="font-racing text-4xl text-f1-red">∞</div>
                                    <div className="font-montserrat text-sm text-white/60">POSSIBILITIES</div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Loading Indicator */}
            {!isLoaded && (
                <div className="fixed inset-0 flex items-center justify-center bg-deep-black z-50">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-f1-red border-t-transparent mb-4"></div>
                        <p className="font-orbitron text-f1-red">Loading Experience...</p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default HeroSection;
