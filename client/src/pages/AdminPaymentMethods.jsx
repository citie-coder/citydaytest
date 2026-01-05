import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Plus, CreditCard, Bitcoin } from 'lucide-react';
import Modal from '../components/Modal';

const AdminPaymentMethods = () => {
    const [methods, setMethods] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newMethod, setNewMethod] = useState({
        type: 'crypto', // or 'bank'
        name: '',
        details: {}
    });

    const token = localStorage.getItem('token');

    const fetchMethods = async () => {
        try {
            const res = await axios.get('https://cityday-api.onrender.com/api/admin/payment-methods', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMethods(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchMethods();
    }, [token]);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this method?')) return;
        try {
            await axios.delete(`https://cityday-api.onrender.com/api/admin/payment-methods/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchMethods();
        } catch (err) {
            alert('Failed to delete method');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://cityday-api.onrender.com/api/admin/payment-methods', newMethod, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setIsModalOpen(false);
            setNewMethod({ type: 'crypto', name: '', details: {} });
            fetchMethods();
        } catch (err) {
            alert('Failed to add method');
        }
    };

    const handleDetailChange = (key, value) => {
        setNewMethod(prev => ({
            ...prev,
            details: { ...prev.details, [key]: value }
        }));
    };

    return (
        <div className="container" style={{ padding: '2rem 0' }}>
            <div className="flex justify-between items-center mb-4">
                <h1 style={{ fontSize: '2rem', color: 'var(--citi-blue)' }}>Payment Methods</h1>
                <button onClick={() => setIsModalOpen(true)} className="btn btn-primary flex items-center gap-2">
                    <Plus size={18} /> Add Method
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {methods.map(method => (
                    <div key={method._id} className="card relative">
                        <button
                            onClick={() => handleDelete(method._id)}
                            className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                        >
                            <Trash2 size={18} />
                        </button>
                        <div className="flex items-center gap-3 mb-3">
                            {method.type === 'crypto' ? <Bitcoin size={24} color="#f7931a" /> : <CreditCard size={24} color="#004c97" />}
                            <h3 className="text-xl font-bold">{method.name}</h3>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                            {Object.entries(method.details).map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                    <span className="capitalize font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                                    <span className="font-mono">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Payment Method">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="input-label">Type</label>
                        <select
                            className="input-field"
                            value={newMethod.type}
                            onChange={e => setNewMethod({ ...newMethod, type: e.target.value, details: {} })}
                        >
                            <option value="crypto">Crypto Wallet</option>
                            <option value="bank">Bank Account</option>
                        </select>
                    </div>
                    <div>
                        <label className="input-label">Display Name</label>
                        <input
                            className="input-field"
                            value={newMethod.name}
                            onChange={e => setNewMethod({ ...newMethod, name: e.target.value })}
                            placeholder={newMethod.type === 'crypto' ? 'e.g. Bitcoin (BTC)' : 'e.g. Chase Bank'}
                            required
                        />
                    </div>

                    {newMethod.type === 'crypto' ? (
                        <>
                            <div>
                                <label className="input-label">Wallet Address</label>
                                <input
                                    className="input-field"
                                    onChange={e => handleDetailChange('walletAddress', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="input-label">Network</label>
                                <input
                                    className="input-field"
                                    onChange={e => handleDetailChange('network', e.target.value)}
                                    placeholder="e.g. BTC, ERC20, TRC20"
                                    required
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <label className="input-label">Bank Name</label>
                                <input
                                    className="input-field"
                                    onChange={e => handleDetailChange('bankName', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="input-label">Account Name</label>
                                <input
                                    className="input-field"
                                    onChange={e => handleDetailChange('accountName', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="input-label">Account Number</label>
                                <input
                                    className="input-field"
                                    onChange={e => handleDetailChange('accountNumber', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="input-label">Routing / Swift</label>
                                <input
                                    className="input-field"
                                    onChange={e => handleDetailChange('routingNumber', e.target.value)}
                                    required
                                />
                            </div>
                        </>
                    )}

                    <button type="submit" className="btn btn-primary w-full">Add Method</button>
                </form>
            </Modal>
        </div>
    );
};

export default AdminPaymentMethods;
