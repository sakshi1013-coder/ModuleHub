import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Package, Search, Bell, Menu, X } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="fixed w-full z-50 transition-all duration-300 bg-white/90 backdrop-blur-md border-b border-celeste shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
                        <div className="bg-gradient-to-tr from-midnight to-herb p-2 rounded-lg">
                            <Package size={24} className="text-white" />
                        </div>
                        <span className="text-midnight tracking-tight">ModuleHub</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/search" className="flex items-center gap-2 text-midnight/70 hover:text-midnight transition-colors text-sm font-medium">
                            <Search size={16} />
                            Explore
                        </Link>
                        <Link to="/docs" className="text-midnight/70 hover:text-midnight transition-colors text-sm font-medium">Docs</Link>

                        {user ? (
                            <>
                                <Link to={user.accountType === 'company' ? '/company/dashboard/notifs' : '/employee/dashboard/notifications'} className="relative text-midnight/70 hover:text-midnight transition-colors">
                                    <Bell size={20} />
                                    {/* Todo: Add unread count check */}
                                    <span className="absolute -top-1 -right-1 bg-marigold rounded-full w-2 h-2"></span>
                                </Link>
                                <div className="flex items-center gap-4 pl-4 border-l border-celeste">
                                    <Link to="/dashboard" className="text-sm font-medium text-midnight hover:text-midnight-600 transition-colors">
                                        {user.username}
                                    </Link>
                                    <button onClick={handleLogout} className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors">
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link to="/login" className="text-midnight/70 hover:text-midnight font-medium text-sm">Log in</Link>
                                <Link to="/signup" className="px-5 py-2.5 bg-midnight text-white rounded-full hover:bg-midnight-600 transition-colors font-semibold text-sm">
                                    Sign up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-midnight" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-t border-celeste bg-white">
                    <div className="px-4 py-4 flex flex-col gap-4">
                        <Link to="/search" className="py-2 text-midnight/70" onClick={() => setIsOpen(false)}>Explore Packages</Link>
                        <Link to="/docs" className="py-2 text-midnight/70" onClick={() => setIsOpen(false)}>Docs</Link>
                        {user ? (
                            <>
                                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="py-2 text-midnight font-medium hover:text-midnight-600 transition-colors">
                                    Signed in as {user.username}
                                </Link>
                                <button onClick={handleLogout} className="py-2 text-left text-red-600" >Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="py-2 text-midnight/70" onClick={() => setIsOpen(false)}>Log in</Link>
                                <Link to="/signup" className="py-2 text-midnight font-medium" onClick={() => setIsOpen(false)}>Sign up</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
