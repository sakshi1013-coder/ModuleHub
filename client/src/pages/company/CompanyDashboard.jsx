import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Upload, Package, Clock, Shield } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import CompanySidebar from '../../components/CompanySidebar';
import api from '../../services/api';
import useSocket from '../../hooks/useSocket';
import { toast } from '../../components/NotificationToast';

const CompanyDashboard = () => {
    const [stats, setStats] = useState({
        totalPackages: 0,
        totalEmployees: 0,
        recentUpdates: 0
    });
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const socket = useSocket();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, pkgsRes] = await Promise.all([
                    api.get('/packages/stats'),
                    api.get('/packages')
                ]);
                setStats(statsRes.data);
                setPackages(pkgsRes.data);
            } catch (err) {
                console.error("Failed to fetch data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Real-time Updates
    useEffect(() => {
        if (!socket) return;

        socket.on('notification', (data) => {
            if (data.type === 'new-package') {
                // Refresh data or optimistically update
                // For simplicity/accuracy, let's refresh list
                api.get('/packages').then(res => setPackages(res.data));
                api.get('/packages/stats').then(res => setStats(res.data));
            }
        });

        return () => {
            socket.off('notification');
        };
    }, [socket]);

    return (
        <DashboardLayout Sidebar={CompanySidebar}>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Company Dashboard</h1>
                <p className="text-slate-400">Manage your company's internal packages and releases.</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="glass-card p-6 rounded-xl border border-slate-800 bg-slate-900/50">
                    <h3 className="text-slate-400 text-sm font-medium mb-1">Total Packages</h3>
                    <p className="text-3xl font-bold text-blue-400">{loading ? '-' : stats.totalPackages}</p>
                </div>
                <div className="glass-card p-6 rounded-xl border border-slate-800 bg-slate-900/50">
                    <h3 className="text-slate-400 text-sm font-medium mb-1">Total Employees</h3>
                    <p className="text-3xl font-bold text-green-400">{loading ? '-' : stats.totalEmployees}</p>
                </div>
                <div className="glass-card p-6 rounded-xl border border-slate-800 bg-slate-900/50">
                    <h3 className="text-slate-400 text-sm font-medium mb-1">Recent Updates (7d)</h3>
                    <p className="text-3xl font-bold text-purple-400">{loading ? '-' : stats.recentUpdates}</p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-4 mb-8">
                <Link to="/company/dashboard/publish" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg transition-all font-medium shadow-lg shadow-blue-500/20">
                    <Upload size={20} />
                    Publish New Package
                </Link>
            </div>

            {/* Package Overview */}
            <div className="glass-card rounded-xl border border-slate-200 bg-white/80 overflow-hidden shadow-xl">
                <div className="p-6 border-b border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900">Your Packages</h3>
                </div>

                {loading ? (
                    <div className="p-8 text-center text-slate-500">Loading packages...</div>
                ) : packages.length === 0 ? (
                    <div className="p-12 text-center">
                        <Package size={48} className="mx-auto text-slate-300 mb-4" />
                        <h3 className="text-lg font-medium text-slate-900 mb-1">No packages yet</h3>
                        <p className="text-slate-500 mb-6">Start by publishing your first package.</p>
                        <Link to="/company/dashboard/publish" className="text-blue-600 hover:text-blue-500 font-medium">
                            Publish Now &rarr;
                        </Link>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {packages.map(pkg => (
                            <div key={pkg._id} className="p-6 hover:bg-slate-50 transition-colors flex items-center justify-between group">
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-100 p-3 rounded-lg text-blue-600 mt-1">
                                        <Package size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
                                            {pkg.name}
                                            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200">v{pkg.currentVersion}</span>
                                        </h4>
                                        <p className="text-sm text-slate-500 line-clamp-1 max-w-md">{pkg.description}</p>
                                        <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                                            <span className="flex items-center gap-1"><Clock size={12} /> Updated {new Date(pkg.updatedAt).toLocaleDateString()}</span>
                                            <span className="flex items-center gap-1"><Shield size={12} /> {pkg.license || 'MIT'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Link to={`/company/dashboard/publish/${pkg._id}/version`} className="text-sm border border-slate-300 rounded-lg px-3 py-1.5 text-slate-600 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-all">
                                        Release Update
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </DashboardLayout>
    );
};

export default CompanyDashboard;
