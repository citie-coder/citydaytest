import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, DollarSign, AlertCircle, CheckCircle, Shield } from 'lucide-react';

const Withdraw = () => {
    const [amount, setAmount] = useState('');
    const [pin, setPin] = useState('');
    const [bankDetails, setBankDetails] = useState({
        bankName: '',
        accountName: '',
        accountNumber: '',
        bankBranch: '',
        routingNumber: '',
        swiftCode: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('http://api.cityday2.avaxverse.com/api/user/dashboard', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(res.data.user);
            } catch (err) {
                console.error(err);
                navigate('/login');
            }
        };
        fetchUser();
    }, [token, navigate]);

    const handleBankDetailsChange = (e) => {
        setBankDetails({
            ...bankDetails,
            [e.target.name]: e.target.value
        });
    };

    const handleWithdraw = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            await axios.post('http://api.cityday2.avaxverse.com/api/user/withdraw', {
                amount,
                pin: user.withdrawalPin ? pin : undefined,
                recipientBankDetails: bankDetails
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSuccess('Withdrawal request submitted successfully. Funds will be processed shortly.');
            setAmount('');
            setPin('');
            setBankDetails({
                bankName: '',
                accountName: '',
                accountNumber: '',
                bankBranch: '',
                routingNumber: '',
                swiftCode: ''
            });
            // Refresh user data to show updated balance if applicable immediately,
            // though usually withdrawals are pending first.
            const res = await axios.get('http://api.cityday2.avaxverse.com/api/user/dashboard', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(res.data.user);
        } catch (err) {
            setError(err.response?.data?.error || 'Withdrawal failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center text-slate-600 hover:text-slate-900 mb-6 transition-colors font-medium"
                >
                    <ArrowLeft size={18} className="mr-2" />
                    Back to Dashboard
                </button>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-12 -mt-12"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl border border-white/30">
                                    <DollarSign className="h-6 w-6" />
                                </div>
                                <h2 className="text-2xl font-bold">Withdraw Funds</h2>
                            </div>
                            <p className="text-blue-100 text-sm">
                                Securely transfer funds to your linked account.
                            </p>
                        </div>
                    </div>

                    <div className="p-6">
                        {/* Balance Display */}
                        <div className="mb-6 p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                            <p className="text-xs text-slate-600 font-medium mb-1.5 uppercase tracking-wider">Available Balance</p>
                            <p className="text-3xl font-bold text-blue-900">
                                ${user.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-5 p-4 bg-red-50 border border-red-200 text-red-700 flex items-start gap-3 rounded-xl">
                                <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                                <p className="text-sm">{error}</p>
                            </div>
                        )}

                        {/* Success Message */}
                        {success && (
                            <div className="mb-5 p-4 bg-green-50 border border-green-200 text-green-700 flex items-start gap-3 rounded-xl">
                                <CheckCircle size={18} className="mt-0.5 flex-shrink-0" />
                                <p className="text-sm">{success}</p>
                            </div>
                        )}

                        {/* Withdrawal Form */}
                        <form onSubmit={handleWithdraw} className="space-y-5">
                            <div>
                                <label htmlFor="amount" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Withdrawal Amount
                                </label>
                                <div className="relative rounded-lg shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <span className="text-slate-500 text-base font-medium">$</span>
                                    </div>
                                    <input
                                        type="number"
                                        name="amount"
                                        id="amount"
                                        className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pl-9 pr-16 text-base border-slate-300 rounded-lg py-3 font-medium"
                                        placeholder="0.00"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        min="1"
                                        step="0.01"
                                        required
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                        <span className="text-slate-500 text-sm font-medium">USD</span>
                                    </div>
                                </div>
                            </div>

                            {/* Bank Details Section */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                <h4 className="text-sm font-semibold text-blue-900 mb-2">Recipient Bank Details</h4>
                                <p className="text-xs text-blue-700">Enter the bank account details where you want to receive the funds</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="bankName" className="block text-sm font-semibold text-slate-700 mb-2">
                                        Bank Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="bankName"
                                        id="bankName"
                                        className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full px-4 text-base border-slate-300 rounded-lg py-3 font-medium"
                                        placeholder="e.g., Chase Bank"
                                        value={bankDetails.bankName}
                                        onChange={handleBankDetailsChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="accountName" className="block text-sm font-semibold text-slate-700 mb-2">
                                        Account Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="accountName"
                                        id="accountName"
                                        className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full px-4 text-base border-slate-300 rounded-lg py-3 font-medium"
                                        placeholder="Full name on account"
                                        value={bankDetails.accountName}
                                        onChange={handleBankDetailsChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="accountNumber" className="block text-sm font-semibold text-slate-700 mb-2">
                                        Account Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="accountNumber"
                                        id="accountNumber"
                                        className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full px-4 text-base border-slate-300 rounded-lg py-3 font-medium"
                                        placeholder="Enter account number"
                                        value={bankDetails.accountNumber}
                                        onChange={handleBankDetailsChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="bankBranch" className="block text-sm font-semibold text-slate-700 mb-2">
                                        Bank Branch
                                    </label>
                                    <input
                                        type="text"
                                        name="bankBranch"
                                        id="bankBranch"
                                        className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full px-4 text-base border-slate-300 rounded-lg py-3 font-medium"
                                        placeholder="Branch name or code"
                                        value={bankDetails.bankBranch}
                                        onChange={handleBankDetailsChange}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="routingNumber" className="block text-sm font-semibold text-slate-700 mb-2">
                                        Routing Number / Sort Code
                                    </label>
                                    <input
                                        type="text"
                                        name="routingNumber"
                                        id="routingNumber"
                                        className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full px-4 text-base border-slate-300 rounded-lg py-3 font-medium"
                                        placeholder="9-digit routing number"
                                        value={bankDetails.routingNumber}
                                        onChange={handleBankDetailsChange}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="swiftCode" className="block text-sm font-semibold text-slate-700 mb-2">
                                        SWIFT/BIC Code
                                    </label>
                                    <input
                                        type="text"
                                        name="swiftCode"
                                        id="swiftCode"
                                        className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full px-4 text-base border-slate-300 rounded-lg py-3 font-medium"
                                        placeholder="For international transfers"
                                        value={bankDetails.swiftCode}
                                        onChange={handleBankDetailsChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="pin" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Withdrawal PIN
                                </label>
                                <input
                                    type="password"
                                    name="pin"
                                    id="pin"
                                    className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full px-4 text-base border-slate-300 rounded-lg py-3 font-medium"
                                    placeholder="Enter your 4-digit PIN"
                                    value={pin}
                                    onChange={(e) => setPin(e.target.value)}
                                    maxLength="4"
                                    pattern="\d{4}"
                                    required
                                />
                                <p className="mt-1.5 text-xs text-slate-500">Enter your 4-digit withdrawal PIN for security</p>
                            </div>

                            {/* Security Notice */}
                            <div className="flex items-center gap-2.5 text-sm text-slate-600 bg-slate-50 border border-slate-200 p-3.5 rounded-lg">
                                <Shield size={16} className="text-blue-600 flex-shrink-0" />
                                <span>Your transaction is protected by 256-bit encryption.</span>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-md text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg transform hover:-translate-y-0.5'
                                    }`}
                            >
                                {loading ? 'Processing...' : 'Confirm Withdrawal'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Withdraw;
