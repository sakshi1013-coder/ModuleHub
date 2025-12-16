import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import CompanySidebar from '../../components/CompanySidebar';
import api from '../../services/api';
import { toast } from '../../components/NotificationToast';
import { Upload, Book, FileText, Loader } from 'lucide-react';

const PublishPackage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        version: '1.0.0',
        documentation: '# Getting Started\n\nInstall the package...',
        dependencies: [] // Can be enhanced later
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/packages/publish', formData);
            toast.success('Package published successfully!');
            navigate('/company/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.msg || 'Failed to publish');
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout Sidebar={CompanySidebar}>
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Publish New Package</h1>
                    <p className="text-slate-400">Deploy a new component to your organization's registry.</p>
                </div>

                <div className="glass-card p-8 rounded-2xl border border-slate-800 bg-slate-900/50">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-medium text-slate-400 uppercase mb-2">Package Name</label>
                                <div className="relative">
                                    <Upload className="absolute left-3 top-3 text-slate-500" size={18} />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-600 focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="@company/ui-kit"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-400 uppercase mb-2">Initial Version</label>
                                <div className="relative">
                                    <FileText className="absolute left-3 top-3 text-slate-500" size={18} />
                                    <input
                                        type="text"
                                        name="version"
                                        value={formData.version}
                                        onChange={handleChange}
                                        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-600 focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="1.0.0"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-400 uppercase mb-2">Description</label>
                            <input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-600 focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="A brief summary of what this package does..."
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-400 uppercase mb-2">Documentation (Markdown)</label>
                            <div className="relative">
                                <Book className="absolute left-3 top-3 text-slate-500" size={18} />
                                <textarea
                                    name="documentation"
                                    value={formData.documentation}
                                    onChange={handleChange}
                                    rows={8}
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-600 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
                                    placeholder="# Documentation..."
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 px-8 rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20"
                            >
                                {loading ? <Loader className="animate-spin" size={20} /> : 'Publish Package'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default PublishPackage;
