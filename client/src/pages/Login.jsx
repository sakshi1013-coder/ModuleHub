import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from '../components/NotificationToast';

const Login = () => {
    const [accountType, setAccountType] = useState('employee'); // Default to employee
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // We pass accountType contextually, though backend finds user by email. 
        // We could verify on frontend if needed, but auto-redirect handles it.
        const res = await login(formData.email, formData.password);
        if (res.success) {
            toast.success('Logged in successfully');
            if (accountType === 'company') {
                navigate('/company/dashboard');
            } else {
                navigate('/');
            }
        } else {
            toast.error(res.error);
        }
    };

    return (
        <div className="flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 glass-card p-10 rounded-2xl border border-slate-200 bg-white/80 shadow-2xl relative overflow-hidden">

                {/* Decor elements */}
                <div className="absolute top-0 right-0 p-4 -mr-4 -mt-4 bg-blue-100 rounded-full blur-2xl w-32 h-32 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 p-4 -ml-4 -mb-4 bg-purple-100 rounded-full blur-2xl w-32 h-32 pointer-events-none"></div>

                <div className="text-center relative z-10">
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome Back</h2>
                    <p className="mt-2 text-sm text-slate-600">Sign in to your ModuleHub account</p>
                </div>

                {/* Account Type Toggle */}
                <div className="flex bg-slate-100 p-1 rounded-xl relative z-10 mb-6 border border-slate-200">
                    <button
                        type="button"
                        onClick={() => setAccountType('employee')}
                        className={`flex-1 flex items-center justify-center py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${accountType === 'employee'
                            ? 'bg-white text-blue-600 shadow-sm border border-slate-200'
                            : 'text-slate-500 hover:text-slate-900'
                            }`}
                    >
                        Employee
                    </button>
                    <button
                        type="button"
                        onClick={() => setAccountType('company')}
                        className={`flex-1 flex items-center justify-center py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${accountType === 'company'
                            ? 'bg-white text-purple-600 shadow-sm border border-slate-200'
                            : 'text-slate-500 hover:text-slate-900'
                            }`}
                    >
                        Company
                    </button>
                </div>

                <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Email Address</label>
                            <input
                                name="email"
                                type="email"
                                required
                                className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="you@company.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Password</label>
                            <input
                                name="password"
                                type="password"
                                required
                                className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-blue-500/20"
                    >
                        Sign in
                    </button>
                </form>

                <div className="text-center mt-4">
                    <p className="text-sm text-slate-600">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
