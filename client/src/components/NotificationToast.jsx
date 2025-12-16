import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// Simple Event Bus for Toasts
const toastBus = {
    emit: (event, data) => {
        const customEvent = new CustomEvent(event, { detail: data });
        window.dispatchEvent(customEvent);
    },
    on: (event, callback) => {
        window.addEventListener(event, (e) => callback(e.detail));
    },
    off: (event, callback) => {
        window.removeEventListener(event, callback);
    }
};

export const toast = {
    success: (msg) => toastBus.emit('add-toast', { type: 'success', msg }),
    error: (msg) => toastBus.emit('add-toast', { type: 'error', msg }),
    info: (msg) => toastBus.emit('add-toast', { type: 'info', msg }),
};

export const ToastContainer = () => {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        const handleAdd = (toast) => {
            const id = Date.now();
            setToasts((prev) => [...prev, { ...toast, id }]);
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id));
            }, 5000);
        };

        toastBus.on('add-toast', handleAdd);
        return () => window.removeEventListener('add-toast', handleAdd);
    }, []);

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return createPortal(
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
            <AnimatePresence>
                {toasts.map((t) => (
                    <motion.div
                        key={t.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white ${t.type === 'success' ? 'bg-green-600' :
                                t.type === 'error' ? 'bg-red-600' : 'bg-blue-600'
                            }`}
                    >
                        {t.type === 'success' && <CheckCircle size={20} />}
                        {t.type === 'error' && <AlertCircle size={20} />}
                        {t.type === 'info' && <Info size={20} />}
                        <span className="font-medium">{t.msg}</span>
                        <button onClick={() => removeToast(t.id)} className="ml-2 hover:bg-white/20 p-1 rounded">
                            <X size={16} />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>,
        document.body
    );
};
