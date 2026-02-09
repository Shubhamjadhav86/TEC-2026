const Footer = () => {
    const socialLinks = [
        { name: 'Instagram', icon: '📷', url: '#' },
        { name: 'LinkedIn', icon: '💼', url: '#' },
        { name: 'Twitter', icon: '🐦', url: '#' },
        { name: 'YouTube', icon: '▶️', url: '#' },
    ];

    return (
        <footer className="relative bg-black border-t border-white/10 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    {/* Logo & Brand */}
                    <div className="flex items-center gap-3 justify-center md:justify-start">
                        <img src="/logo.png" alt="E-Cell Logo" className="h-12 w-12" />
                        <img src="/teclogo.svg" alt="TEC Logo" className="h-10 w-10" />
                        <div>
                            <div className="font-racing text-xl text-gradient">E-Cell MET</div>
                            <div className="font-inter text-xs text-white/50">TEC Event</div>
                        </div>
                    </div>
                    {/* Social Links */}
                    <div className="flex items-center justify-center gap-4">
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                className="w-10 h-10 rounded-full glass-morphism flex items-center justify-center text-xl hover:bg-f1-red/20 hover:border-f1-red/50 border border-white/10 transition-all duration-300"
                                aria-label={social.name}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>

                    {/* Copyright */}
                    <div className="text-center md:text-right">
                        <p className="font-inter text-sm text-white/50">
                            © {new Date().getFullYear()} E-Cell. All rights reserved.
                        </p>
                        <p className="font-inter text-xs text-white/30 mt-1">
                            Built for innovation
                        </p>
                    </div>
                </div>

                {/* Bottom Accent Line */}
                <div className="mt-8 h-px bg-gradient-to-r from-transparent via-f1-red to-transparent"></div>
            </div>
        </footer>
    );
};

export default Footer;
