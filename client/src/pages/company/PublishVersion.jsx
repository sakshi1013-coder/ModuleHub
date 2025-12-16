import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import CompanySidebar from '../../components/CompanySidebar';
import api from '../../services/api';
import { toast } from '../../components/NotificationToast';
import { FileCode, Loader, Package, History } from 'lucide-react';

const PublishVersion = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [packages, setPackages] = useState([]);

    const [formData, setFormData] = useState({
        packageId: '',
        version: '',
        changelog: ''
    });

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const res = await api.get('/packages');
                setPackages(res.data);
            } catch (err) {
                console.error(err);
                toast.error('Failed to load packages');
            } finally {
                setFetching(false);
            }
        };
        fetchPackages();
    }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/packages/version', formData);
            toast.success('Version published & Employees notified!');
            navigate('/company/dashboard/notifs'); // Redirect to log as requested
        } catch (err) {
            toast.error(err.response?.data?.msg || 'Failed to publish version');
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout Sidebar={CompanySidebar}>
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Publish New Version</h1>
                    <p className="text-slate-400">Release an update to an existing package.</p>
                </div>

                <div className="glass-card p-8 rounded-2xl border border-slate-800 bg-slate-900/50">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div>
                            <label className="block text-xs font-medium text-slate-400 uppercase mb-2">Select Package</label>
                            <div className="relative">
                                <Package className="absolute left-3 top-3 text-slate-500" size={18} />
                                <select
                                    name="packageId"
                                    value={formData.packageId}
                                    onChange={handleChange}
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-600 focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                                    required
                                >
                                    <option value="">-- Choose a Package --</option>
                                    {packages.map(pkg => (
                                        <option key={pkg._id} value={pkg._id}>
                                            {pkg.name} (v{pkg.currentVersion})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-400 uppercase mb-2">New Version Number</label>
                            <div className="relative">
                                <FileCode className="absolute left-3 top-3 text-slate-500" size={18} />
                                <input
                                    type="text"
                                    name="version"
                                    value={formData.version}
                                    onChange={handleChange}
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-600 focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="e.g. 1.1.0"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-400 uppercase mb-2">Changelog / Update Message</label>
                            <div className="relative">
                                <History className="absolute left-3 top-3 text-slate-500" size={18} />
                                <textarea
                                    name="changelog"
                                    value={formData.changelog}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-600 focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="What's new in this version?"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={loading || fetching}
                                className="bg-green-600 hover:bg-green-500 text-white font-medium py-2.5 px-8 rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-green-500/20"
                            >
                                {loading ? <Loader className="animate-spin" size={20} /> : 'Release Update'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default PublishVersion;
