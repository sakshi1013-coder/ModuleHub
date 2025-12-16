import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import EmployeeSidebar from '../../components/EmployeeSidebar';
import api from '../../services/api';
import { Search, Package, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const ExplorePackages = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // Initial fetch of recent packages
    useEffect(() => {
        handleSearch('');
    }, []);

    const handleSearch = async (searchQuery) => {
        setLoading(true);
        try {
            // Using the global search endpoint
            const res = await api.get(`/components?search=${searchQuery}`);
            setResults(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        handleSearch(query);
    };

    return (
        <DashboardLayout Sidebar={EmployeeSidebar}>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Explore Packages</h1>
                <p className="text-slate-400">Search for components and libraries across the registry.</p>
            </div>

            {/* Search Bar */}
            <div className="mb-8">
                <form onSubmit={onSubmit} className="relative max-w-2xl">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search packages by name, description..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-lg"
                    />
                </form>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full text-center text-slate-500 py-12">Searching...</div>
                ) : results.length === 0 ? (
                    <div className="col-span-full text-center text-slate-500 py-12">No packages found.</div>
                ) : (
                    results.map(pkg => (
                        <div key={pkg._id} className="glass-card p-6 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800/80 transition-all group hover:-translate-y-1">
                            <div className="flex justify-between items-start mb-4">
                                <div className="bg-blue-500/10 p-3 rounded-lg text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                    <Package size={24} />
                                </div>
                                {pkg.company && (
                                    <span className="text-xs font-mono text-slate-500 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                                        {pkg.company.companyName}
                                    </span>
                                )}
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{pkg.name}</h3>
                            <p className="text-slate-400 text-sm mb-4 line-clamp-2 h-10">{pkg.description}</p>

                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-800/50">
                                <span className="text-xs text-slate-500 flex items-center gap-1">
                                    <Clock size={12} /> v{pkg.currentVersion}
                                </span>
                                <Link to={`/packages/${pkg._id}`} className="text-sm font-medium text-blue-400 flex items-center gap-1 hover:gap-2 transition-all">
                                    View <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </DashboardLayout>
    );
};

export default ExplorePackages;
