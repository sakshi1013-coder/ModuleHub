import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import EmployeeSidebar from '../../components/EmployeeSidebar';
import api from '../../services/api';
import { Bell, Check } from 'lucide-react';
import useSocket from '../../hooks/useSocket';

const EmployeeNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const socket = useSocket();

    const fetchNotifications = async () => {
        try {
            const res = await api.get('/notifications');
            setNotifications(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    // Listen for real-time notifications
    useEffect(() => {
        if (!socket) return;

        const handleNotification = (data) => {
            // Prepend new notification to list
            const newNotif = {
                _id: Date.now().toString(), // Temp ID until refresh
                title: data.title,
                message: data.message,
                createdAt: new Date(),
                read: false,
                ...data
            };
            setNotifications(prev => [newNotif, ...prev]);
        };

        socket.on('notification', handleNotification);

        return () => {
            socket.off('notification', handleNotification);
        };
    }, [socket]);

    const handleMarkRead = async () => {
        try {
            await api.put('/notifications/read');
            // Optimistic update
            setNotifications(notifications.map(n => ({ ...n, read: true })));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <DashboardLayout Sidebar={EmployeeSidebar}>
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Notifications</h1>
                    <p className="text-slate-400">Stay updated with latest releases.</p>
                </div>
                <button onClick={handleMarkRead} className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-2">
                    <Check size={16} /> Mark all read
                </button>
            </div>

            <div className="glass-card rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-slate-500">Loading notifications...</div>
                ) : notifications.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">No new notifications.</div>
                ) : (
                    <div className="divide-y divide-slate-800">
                        {notifications.map(notif => (
                            <div key={notif._id} className={`p-4 flex items-start gap-4 hover:bg-slate-800/30 transition-colors ${!notif.read ? 'bg-blue-500/5' : ''}`}>
                                <div className={`p-2 rounded-full mt-1 ${!notif.read ? 'text-blue-400 bg-blue-500/10' : 'text-slate-500 bg-slate-800'}`}>
                                    <Bell size={18} />
                                </div>
                                <div>
                                    <h4 className={`text-sm ${!notif.read ? 'font-bold text-white' : 'font-medium text-slate-300'}`}>
                                        {notif.title}
                                    </h4>
                                    <p className="text-sm text-slate-400 mt-1">{notif.message}</p>
                                    <span className="text-xs text-slate-600 mt-2 block">
                                        {new Date(notif.createdAt).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default EmployeeNotifications;
