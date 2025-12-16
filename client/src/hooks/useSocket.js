import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '../context/AuthContext';
import { toast } from '../components/NotificationToast'; // Assuming we can use toast for alerts

const useSocket = () => {
    const { user } = useAuth();
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (user && user.company && !socket) {
            // Initialize Socket
            // In production, connect to the same origin (relative) but Socket.IO needs absolute usually or logic to fallback
            const socketUrl = import.meta.env.PROD ? window.location.origin : 'http://localhost:5001';
            const newSocket = io(socketUrl);

            // Join Company Room
            const companyId = user.company._id || user.company;
            console.log('socket: joining company room:', companyId);
            newSocket.emit('join_company', companyId);

            // Join User Room (for personal notifications like subscriptions)
            console.log('socket: joining user room:', user._id);
            newSocket.emit('join_user', user._id);

            // Listen for Notifications
            newSocket.on('notification', (data) => {
                // Show Toast
                toast.info(data.title, {
                    description: data.message,
                    autoClose: 3000, // Closes quicker
                    // Prevent duplicates if possible by ID? Toast usually handles dedup if toastId provided
                    toastId: data.relatedPackage || data.title // Basic dedup attempt
                });

                // Play notification sound (optional)
                // const audio = new Audio('/notification.mp3');
                // audio.play().catch(e => console.log(e));
            });

            setSocket(newSocket);

            return () => {
                newSocket.off('notification');
                newSocket.disconnect();
            };
        }
    }, [user, socket]); // Added socket to dependencies to prevent re-initialization loop

    return socket;
};

export default useSocket;
