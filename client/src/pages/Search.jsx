import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../services/api';
import { Search as SearchIcon, Package, Shield, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [searchTerm, setSearchTerm] = useState(query);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchComponents(query);
    }, [query]);

    const fetchComponents = async (term) => {
        setLoading(true);
        try {
            // If term is empty, it returns all
            const res = await api.get(`/components?search=${term}`);
            setResults(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchParams({ q: searchTerm });
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8">Explore Components</h1>

            <form onSubmit={handleSearch} className="mb-10">
                <div className="relative">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search packages, frameworks, utilities..."
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-900/50 border border-slate-800 text-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none text-lg placeholder:text-slate-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                        Search
                    </button>
                </div>
            </form>

            {loading ? (
                <div className="text-center py-20 text-gray-500">Loading components...</div>
            ) : results.length > 0 ? (
                <div className="grid gap-4">
                    {results.map((comp) => (
                        <motion.div
                            key={comp._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card p-6 rounded-xl hover:bg-white/5 transition-all group"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <Link to={`/packages/${comp._id}`} className="text-xl font-bold text-blue-400 group-hover:text-blue-300 group-hover:underline">
                                    {comp.name}
                                </Link>
                                <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-slate-400">v{comp.currentVersion}</span>
                            </div>
                            <p className="text-slate-400 mb-4">{comp.description}</p>

                            <div className="flex items-center gap-4 text-sm text-slate-500">
                                <span className="flex items-center gap-1">
                                    <Shield size={14} /> {comp.company?.companyName || 'Verified Publisher'}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock size={14} /> Updated {new Date(comp.updatedAt).toLocaleDateString()}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-slate-900/50 rounded-xl border border-dashed border-slate-800">
                    <Package className="mx-auto text-slate-700 mb-4" size={48} />
                    <h3 className="text-lg font-medium text-white">No components found</h3>
                    <p className="text-slate-500">Try adjusting your search terms</p>
                </div>
            )}
        </div>
    );
};

export default Search;
