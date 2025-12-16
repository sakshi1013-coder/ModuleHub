import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import CompanySidebar from '../../components/CompanySidebar';
import { useAuth } from '../../context/AuthContext';
import { Building2, Mail, Globe, Shield } from 'lucide-react';

const CompanySettings = () => {
    const { user } = useAuth();

    return (
        <DashboardLayout Sidebar={CompanySidebar}>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-midnight mb-2">Company Settings</h1>
                <p className="text-midnight/70">Manage your organization profile.</p>
            </div>

            <div className="max-w-2xl">
                <div className="glass-card p-8 rounded-2xl border border-celeste bg-white space-y-6">
                    <div>
                        <h3 className="text-lg font-bold text-midnight mb-4 flex items-center gap-2">
                            <Building2 className="text-celeste" size={20} />
                            Organization Details
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-midnight/60 uppercase mb-1">Company Name</label>
                                <div className="p-3 bg-celeste/30 rounded-lg text-midnight border border-celeste">
                                    {user?.company?.companyName || 'Loading...'}
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-midnight/60 uppercase mb-1">Company Code</label>
                                <div className="p-3 bg-celeste/30 rounded-lg text-midnight font-mono font-bold border border-celeste tracking-widest flex justify-between items-center">
                                    {user?.company?.companyCode || '...'}
                                    <Shield size={16} className="text-herb" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-celeste">
                        <h3 className="text-lg font-bold text-midnight mb-4 flex items-center gap-2">
                            <Globe className="text-marigold" size={20} />
                            Contact & Domain
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-midnight/60 uppercase mb-1">Admin Email</label>
                                <div className="p-3 bg-celeste/30 rounded-lg text-midnight border border-celeste flex items-center gap-2">
                                    <Mail size={16} className="text-midnight/50" />
                                    {user?.company?.companyEmail || '...'}
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-midnight/60 uppercase mb-1">Verified Domain</label>
                                <div className="p-3 bg-celeste/30 rounded-lg text-midnight border border-celeste">
                                    {user?.company?.domain || 'Not configured'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </DashboardLayout>
    );
};

export default CompanySettings;
