import { motion } from 'framer-motion';

const MentorsSection = () => {
    const mentors = [
        { id: 1, name: 'Dr. Sarah Chen', expertise: ['Marketing', 'Growth'], image: null },
        { id: 2, name: 'Alex Kumar', expertise: ['Tech', 'AI/ML'], image: null },
        { id: 3, name: 'Maria Rodriguez', expertise: ['Finance', 'VC'], image: null },
        { id: 4, name: 'James Park', expertise: ['Product', 'UX'], image: null },
        { id: 5, name: 'Priya Sharma', expertise: ['Legal', 'IP'], image: null },
        { id: 6, name: 'Michael Brown', expertise: ['Sales', 'B2B'], image: null },
    ];

    return (
        <section id="mentors" className="relative min-h-screen py-20 bg-deep-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="relative inline-block">
                        <h2 className="font-orbitron text-4xl sm:text-6xl md:text-8xl font-black text-white mb-2 tracking-tight relative z-10 px-4">
                            THE <span className="text-f1-red drop-shadow-[0_0_30px_rgba(255,24,1,0.8)]">PIT CREW</span>
                        </h2>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-f1-red/20 to-transparent blur-2xl"></div>
                    </div>
                    <p className="font-orbitron text-lg sm:text-2xl md:text-3xl text-f1-red font-bold uppercase tracking-widest mt-4 px-4">
                        Expert mentors to fuel your journey
                    </p>
                    <div className="mt-6 h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-f1-red to-transparent"></div>
                </motion.div>

                {/* Mentors Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mentors.map((mentor, index) => (
                        <motion.div
                            key={mentor.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="group relative glass-morphism rounded-2xl p-6 border-2 border-white/10 hover:border-f1-red hover:shadow-red-glow transition-all duration-300 cursor-pointer"
                        >
                            {/* Mentor Image Placeholder */}
                            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-f1-red/30 to-f1-red/10 flex items-center justify-center overflow-hidden border-2 border-f1-red/30 group-hover:border-f1-red transition-all">
                                <svg
                                    className="w-20 h-20 text-f1-red/50 group-hover:text-f1-red transition-colors"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>

                            {/* Mentor Info */}
                            <div className="text-center">
                                <h3 className="font-orbitron font-bold text-xl text-white mb-2">
                                    {mentor.name}
                                </h3>

                                {/* Expertise Tags */}
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {mentor.expertise.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1 bg-f1-red/20 border border-f1-red/40 rounded-full text-xs font-montserrat text-f1-red font-medium"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Hover Effect Overlay */}
                            <div className="absolute inset-0 rounded-2xl bg-f1-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MentorsSection;
