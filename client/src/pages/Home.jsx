import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, Shield, Zap, RefreshCw, ChevronRight, Check, Package, Layers, Bell, GitBranch, Terminal, Code2, ArrowRight } from 'lucide-react';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-lionsmane">
                {/* Slow Pulsing Circle Background */}
                <div className="absolute inset-0 overflow-hidden flex items-center justify-center pointer-events-none">
                    <div
                        className="w-[1200px] h-[1200px] bg-marigold/50 blur-[100px] rounded-full"
                        style={{
                            animation: 'slowPulse 10s ease-in-out infinite',
                        }}
                    ></div>
                </div>

                <div className="relative container mx-auto px-4 text-center z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-celeste text-sm font-medium text-midnight mb-8 hover:bg-white transition-colors cursor-pointer shadow-sm"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-herb opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-herb"></span>
                        </span>
                        v2.0 is now live
                        <ChevronRight size={14} />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-7xl font-bold tracking-tight mb-8 text-midnight"
                    >
                        Ship faster with <span className="text-gradient">confidence.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-midnight/70 mb-12 max-w-2xl mx-auto leading-relaxed"
                    >
                        The internal registry for high-quality, secure, and versioned components.
                        Empower your engineering team to build consistent software at scale.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link to="/search" className="btn-primary flex items-center gap-2 group">
                            Explore Packages
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a href="#" className="btn-secondary flex items-center gap-2">
                            <Terminal size={18} />
                            Read the Docs
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Brands / Social Proof (Placeholder style) */}
            <div className="border-y border-celeste bg-white/50 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-8">
                    <p className="text-center text-sm font-medium text-midnight/60 mb-6 uppercase tracking-wider">Trusted by modern engineering teams</p>
                    <div className="flex flex-wrap justify-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Placeholder logos using text for now */}
                        {['Acme Corp', 'GlobalTech', 'Nebula', 'Vertex', 'Horizon'].map((brand) => (
                            <span key={brand} className="text-xl font-bold text-midnight">{brand}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Why ModuleHub */}
            <section className="py-24 relative">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-midnight">Why ModuleHub?</h2>
                        <p className="text-midnight/70 text-lg max-w-2xl mx-auto">
                            Stop reinventing the wheel. Centralize your logic and UI components to boost productivity and maintain consistency.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <FeatureCard
                                icon={<Layers className="text-midnight" />}
                                title="Centralized Registry"
                                desc="One source of truth for all your internal packages and UI components."
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <FeatureCard
                                icon={<Bell className="text-marigold" />}
                                title="Instant Notifications"
                                desc="Real-time alerts via WebSockets when dependencies are updated."
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <FeatureCard
                                icon={<Shield className="text-herb" />}
                                title="Secure Management"
                                desc="Role-based access control and vulnerability scanning built-in."
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <FeatureCard
                                icon={<Zap className="text-midnight" />}
                                title="Productivity Boost"
                                desc="Reduce code duplication and ship features 2x faster."
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-24 bg-white/50 border-y border-celeste">
                <div className="container mx-auto px-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-bold text-center mb-16 text-midnight"
                    >
                        How it works
                    </motion.h2>

                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-celeste/30 via-celeste to-celeste/30"></div>

                        <div className="grid md:grid-cols-3 gap-12">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <Step
                                    number="01"
                                    title="Publish Components"
                                    desc="Teams add internal React components, packages, or utilities directly from the CLI."
                                    icon={<Code2 size={24} className="text-midnight" />}
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <Step
                                    number="02"
                                    title="Track & Maintain"
                                    desc="ModuleHub automatically generates docs, version history, and dependency graphs."
                                    icon={<GitBranch size={24} className="text-midnight" />}
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <Step
                                    number="03"
                                    title="Notify Teams"
                                    desc="Developers get instant socket-based updates for new versions and critical patches."
                                    icon={<Bell size={24} className="text-midnight" />}
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-center mb-6 text-midnight">Why ModuleHub is better</h2>
                        <p className="text-center text-midnight/70 mb-16">Built specifically for component management, unlike generic git repositories.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="overflow-x-auto"
                    >
                        <div className="glass-card rounded-2xl p-8 max-w-4xl mx-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-celeste">
                                        <th className="py-6 px-4 text-midnight/60 font-medium">Feature</th>
                                        <th className="py-6 px-4 text-midnight font-bold text-xl text-center">ModuleHub</th>
                                        <th className="py-6 px-4 text-midnight/50 font-medium text-center">Git Repos</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <ComparisonRow feature="Real-time version alerts" moduleHub={true} git={false} />
                                    <ComparisonRow feature="Auto-generated Docs" moduleHub={true} git={false} />
                                    <ComparisonRow feature="Dependency Graph" moduleHub={true} git={true} />
                                    <ComparisonRow feature="Visual Component Marketplace" moduleHub={true} git={false} />
                                    <ComparisonRow feature="Granular Access Control" moduleHub={true} git={true} />
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA / Contact */}
            <section className="py-24 relative overflow-hidden bg-celeste/20">
                <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="flex-1"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-midnight">Ready to streamline your workflow?</h2>
                        <p className="text-midnight/70 text-lg mb-8">Join leading engineering teams who are shipping faster with ModuleHub. Start for free today.</p>
                        <div className="flex flex-col gap-4">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="flex items-center gap-3"
                            >
                                <div className="w-10 h-10 rounded-full bg-herb/20 flex items-center justify-center text-herb">
                                    <Check size={20} />
                                </div>
                                <span className="text-midnight">Free for small teams</span>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="flex items-center gap-3"
                            >
                                <div className="w-10 h-10 rounded-full bg-herb/20 flex items-center justify-center text-herb">
                                    <Check size={20} />
                                </div>
                                <span className="text-midnight">Enterprise-grade security</span>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex-1 w-full max-w-md"
                    >
                        <form className="glass-card p-8 rounded-2xl">
                            <h3 className="text-2xl font-bold mb-6 text-midnight">Get in touch</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-midnight/60 mb-1">Full Name</label>
                                    <input type="text" className="w-full bg-white border border-celeste rounded-lg px-4 py-3 text-midnight focus:outline-none focus:border-midnight transition-colors" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-midnight/60 mb-1">Work Email</label>
                                    <input type="email" className="w-full bg-white border border-celeste rounded-lg px-4 py-3 text-midnight focus:outline-none focus:border-midnight transition-colors" placeholder="john@company.com" />
                                </div>
                                <button type="button" className="w-full btn-primary mt-2">Contact Sales</button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-celeste py-12 text-midnight/70">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        <div className="col-span-1 md:col-span-2">
                            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-midnight mb-4">
                                <Package size={24} className="text-midnight" />
                                <span>ModuleHub</span>
                            </Link>
                            <p className="max-w-xs text-midnight/70">The modern component registry for ambitious engineering teams.</p>
                        </div>
                        <div>
                            <h4 className="text-midnight font-bold mb-4">Product</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-midnight transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-midnight transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-midnight transition-colors">Enterprise</a></li>
                                <li><a href="#" className="hover:text-midnight transition-colors">Changelog</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-midnight font-bold mb-4">Resources</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-midnight transition-colors">Documentation</a></li>
                                <li><a href="#" className="hover:text-midnight transition-colors">API Reference</a></li>
                                <li><a href="#" className="hover:text-midnight transition-colors">Community</a></li>
                                <li><a href="#" className="hover:text-midnight transition-colors">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-celeste pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p>© 2024 ModuleHub Inc. All rights reserved.</p>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-midnight transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-midnight transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <div className="glass-card p-6 rounded-2xl hover:bg-white transition-colors group">
        <div className="bg-celeste/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-celeste">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-midnight mb-2">{title}</h3>
        <p className="text-midnight/70 leading-relaxed text-sm">{desc}</p>
    </div>
);

const Step = ({ number, title, desc, icon }) => (
    <div className="relative z-10 text-center">
        <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 border-4 border-celeste shadow-xl relative">
            {icon}
            <div className="absolute -top-3 -right-3 bg-midnight text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white text-white">
                {number}
            </div>
        </div>
        <h3 className="text-xl font-bold text-midnight mb-2">{title}</h3>
        <p className="text-midnight/70 text-sm max-w-xs mx-auto">{desc}</p>
    </div>
);

const ComparisonRow = ({ feature, moduleHub, git }) => (
    <tr className="border-b border-celeste/30 hover:bg-celeste/10 transition-colors">
        <td className="py-4 px-4 text-midnight font-medium">{feature}</td>
        <td className="py-4 px-4 text-center">
            {moduleHub ? <Check className="inline text-herb" size={20} /> : <span className="text-midnight/30">-</span>}
        </td>
        <td className="py-4 px-4 text-center">
            {git ? <Check className="inline text-midnight/40" size={20} /> : <span className="text-midnight/30">-</span>}
        </td>
    </tr>
)

export default Home;
