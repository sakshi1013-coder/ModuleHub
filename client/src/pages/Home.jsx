import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, Shield, Zap, RefreshCw, ChevronRight, Check, Package, Layers, Bell, GitBranch, Terminal, Code2, ArrowRight } from 'lucide-react';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                {/* Background Glows */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] -z-10">
                    <div className="absolute inset-0 bg-blue-500/20 blur-[120px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }}></div>
                    <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-green-500/10 blur-[100px] rounded-full mix-blend-screen"></div>
                </div>

                <div className="container mx-auto px-4 text-center z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-slate-300 mb-8 hover:bg-white/10 transition-colors cursor-pointer"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        v2.0 is now live
                        <ChevronRight size={14} />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-7xl font-bold tracking-tight mb-8"
                    >
                        Ship faster with <span className="text-gradient">confidence.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
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
            <div className="border-y border-white/5 bg-white/5 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-8">
                    <p className="text-center text-sm font-medium text-slate-500 mb-6 uppercase tracking-wider">Trusted by modern engineering teams</p>
                    <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Placeholder logos using text for now */}
                        {['Acme Corp', 'GlobalTech', 'Nebula', 'Vertex', 'Horizon'].map((brand) => (
                            <span key={brand} className="text-xl font-bold text-slate-300">{brand}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Why ModuleHub */}
            <section className="py-24 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Why ModuleHub?</h2>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            Stop reinventing the wheel. Centralize your logic and UI components to boost productivity and maintain consistency.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <FeatureCard
                            icon={<Layers className="text-blue-400" />}
                            title="Centralized Registry"
                            desc="One source of truth for all your internal packages and UI components."
                        />
                        <FeatureCard
                            icon={<Bell className="text-amber-400" />}
                            title="Instant Notifications"
                            desc="Real-time alerts via WebSockets when dependencies are updated."
                        />
                        <FeatureCard
                            icon={<Shield className="text-green-400" />}
                            title="Secure Management"
                            desc="Role-based access control and vulnerability scanning built-in."
                        />
                        <FeatureCard
                            icon={<Zap className="text-purple-400" />}
                            title="Productivity Boost"
                            desc="Reduce code duplication and ship features 2x faster."
                        />
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-24 bg-slate-900/30 border-y border-white/5">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">How it works</h2>

                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500/20 via-blue-500/50 to-blue-500/20"></div>

                        <div className="grid md:grid-cols-3 gap-12">
                            <Step
                                number="01"
                                title="Publish Components"
                                desc="Teams add internal React components, packages, or utilities directly from the CLI."
                                icon={<Code2 size={24} className="text-blue-400" />}
                            />
                            <Step
                                number="02"
                                title="Track & Maintain"
                                desc="ModuleHub automatically generates docs, version history, and dependency graphs."
                                icon={<GitBranch size={24} className="text-blue-400" />}
                            />
                            <Step
                                number="03"
                                title="Notify Teams"
                                desc="Developers get instant socket-based updates for new versions and critical patches."
                                icon={<Bell size={24} className="text-blue-400" />}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-center mb-6">Why ModuleHub is better</h2>
                    <p className="text-center text-slate-400 mb-16">Built specifically for component management, unlike generic git repositories.</p>

                    <div className="overflow-x-auto">
                        <div className="glass-card rounded-2xl p-8 max-w-4xl mx-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="py-6 px-4 text-slate-400 font-medium">Feature</th>
                                        <th className="py-6 px-4 text-white font-bold text-xl text-center">ModuleHub</th>
                                        <th className="py-6 px-4 text-slate-500 font-medium text-center">Git Repos</th>
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
                    </div>
                </div>
            </section>

            {/* CTA / Contact */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/5"></div>
                <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 max-w-6xl">
                    <div className="flex-1">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to streamline your workflow?</h2>
                        <p className="text-slate-400 text-lg mb-8">Join leading engineering teams who are shipping faster with ModuleHub. Start for free today.</p>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                    <Check size={20} />
                                </div>
                                <span className="text-slate-300">Free for small teams</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                    <Check size={20} />
                                </div>
                                <span className="text-slate-300">Enterprise-grade security</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 w-full max-w-md">
                        <form className="glass-card p-8 rounded-2xl">
                            <h3 className="text-2xl font-bold mb-6">Get in touch</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1">Full Name</label>
                                    <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1">Work Email</label>
                                    <input type="email" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="john@company.com" />
                                </div>
                                <button type="button" className="w-full btn-primary mt-2">Contact Sales</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-950 border-t border-white/5 py-12 text-slate-400">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        <div className="col-span-1 md:col-span-2">
                            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white mb-4">
                                <Package size={24} className="text-blue-500" />
                                <span>ModuleHub</span>
                            </Link>
                            <p className="max-w-xs">The modern component registry for ambitious engineering teams.</p>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">Product</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Enterprise</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">Resources</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p>© 2024 ModuleHub Inc. All rights reserved.</p>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <div className="glass-card p-6 rounded-2xl hover:bg-white/5 transition-colors group">
        <div className="bg-slate-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-white/5">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400 leading-relaxed text-sm">{desc}</p>
    </div>
);

const Step = ({ number, title, desc, icon }) => (
    <div className="relative z-10 text-center">
        <div className="bg-slate-950 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 border-4 border-slate-900 shadow-xl relative">
            {icon}
            <div className="absolute -top-3 -right-3 bg-blue-600 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-slate-900 text-white">
                {number}
            </div>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400 text-sm max-w-xs mx-auto">{desc}</p>
    </div>
);

const ComparisonRow = ({ feature, moduleHub, git }) => (
    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
        <td className="py-4 px-4 text-white font-medium">{feature}</td>
        <td className="py-4 px-4 text-center">
            {moduleHub ? <Check className="inline text-green-400" size={20} /> : <span className="text-slate-600">-</span>}
        </td>
        <td className="py-4 px-4 text-center">
            {git ? <Check className="inline text-slate-500" size={20} /> : <span className="text-slate-600">-</span>}
        </td>
    </tr>
)

export default Home;
