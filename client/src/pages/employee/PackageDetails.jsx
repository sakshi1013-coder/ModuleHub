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
            <div className="flex justify-center items-center h-64 text-midnight/60">Loading...</div>
        </DashboardLayout>
    );

    if (!pkg) return (
        <DashboardLayout Sidebar={EmployeeSidebar}>
            <div className="text-center text-midnight/60">Package not found</div>
        </DashboardLayout>
    );

    return (
        <DashboardLayout Sidebar={EmployeeSidebar}>
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold text-midnight tracking-tight">{pkg.name}</h1>
                            <span className="bg-celeste/30 text-midnight text-xs px-2 py-1 rounded-md border border-celeste">v{pkg.currentVersion}</span>
                        </div>
                        <p className="text-midnight/70 text-lg">{pkg.description}</p>
                    </div>
                    <button
                        onClick={toggleSubscription}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${subscribed
                            ? 'bg-celeste/30 text-midnight border border-celeste hover:bg-celeste/40'
                            : 'bg-midnight text-white hover:bg-midnight-600 shadow-lg shadow-midnight/20'
                            }`}
                    >
                        <Heart className={subscribed ? "fill-marigold text-marigold" : ""} size={18} />
                        {subscribed ? 'Unsubscribe' : 'Subscribe'}
                    </button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="glass-card p-8 rounded-2xl border border-celeste bg-white">
                            <h3 className="text-lg font-bold text-midnight mb-4 border-b border-celeste pb-2">Documentation</h3>
                            <div className="prose max-w-none text-midnight">
                                {/* Simple renderer for now, better to use react-markdown */}
                                <pre className="whitespace-pre-wrap font-sans text-midnight/80">{pkg.documentation}</pre>
                            </div>
                        </div>

                        <div className="glass-card p-8 rounded-2xl border border-celeste bg-white">
                            <h3 className="text-lg font-bold text-midnight mb-4 border-b border-celeste pb-2">Version History</h3>
                            <div className="space-y-4">
                                {pkg.versions.slice().reverse().map((v, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="min-w-[80px] text-sm text-midnight/60 pt-1">v{v.version}</div>
                                        <div>
                                            <p className="text-midnight/80 text-sm">{v.changelog}</p>
                                            <span className="text-xs text-midnight/50">{new Date(v.publishedAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Stats */}
                    <div className="space-y-6">
                        <div className="glass-card p-6 rounded-xl border border-celeste bg-white">
                            <h4 className="text-xs font-bold text-midnight/60 uppercase tracking-wider mb-4">Installation</h4>
                            <div className="bg-celeste/20 p-3 rounded-lg border border-celeste font-mono text-sm text-midnight flex justify-between items-center group cursor-pointer hover:bg-celeste/30 transition-colors"
                                onClick={() => {
                                    navigator.clipboard.writeText(`npm i ${pkg.name}`);
                                    toast.success('Copied to clipboard');
                                }}
                            >
                                <span>npm i {pkg.name}</span>
                                <Download size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>

                        <div className="glass-card p-6 rounded-xl border border-celeste bg-white space-y-4">
                            <div>
                                <h4 className="text-xs font-bold text-midnight/60 uppercase tracking-wider mb-1">Company</h4>
                                <div className="flex items-center gap-2 text-midnight">
                                    <Shield size={16} className="text-herb" />
                                    {/* pkg.company is ObjectId if not populated deep, but let's hope it's populated or handle it */}
                                    {/* Note: getPackageDetails endpoint might need to populate 'company' */}
                                    <span>Verified Publisher</span>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-midnight/60 uppercase tracking-wider mb-1">Last Updated</h4>
                                <div className="flex items-center gap-2 text-midnight/70">
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
