import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import EmployeeSidebar from '../../components/EmployeeSidebar';
import api from '../../services/api';
import { Package, Clock, Shield, Download, Heart } from 'lucide-react';
import { toast } from '../../components/NotificationToast';

const PackageDetails = () => {
    const { id } = useParams();
    const [pkg, setPkg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [subscribed, setSubscribed] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [pkgRes, subRes] = await Promise.all([
                    api.get(`/packages/${id}`),
                    api.get('/packages/subscribed')
                ]);

                setPkg(pkgRes.data);

                // Check if subscribed
                const isSub = subRes.data.some(s => s._id === id);
                setSubscribed(isSub);

            } catch (err) {
                console.error(err);
                toast.error('Failed to load package');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const toggleSubscription = async () => {
        try {
            if (subscribed) {
                await api.delete(`/packages/${id}/subscribe`);
                setSubscribed(false);
                toast.success('Unsubscribed');
            } else {
                await api.post(`/packages/${id}/subscribe`);
                setSubscribed(true);
                toast.success('Subscribed');
            }
        } catch (err) {
            toast.error('Action failed');
        }
    };

    if (loading) return (
        <DashboardLayout Sidebar={EmployeeSidebar}>
            <div className="flex justify-center items-center h-64 text-slate-500">Loading...</div>
        </DashboardLayout>
    );

    if (!pkg) return (
        <DashboardLayout Sidebar={EmployeeSidebar}>
            <div className="text-center text-slate-500">Package not found</div>
        </DashboardLayout>
    );

    return (
        <DashboardLayout Sidebar={EmployeeSidebar}>
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold text-white tracking-tight">{pkg.name}</h1>
                            <span className="bg-slate-800 text-slate-300 text-xs px-2 py-1 rounded-md border border-slate-700">v{pkg.currentVersion}</span>
                        </div>
                        <p className="text-slate-400 text-lg">{pkg.description}</p>
                    </div>
                    <button
                        onClick={toggleSubscription}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${subscribed
                            ? 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
                            : 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/20'
                            }`}
                    >
                        <Heart className={subscribed ? "fill-red-500 text-red-500" : ""} size={18} />
                        {subscribed ? 'Unsubscribe' : 'Subscribe'}
                    </button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="glass-card p-8 rounded-2xl border border-slate-800 bg-slate-900/50">
                            <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-2">Documentation</h3>
                            <div className="prose prose-invert max-w-none text-slate-300">
                                {/* Simple renderer for now, better to use react-markdown */}
                                <pre className="whitespace-pre-wrap font-sans">{pkg.documentation}</pre>
                            </div>
                        </div>

                        <div className="glass-card p-8 rounded-2xl border border-slate-800 bg-slate-900/50">
                            <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-2">Version History</h3>
                            <div className="space-y-4">
                                {pkg.versions.slice().reverse().map((v, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="min-w-[80px] text-sm text-slate-500 pt-1">v{v.version}</div>
                                        <div>
                                            <p className="text-slate-300 text-sm">{v.changelog}</p>
                                            <span className="text-xs text-slate-600">{new Date(v.publishedAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Stats */}
                    <div className="space-y-6">
                        <div className="glass-card p-6 rounded-xl border border-slate-800 bg-slate-900/50">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Installation</h4>
                            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-sm text-blue-400 flex justify-between items-center group cursor-pointer"
                                onClick={() => {
                                    navigator.clipboard.writeText(`npm i ${pkg.name}`);
                                    toast.success('Copied to clipboard');
                                }}
                            >
                                <span>npm i {pkg.name}</span>
                                <Download size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>

                        <div className="glass-card p-6 rounded-xl border border-slate-800 bg-slate-900/50 space-y-4">
                            <div>
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Company</h4>
                                <div className="flex items-center gap-2 text-white">
                                    <Shield size={16} className="text-green-500" />
                                    {/* pkg.company is ObjectId if not populated deep, but let's hope it's populated or handle it */}
                                    {/* Note: getPackageDetails endpoint might need to populate 'company' */}
                                    <span>Verified Publisher</span>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Last Updated</h4>
                                <div className="flex items-center gap-2 text-slate-300">
                                    <Clock size={16} />
                                    <span>{new Date(pkg.updatedAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default PackageDetails;
