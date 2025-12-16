import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import EmployeeSidebar from '../../components/EmployeeSidebar';
import api from '../../services/api';
import { Search, Package, ArrowRight, Clock, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { searchItems } from '../../utils/searchAlgorithm';
import { useAuth } from '../../context/AuthContext';

const ExplorePackages = () => {
    const { user } = useAuth();
    const [query, setQuery] = useState('');
    const [allPackages, setAllPackages] = useState([]);
    const [subscribedIds, setSubscribedIds] = useState([]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch all packages and subscriptions
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [packagesRes, subscriptionsRes] = await Promise.all([
                    api.get('/packages'),
                    api.get('/packages/subscribed')
                ]);
                setAllPackages(packagesRes.data);
                setSubscribedIds(subscriptionsRes.data.map(pkg => pkg._id));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Apply search algorithm when query or packages change
    useEffect(() => {
        if (allPackages.length > 0) {
            const filtered = searchItems(allPackages, query);
            setResults(filtered);
        }
    }, [query, allPackages]);

    const isSubscribed = (packageId) => {
        return subscribedIds.includes(packageId);
    };

    return (
        <DashboardLayout Sidebar={EmployeeSidebar}>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-midnight mb-2">Explore Packages</h1>
                <p className="text-midnight/70">Search for components and libraries across the registry.</p>
            </div>

            {/* Search Bar */}
            <div className="mb-8">
                <div className="relative max-w-2xl">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-midnight/50" size={20} />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search packages by name, description..."
                        className="w-full bg-white border border-celeste rounded-xl pl-12 pr-4 py-4 text-midnight placeholder-midnight/40 focus:ring-2 focus:ring-midnight focus:border-transparent outline-none shadow-lg"
                    />
                </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full text-center text-midnight/60 py-12">Loading packages...</div>
                ) : results.length === 0 ? (
                    <div className="col-span-full text-center text-midnight/60 py-12">No packages found.</div>
                ) : (
                    results.map(pkg => {
                        const subscribed = isSubscribed(pkg._id);
                        return (
                            <div key={pkg._id} className="glass-card p-6 rounded-xl border border-celeste bg-white hover:bg-celeste/10 transition-all group hover:-translate-y-1 relative">
                                {/* Subscription Badge */}
                                {subscribed && (
                                    <div className="absolute top-4 right-4 bg-herb/20 text-herb px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                        <Heart size={12} className="fill-herb" />
                                        Subscribed
                                    </div>
                                )}
                                
                                <div className="flex justify-between items-start mb-4">
                                    <div className="bg-celeste/30 p-3 rounded-lg text-midnight group-hover:bg-midnight group-hover:text-white transition-colors">
                                        <Package size={24} />
                                    </div>
                                    {pkg.company && (
                                        <span className="text-xs font-mono text-midnight/60 bg-celeste/30 px-2 py-1 rounded border border-celeste">
                                            {pkg.company.companyName}
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-xl font-bold text-midnight mb-2 group-hover:text-midnight-600 transition-colors pr-16">{pkg.name}</h3>
                                <p className="text-midnight/70 text-sm mb-4 line-clamp-2 h-10">{pkg.description}</p>

                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-celeste">
                                    <span className="text-xs text-midnight/60 flex items-center gap-1">
                                        <Clock size={12} /> v{pkg.currentVersion}
                                    </span>
                                    <Link to={`/packages/${pkg._id}`} className="text-sm font-medium text-midnight flex items-center gap-1 hover:gap-2 transition-all">
                                        View <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </DashboardLayout>
    );
};

export default ExplorePackages;
