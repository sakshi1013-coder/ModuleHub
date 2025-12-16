import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import EmployeeSidebar from '../../components/EmployeeSidebar';
import { Heart } from 'lucide-react';
import api from '../../services/api';

const EmployeeSubscriptions = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubs = async () => {
            try {
                const res = await api.get('/packages/subscribed');
                setSubscriptions(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchSubs();
    }, []);

    return (
        <DashboardLayout Sidebar={EmployeeSidebar}>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">My Subscriptions</h1>
                <p className="text-slate-400">Packages you are following.</p>
            </div>

            {loading ? (
                <div className="text-center text-slate-500">Loading subscriptions...</div>
            ) : subscriptions.length === 0 ? (
                <div className="glass-card p-12 rounded-xl border border-slate-800 bg-slate-900/50 text-center">
                    <div className="inline-flex p-4 rounded-full bg-slate-800 text-slate-500 mb-4">
                        <Heart size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No subscriptions yet</h3>
                    <p className="text-slate-400">
                        Go to <a href="/employee/dashboard/explore" className="text-blue-400 hover:underline">Explore</a> to find packages.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subscriptions.map(pkg => (
                        <div key={pkg._id} className="glass-card p-6 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800/80 transition-all">
                            <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                            <p className="text-slate-400 text-sm mb-4 line-clamp-2 h-10">{pkg.description}</p>
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-800/50">
                                <span className="text-xs text-slate-500">v{pkg.currentVersion}</span>
                                <a href={`/packages/${pkg._id}`} className="text-sm font-medium text-blue-400">View Details</a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </DashboardLayout>
    );
};

export default EmployeeSubscriptions;
