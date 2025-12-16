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
        <nav className="fixed w-full z-50 transition-all duration-300 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
                        <div className="bg-gradient-to-tr from-blue-500 to-green-400 p-2 rounded-lg">
                            <Package size={24} className="text-white" />
                        </div>
                        <span className="text-white tracking-tight">ModuleHub</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/search" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-sm font-medium">
                            <Search size={16} />
                            Explore
                        </Link>
                        <a href="#" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Docs</a>

                        {user ? (
                            <>
                                <Link to={user.accountType === 'company' ? '/company/dashboard/notifs' : '/employee/dashboard/notifications'} className="relative text-slate-300 hover:text-white transition-colors">
                                    <Bell size={20} />
                                    {/* Todo: Add unread count check */}
                                    <span className="absolute -top-1 -right-1 bg-blue-500 rounded-full w-2 h-2"></span>
                                </Link>
                                <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                                    <Link to="/dashboard" className="text-sm font-medium text-white hover:text-blue-400 transition-colors">
                                        {user.username}
                                    </Link>
                                    <button onClick={handleLogout} className="text-sm text-red-400 hover:text-red-300 font-medium transition-colors">
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link to="/login" className="text-slate-300 hover:text-white font-medium text-sm">Log in</Link>
                                <Link to="/signup" className="px-5 py-2.5 bg-white text-slate-950 rounded-full hover:bg-slate-200 transition-colors font-semibold text-sm">
                                    Sign up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-t border-white/5 bg-slate-950">
                    <div className="px-4 py-4 flex flex-col gap-4">
                        <Link to="/search" className="py-2 text-slate-300" onClick={() => setIsOpen(false)}>Explore Packages</Link>
                        {user ? (
                            <>
                                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="py-2 text-white font-medium hover:text-blue-400 transition-colors">
                                    Signed in as {user.username}
                                </Link>
                                <button onClick={handleLogout} className="py-2 text-left text-red-400" >Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="py-2 text-slate-300" onClick={() => setIsOpen(false)}>Log in</Link>
                                <Link to="/signup" className="py-2 text-blue-400 font-medium" onClick={() => setIsOpen(false)}>Sign up</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
