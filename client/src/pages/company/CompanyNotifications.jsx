import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import CompanySidebar from '../../components/CompanySidebar';
import api from '../../services/api';
import { Bell, Clock, Package } from 'lucide-react';

const CompanyNotifications = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                // We'll treat the package version history as the "Notification Log" of what was sent out.
                const res = await api.get('/packages');
                const packages = res.data;

                let allVersions = [];
                packages.forEach(pkg => {
                    pkg.versions.forEach(v => {
                        allVersions.push({
                            ...v,
                            pkgName: pkg.name,
                            pkgId: pkg._id
                        });
                    });
                });

                // Sort by date desc
                allVersions.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
                setLogs(allVersions);

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, []);

    return (
        <DashboardLayout Sidebar={CompanySidebar}>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-midnight mb-2">Notifications Log</h1>
                <p className="text-midnight/70">History of updates pushed to your employees.</p>
            </div>

            <div className="glass-card rounded-xl border border-celeste bg-white overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-midnight/60">Loading history...</div>
                ) : logs.length === 0 ? (
                    <div className="p-8 text-center text-midnight/60">No updates pushed yet.</div>
                ) : (
                    <div className="divide-y divide-celeste">
                        {logs.map((log, idx) => (
                            <div key={idx} className="p-4 hover:bg-celeste/10 transition-colors flex items-start gap-4">
                                <div className="bg-midnight/10 p-2 rounded-full text-midnight mt-1">
                                    <Bell size={16} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-bold text-midnight text-sm">
                                            Released <span className="text-midnight-600">{log.pkgName}</span> v{log.version}
                                        </h4>
                                        <span className="text-xs text-midnight/60 flex items-center gap-1">
                                            <Clock size={12} />
                                            {new Date(log.publishedAt).toLocaleString()}
                                        </span>
                                    </div>
                                    <p className="text-midnight/70 text-sm mt-1">{log.changelog || 'No changelog provided.'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </DashboardLayout>
    );
};

export default CompanyNotifications;
