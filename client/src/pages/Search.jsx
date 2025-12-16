import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../services/api';
import { Search as SearchIcon, Package, Shield, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { searchItems } from '../utils/searchAlgorithm';

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [searchTerm, setSearchTerm] = useState(query);
    const [allPackages, setAllPackages] = useState([]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch all packages once
    useEffect(() => {
        const fetchAllPackages = async () => {
            setLoading(true);
            try {
                const res = await api.get('/packages');
                setAllPackages(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAllPackages();
    }, []);

    // Sync searchTerm with URL query
    useEffect(() => {
        setSearchTerm(query);
    }, [query]);

    // Apply search algorithm when query or packages change
    useEffect(() => {
        if (allPackages.length > 0) {
            const filtered = searchItems(allPackages, query);
            setResults(filtered);
        }
    }, [query, allPackages]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchParams({ q: searchTerm });
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-midnight mb-8">Explore Components</h1>

            <form onSubmit={handleSearch} className="mb-10">
                <div className="relative">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-midnight/50" />
                    <input
                        type="text"
                        placeholder="Search packages, frameworks, utilities..."
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border border-celeste text-midnight shadow-sm focus:ring-2 focus:ring-midnight outline-none text-lg placeholder:text-midnight/40"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-midnight text-white px-6 py-2 rounded-lg font-medium hover:bg-midnight-600 transition-colors">
                        Search
                    </button>
                </div>
            </form>

            {loading ? (
                <div className="text-center py-20 text-midnight/60">Loading components...</div>
            ) : results.length > 0 ? (
                <div className="grid gap-4">
                    {results.map((comp) => (
                        <motion.div
                            key={comp._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card p-6 rounded-xl hover:bg-white transition-all group"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <Link to={`/packages/${comp._id}`} className="text-xl font-bold text-midnight group-hover:text-midnight-600 group-hover:underline">
                                    {comp.name}
                                </Link>
                                <span className="text-xs font-mono bg-celeste/30 px-2 py-1 rounded text-midnight border border-celeste">v{comp.currentVersion}</span>
                            </div>
                            <p className="text-midnight/70 mb-4">{comp.description}</p>

                            <div className="flex items-center gap-4 text-sm text-midnight/60">
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
                <div className="text-center py-20 bg-white/50 rounded-xl border border-dashed border-celeste">
                    <Package className="mx-auto text-midnight/40 mb-4" size={48} />
                    <h3 className="text-lg font-medium text-midnight">No components found</h3>
                    <p className="text-midnight/60">Try adjusting your search terms</p>
                </div>
            )}
        </div>
    );
};

export default Search;
