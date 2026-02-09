import { useState } from 'react';
import { motion } from 'framer-motion';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        query: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            alert('Message received! We\'ll get back to you soon.');
            setFormData({ name: '', email: '', query: '' });
            setIsSubmitting(false);
        }, 1000);
    };

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <section id="contact" className="relative min-h-screen py-20 bg-deep-black">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="font-orbitron text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4">
                        <span className="text-f1-red">Contact</span> Mission Control
                    </h2>
                    <p className="font-inter text-lg md:text-xl text-white/70 px-4">
                        Send us your telemetry data
                    </p>
                </motion.div>

                {/* Telemetry-Style Form */}
                <motion.form
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    onSubmit={handleSubmit}
                    className="glass-morphism rounded-2xl p-8 md:p-12 border border-f1-red/20"
                >
                    {/* Form Header */}
                    <div className="mb-8 pb-4 border-b border-white/10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-f1-red animate-pulse"></div>
                                <span className="font-orbitron text-sm text-f1-red uppercase tracking-wider">
                                    Transmission Active
                                </span>
                            </div>
                            <div className="font-mono text-xs text-white/40">
                                {new Date().toLocaleTimeString()}
                            </div>
                        </div>
                    </div>

                    {/* Name Field */}
                    <div className="mb-6">
                        <label className="block font-orbitron text-sm text-white/70 mb-2 uppercase tracking-wide">
                            Pilot Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white font-inter focus:border-f1-red focus:outline-none focus:ring-1 focus:ring-f1-red transition-all"
                            placeholder="Enter your name"
                        />
                    </div>

                    {/* Email Field */}
                    <div className="mb-6">
                        <label className="block font-orbitron text-sm text-white/70 mb-2 uppercase tracking-wide">
                            Communication Channel
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white font-inter focus:border-f1-red focus:outline-none focus:ring-1 focus:ring-f1-red transition-all"
                            placeholder="your.email@domain.com"
                        />
                    </div>

                    {/* Query Field */}
                    <div className="mb-8">
                        <label className="block font-orbitron text-sm text-white/70 mb-2 uppercase tracking-wide">
                            Message Data
                        </label>
                        <textarea
                            name="query"
                            value={formData.query}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white font-inter focus:border-f1-red focus:outline-none focus:ring-1 focus:ring-f1-red transition-all resize-none"
                            placeholder="Enter your query or message..."
                        />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full bg-f1-red px-8 py-4 rounded-lg font-orbitron font-bold text-lg uppercase tracking-wider shadow-red-glow hover:shadow-red-glow-strong transition-all duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {isSubmitting ? 'Transmitting...' : 'Send Transmission'}
                    </motion.button>
                </motion.form>
            </div>
        </section>
    );
};

export default ContactSection;
