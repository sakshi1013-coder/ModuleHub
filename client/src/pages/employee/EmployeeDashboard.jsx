import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import EmployeeSidebar from '../../components/EmployeeSidebar';
import api from '../../services/api';
import useSocket from '../../hooks/useSocket';
import { Package, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmployeeDashboard = () => {
    useSocket(); // Initialize socket listener
    const [packages, setPackages] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [pkgRes, subRes] = await Promise.all([
                    api.get('/packages'),
                    api.get('/packages/subscribed')
                ]);
                setPackages(pkgRes.data);
                setSubscriptions(subRes.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <DashboardLayout Sidebar={EmployeeSidebar}>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Developer Workspace</h1>
                <p className="text-slate-400">Explore libraries and stay updated.</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="glass-card p-6 rounded-xl border border-slate-800 bg-slate-900/50">
                    <h3 className="text-slate-400 text-sm font-medium mb-1">Available Packages</h3>
                    <p className="text-3xl font-bold text-blue-400">{packages.length}</p>
                </div>
                <div className="glass-card p-6 rounded-xl border border-slate-800 bg-slate-900/50">
                    <h3 className="text-slate-400 text-sm font-medium mb-1">My Subscriptions</h3>
                    <p className="text-3xl font-bold text-pink-400">{subscriptions.length}</p>
                </div>
            </div>

            {/* Packages List */}
            <div>
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Package className="text-blue-500" size={24} />
                    Latest Packages
                </h2>

                {loading ? (
                    <div className="text-slate-400">Loading packages...</div>
                ) : packages.length === 0 ? (
                    <div className="p-8 border border-dashed border-slate-800 rounded-xl text-center text-slate-500">
                        No packages published yet.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {packages.map(pkg => (
                            <div key={pkg._id} className="glass-card p-6 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800/50 transition-colors group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="bg-blue-500/10 p-3 rounded-lg text-blue-400">
                                        <Package size={24} />
                                    </div>
                                    <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded-full border border-slate-700">
                                        v{pkg.currentVersion}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{pkg.name}</h3>
                                <p className="text-slate-400 text-sm mb-4 line-clamp-2 h-10">{pkg.description}</p>

                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-800">
                                    <span className="text-xs text-slate-500 flex items-center gap-1">
                                        <Clock size={12} />
                                        {new Date(pkg.updatedAt).toLocaleDateString()}
                                    </span>
                                    <Link to={`/packages/${pkg._id}`} className="text-sm font-medium text-blue-400 flex items-center gap-1 hover:gap-2 transition-all">
                                        View Docs <ArrowRight size={14} />
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

export default EmployeeDashboard;
