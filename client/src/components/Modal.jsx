import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000
            }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '0.5rem',
                        width: '100%',
                        maxWidth: '500px',
                        padding: '1.5rem',
                        position: 'relative',
                        margin: '1rem'
                    }}
                >
                    <div className="flex justify-between items-center mb-4">
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--citi-blue)' }}>{title}</h3>
                        <button onClick={onClose} style={{ color: '#666' }}><X size={24} /></button>
                    </div>
                    {children}
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default Modal;
