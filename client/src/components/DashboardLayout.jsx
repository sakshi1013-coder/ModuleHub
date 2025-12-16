import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardLayout = ({ Sidebar, children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-slate-950 text-white pt-16">
            {/* Mobile Sidebar Toggle */}
            <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden fixed bottom-4 right-4 z-50 bg-blue-600 p-3 rounded-full shadow-lg"
            >
                <Menu />
            </button>

            {/* Sidebar Wrapper */}
            <AnimatePresence>
                {(isSidebarOpen || window.innerWidth >= 1024) && (
                    <motion.div
                        initial={{ x: -300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 p-4 transform lg:transform-none pt-20 lg:pt-4 overflow-y-auto block`}
                        style={{ display: isSidebarOpen ? 'block' : undefined }} // Hydration fix helper
                    >
                        {/* Close Button Mobile */}
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden absolute top-4 right-4 text-slate-400"
                        >
                            <X />
                        </button>

                        <Sidebar />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 p-6 lg:p-10 overflow-x-hidden">
                {children}
            </main>

            {/* Backdrop for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default DashboardLayout;
