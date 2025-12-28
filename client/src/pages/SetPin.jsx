import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, CheckCircle, AlertCircle } from 'lucide-react';

const SetPin = () => {
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
            setError('PIN must be exactly 4 digits');
            return;
        }

        if (pin !== confirmPin) {
            setError('PINs do not match');
            return;
        }

        setLoading(true);
        try {
            await axios.post('/api/user/set-withdrawal-pin', { pin }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Success - redirect to dashboard
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to set PIN');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <Shield className="h-8 w-8 text-blue-600" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900">Set Withdrawal PIN</h2>
                    <p className="mt-2 text-sm text-slate-600">
                        To ensure the security of your funds, please set a 4-digit withdrawal PIN. You will need this PIN for all future withdrawals.
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                        <AlertCircle className="text-red-600 mt-0.5 flex-shrink-0" size={18} />
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="pin" className="block text-sm font-medium text-slate-700 mb-1">
                                4-Digit PIN
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    id="pin"
                                    name="pin"
                                    type="password"
                                    inputMode="numeric"
                                    autoComplete="off"
                                    required
                                    className="appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm tracking-widest"
                                    placeholder="••••"
                                    value={pin}
                                    onChange={(e) => setPin(e.target.value)}
                                    maxLength="4"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPin" className="block text-sm font-medium text-slate-700 mb-1">
                                Confirm PIN
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <CheckCircle className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    id="confirmPin"
                                    name="confirmPin"
                                    type="password"
                                    inputMode="numeric"
                                    autoComplete="off"
                                    required
                                    className="appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm tracking-widest"
                                    placeholder="••••"
                                    value={confirmPin}
                                    onChange={(e) => setConfirmPin(e.target.value)}
                                    maxLength="4"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? 'Setting PIN...' : 'Set Secure PIN'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SetPin;
