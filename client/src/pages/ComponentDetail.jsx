import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { io } from 'socket.io-client';
import { Package, Download, GitBranch, Terminal, Clock } from 'lucide-react';
import { toast } from '../components/NotificationToast';

const ComponentDetail = () => {
    const { name } = useParams();
    const [component, setComponent] = useState(null);
    const [versions, setVersions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchComponent();

        // Socket Setup
        const socket = io('http://localhost:5001');

        socket.on('connect', () => {
            console.log('Connected to socket server');
        });

        socket.on('new_version', (data) => {
            if (data.component === name) {
                toast.info(`New version v${data.version} available!`);
                fetchComponent(); // Refresh data
            }
        });

        return () => socket.disconnect();
    }, [name]);

    const fetchComponent = async () => {
        try {
            const res = await api.get(`/components/${name}`);
            setComponent(res.data.component);
            setVersions(res.data.versions);
        } catch (err) {
            console.error(err);
            toast.error('Failed to load component');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (!component) return <div className="text-center py-20">Component not found</div>;

    const latestVersion = versions[0];

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="glass-card p-8 rounded-2xl border border-white/5 shadow-sm mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                            <Package className="text-blue-500" />
                            {component.name}
                        </h1>
                        <p className="text-lg text-slate-400">{component.description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full font-mono font-medium">
                            v{latestVersion?.versionNumber || '0.0.0'}
                        </span>
                        <a
                            href={component.repository}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-500 hover:text-white transition-colors"
                        >
                            <GitBranch />
                        </a>
                    </div>
                </div>

                {/* Install Command */}
                <div className="bg-slate-950/50 border border-slate-800 text-slate-300 p-4 rounded-lg font-mono text-sm flex items-center gap-3">
                    <Terminal size={16} className="text-slate-500" />
                    <span>npm install {component.name}</span>
                    <button
                        className="ml-auto text-slate-500 hover:text-white transition-colors"
                        onClick={() => {
                            navigator.clipboard.writeText(`npm install ${component.name}`);
                            toast.success('Copied to clipboard');
                        }}
                    >
                        Copy
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Main Content (Readme/Changelog) */}
                <div className="md:col-span-2 space-y-8">
                    <div className="glass-card p-8 rounded-2xl border border-white/5">
                        <h2 className="text-xl font-bold mb-4 border-b border-white/5 pb-2 text-white">Latest Changes</h2>
                        {latestVersion ? (
                            <div className="prose prose-invert text-slate-300">
                                {latestVersion.changelog || 'No changelog provided.'}
                            </div>
                        ) : (
                            <p className="text-slate-500">No versions published yet.</p>
                        )}
                    </div>

                    <div className="glass-card p-8 rounded-2xl border border-white/5">
                        <h2 className="text-xl font-bold mb-4 border-b border-white/5 pb-2 text-white">Usage</h2>
                        <pre className="bg-slate-950 p-4 rounded-lg overflow-x-auto text-sm font-mono border border-slate-800 text-slate-300">
                            {latestVersion?.codeSnippet || '// No usage example provided'}
                        </pre>
                    </div>
                </div>

                {/* Sidebar (Version History) */}
                <div className="space-y-6">
                    <div className="glass-card p-6 rounded-2xl border border-white/5">
                        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                            <Clock size={18} />
                            Version History
                        </h3>
                        <div className="space-y-4">
                            {versions.map((ver) => (
                                <div key={ver._id} className="flex justify-between items-center border-b border-white/5 last:border-0 pb-3 last:pb-0">
                                    <span className="font-mono text-blue-400 font-medium">v{ver.versionNumber}</span>
                                    <span className="text-xs text-slate-500">{new Date(ver.createdAt).toLocaleDateString()}</span>
                                </div>
                            ))}
                            {versions.length === 0 && <span className="text-slate-500 text-sm">No versions</span>}
                        </div>
                    </div>

                    <div className="glass-card p-6 rounded-2xl border border-white/5">
                        <h3 className="font-bold text-white mb-4">Metadata</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-500">Maintainer</span>
                                <span className="font-medium text-slate-300">{component.maintainer?.username}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">License</span>
                                <span className="font-medium text-slate-300">MIT</span>
                            </div>
                            <div className="mt-4 pt-4 border-t border-white/5">
                                <div className="flex flex-wrap gap-2">
                                    {component.tags.map(tag => (
                                        <span key={tag} className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded">#{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComponentDetail;
