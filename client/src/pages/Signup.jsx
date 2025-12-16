import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, User, Mail, Lock, Key, ArrowRight, Loader, Globe } from 'lucide-react';
import { toast } from '../components/NotificationToast';

const Signup = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    // Toggle: 'employee' | 'company'
    const [accountType, setAccountType] = useState('employee');
    const [loading, setLoading] = useState(false);
    const [successData, setSuccessData] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        companyName: '',
        companyCode: '',
        domain: '', // Optional
        role: 'developer'
    });

    const { name, email, password, companyName, companyCode, domain, role } = formData;

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Prepare Payload
        const payload = {
            accountType,
            email,
            password,
            ...(accountType === 'employee'
                ? { name, companyCode, role }
                : { companyName, domain }
            )
        };

        const res = await register(payload);
        setLoading(false);

        if (res.success) {
            if (accountType === 'company' && res.companyCode) {
                // Show success state for company creation
                setSuccessData({
                    companyCode: res.companyCode,
                    companyName: companyName
                });
            } else {
                toast.success('Welcome to the team!');
                navigate('/');
            }
        } else {
            toast.error(res.error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh] relative">
            {/* Modal Overlay */}
            {successData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white border border-slate-200 rounded-2xl p-6 max-w-sm w-full relative shadow-2xl"
                    >
                        <button
                            onClick={() => navigate('/')}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <span className="sr-only">Close</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>

                        <div className="text-center">
                            <div className="bg-green-500/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-green-400">
                                <Building2 size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Company Created!</h3>
                            <p className="text-slate-400 text-sm mb-6">
                                <span className="text-slate-900 font-medium">{successData.companyName}</span> is ready.
                            </p>

                            <div className="bg-slate-50 rounded-lg p-3 mb-6 border border-slate-200">
                                <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1 font-bold">Company Code</p>
                                <code className="text-xl font-mono text-blue-600 font-bold tracking-widest select-all">
                                    {successData.companyCode}
                                </code>
                            </div>

                            <button
                                onClick={() => navigate('/')}
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-lg transition-all text-sm"
                            >
                                Go to Dashboard
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`w-full max-w-md transition-all duration-300 ${successData ? 'blur-sm grayscale opacity-50' : ''}`}
            >
                <div className="glass-card p-8 rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-xl shadow-xl">

                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-slate-900">Get Started</h2>
                        <p className="text-slate-600 text-sm mt-1">Create an account to access modules.</p>
                    </div>

                    {/* Toggle */}
                    <div className="flex bg-slate-100 p-1 rounded-lg mb-6 border border-slate-200">
                        <button
                            type="button"
                            onClick={() => setAccountType('employee')}
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${accountType === 'employee' ? 'bg-white text-blue-600 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-900'}`}
                        >
                            Employee
                        </button>
                        <button
                            type="button"
                            onClick={() => setAccountType('company')}
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${accountType === 'company' ? 'bg-white text-blue-600 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-900'}`}
                        >
                            Company
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* ---------------- EMPLOYEE FORM ---------------- */}
                        {accountType === 'employee' && (
                            <>
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 text-slate-500" size={18} />
                                        <input
                                            type="text"
                                            name="name"
                                            value={name}
                                            onChange={handleChange}
                                            className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-4 py-2.5 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-none"
                                            placeholder="Sakshi"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Work Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 text-slate-500" size={18} />
                                        <input
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={handleChange}
                                            className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-4 py-2.5 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-none"
                                            placeholder="sak@company.com"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Company Code</label>
                                    <div className="relative">
                                        <Key className="absolute left-3 top-3 text-slate-500" size={18} />
                                        <input
                                            type="text"
                                            name="companyCode"
                                            value={companyCode}
                                            onChange={handleChange}
                                            className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-4 py-2.5 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-none uppercase tracking-widest"
                                            placeholder="CMP-48391"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Role</label>
                                    <div className="relative">
                                        <ArrowRight className="absolute left-3 top-3 text-slate-500 rotate-90" size={18} />
                                        <select
                                            name="role"
                                            value={role}
                                            onChange={handleChange}
                                            className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-4 py-2.5 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                                        >
                                            <option value="developer">Developer</option>
                                            <option value="maintainer">Maintainer</option>
                                        </select>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* ---------------- COMPANY FORM ---------------- */}
                        {accountType === 'company' && (
                            <>
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Company Name</label>
                                    <div className="relative">
                                        <Building2 className="absolute left-3 top-3 text-slate-500" size={18} />
                                        <input
                                            type="text"
                                            name="companyName"
                                            value={companyName}
                                            onChange={handleChange}
                                            className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-4 py-2.5 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-none"
                                            placeholder="TechFlow Labs"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Company Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 text-slate-500" size={18} />
                                        <input
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={handleChange}
                                            className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-4 py-2.5 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-none"
                                            placeholder="admin@techflow.com"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Domain (Optional)</label>
                                    <div className="relative">
                                        <Globe className="absolute left-3 top-3 text-slate-500" size={18} />
                                        <input
                                            type="text"
                                            name="domain"
                                            value={domain}
                                            onChange={handleChange}
                                            className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-4 py-2.5 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-none"
                                            placeholder="techflow.com"
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {/* ---------------- COMMON: PASSWORD ---------------- */}
                        <div>
                            <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 text-slate-500" size={18} />
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-4 py-2.5 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-lg transition-all mt-4 flex justify-center items-center shadow-lg shadow-blue-500/20"
                        >
                            {loading ? <Loader className="animate-spin" /> : (accountType === 'company' ? 'Register Company' : 'Create Account')}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link to="/login" className="text-sm text-blue-600 hover:text-blue-500 font-medium">
                            Already have an account? Log in
                        </Link>
                    </div>

                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
