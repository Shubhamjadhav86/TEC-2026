import { motion } from 'framer-motion';

const TeamsSection = () => {
    const teams = [
        { id: 1, name: 'TechFlow', tagline: 'Revolutionizing workflow automation', members: 4 },
        { id: 2, name: 'EduSpark', tagline: 'Personalized learning experiences', members: 3 },
        { id: 3, name: 'GreenCharge', tagline: 'Sustainable energy solutions', members: 5 },
        { id: 4, name: 'HealthHub', tagline: 'AI-powered diagnostics', members: 4 },
        { id: 5, name: 'FinTrack', tagline: 'Smart financial planning', members: 3 },
        { id: 6, name: 'AgriTech Pro', tagline: 'Precision farming tools', members: 4 },
        { id: 7, name: 'FitVerse', tagline: 'Virtual fitness coaching', members: 3 },
        { id: 8, name: 'DataLens', tagline: 'Visual analytics platform', members: 5 },
    ];

    return (
        <section id="teams" className="relative min-h-screen py-20 bg-gradient-to-b from-deep-black to-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="font-orbitron text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4">
                        The <span className="text-f1-red">Grid</span>
                    </h2>
                    <p className="font-inter text-lg md:text-xl text-white/70 px-4">
                        Meet the competing startups
                    </p>
                </motion.div>

                {/* Teams Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {teams.map((team, index) => (
                        <motion.div
                            key={team.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -10 }}
                            className="group relative glass-morphism rounded-xl p-6 border border-white/10 hover:border-f1-red/50 transition-all duration-300 cursor-pointer overflow-hidden"
                        >
                            {/* Position Number */}
                            <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-f1-red/10 border border-f1-red/30 flex items-center justify-center font-racing text-2xl text-f1-red group-hover:scale-110 transition-transform">
                                {team.id}
                            </div>

                            {/* Team Logo Placeholder */}
                            <div className="w-16 h-16 mb-4 rounded-lg bg-gradient-to-br from-f1-red/20 to-transparent border border-f1-red/20 flex items-center justify-center">
                                <svg
                                    className="w-8 h-8 text-f1-red"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                </svg>
                            </div>

                            {/* Team Info */}
                            <h3 className="font-orbitron font-bold text-xl text-white mb-2 group-hover:text-f1-red transition-colors">
                                {team.name}
                            </h3>
                            <p className="font-inter text-sm text-white/60 mb-4">
                                {team.tagline}
                            </p>

                            {/* Team Stats */}
                            <div className="flex items-center gap-2 text-xs font-montserrat text-white/50">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                </svg>
                                <span>{team.members} Members</span>
                            </div>

                            {/* Accent Line */}
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-f1-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamsSection;
