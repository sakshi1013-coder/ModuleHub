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
                <h1 className="text-3xl font-bold text-midnight mb-2">Company Dashboard</h1>
                <p className="text-midnight/70">Manage your company's internal packages and releases.</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="glass-card p-6 rounded-xl border border-celeste bg-white">
                    <h3 className="text-midnight/60 text-sm font-medium mb-1">Total Packages</h3>
                    <p className="text-3xl font-bold text-midnight">{loading ? '-' : stats.totalPackages}</p>
                </div>
                <div className="glass-card p-6 rounded-xl border border-celeste bg-white">
                    <h3 className="text-midnight/60 text-sm font-medium mb-1">Total Employees</h3>
                    <p className="text-3xl font-bold text-herb">{loading ? '-' : stats.totalEmployees}</p>
                </div>
                <div className="glass-card p-6 rounded-xl border border-celeste bg-white">
                    <h3 className="text-midnight/60 text-sm font-medium mb-1">Recent Updates (7d)</h3>
                    <p className="text-3xl font-bold text-marigold">{loading ? '-' : stats.recentUpdates}</p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-4 mb-8">
                <Link to="/company/dashboard/publish" className="flex items-center gap-2 bg-midnight hover:bg-midnight-600 text-white px-6 py-3 rounded-lg transition-all font-medium shadow-lg shadow-midnight/20">
                    <Upload size={20} />
                    Publish New Package
                </Link>
            </div>

            {/* Package Overview */}
            <div className="glass-card rounded-xl border border-celeste bg-white overflow-hidden shadow-xl">
                <div className="p-6 border-b border-celeste">
                    <h3 className="text-lg font-bold text-midnight">Your Packages</h3>
                </div>

                {loading ? (
                    <div className="p-8 text-center text-midnight/60">Loading packages...</div>
                ) : packages.length === 0 ? (
                    <div className="p-12 text-center">
                        <Package size={48} className="mx-auto text-midnight/30 mb-4" />
                        <h3 className="text-lg font-medium text-midnight mb-1">No packages yet</h3>
                        <p className="text-midnight/60 mb-6">Start by publishing your first package.</p>
                        <Link to="/company/dashboard/publish" className="text-midnight hover:text-midnight-600 font-medium">
                            Publish Now &rarr;
                        </Link>
                    </div>
                ) : (
                    <div className="divide-y divide-celeste">
                        {packages.map(pkg => (
                            <div key={pkg._id} className="p-6 hover:bg-celeste/10 transition-colors flex items-center justify-between group">
                                <div className="flex items-start gap-4">
                                    <div className="bg-celeste/30 p-3 rounded-lg text-midnight mt-1">
                                        <Package size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-bold text-midnight mb-1 flex items-center gap-2">
                                            {pkg.name}
                                            <span className="text-xs bg-celeste/30 text-midnight px-2 py-0.5 rounded-full border border-celeste">v{pkg.currentVersion}</span>
                                        </h4>
                                        <p className="text-sm text-midnight/70 line-clamp-1 max-w-md">{pkg.description}</p>
                                        <div className="flex items-center gap-4 mt-3 text-xs text-midnight/60">
                                            <span className="flex items-center gap-1"><Clock size={12} /> Updated {new Date(pkg.updatedAt).toLocaleDateString()}</span>
                                            <span className="flex items-center gap-1"><Shield size={12} /> {pkg.license || 'MIT'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Link to={`/company/dashboard/publish/${pkg._id}/version`} className="text-sm border border-celeste rounded-lg px-3 py-1.5 text-midnight hover:text-midnight-600 hover:border-midnight hover:bg-midnight/5 transition-all">
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
