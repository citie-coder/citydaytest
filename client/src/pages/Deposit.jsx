import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Copy, CheckCircle, CreditCard, Bitcoin, ArrowLeft, Shield, Info, Upload, X, Image } from 'lucide-react';

const Deposit = () => {
    const [methods, setMethods] = useState([]);
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [amount, setAmount] = useState('');
    const [reference, setReference] = useState('');
    const [screenshot, setScreenshot] = useState(null);
    const [screenshotPreview, setScreenshotPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchMethods = async () => {
            try {
                const res = await axios.get('https://cityday-api.onrender.com/api/user/payment-methods', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMethods(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchMethods();
    }, [token]);

    const handleScreenshotChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('File size must be less than 5MB');
                return;
            }

            // Validate file type
            if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
                alert('Only PNG, JPG, and JPEG files are allowed');
                return;
            }

            // Convert to base64
            const reader = new FileReader();
            reader.onloadend = () => {
                setScreenshot(reader.result);
                setScreenshotPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeScreenshot = () => {
        setScreenshot(null);
        setScreenshotPreview(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('https://cityday-api.onrender.com/api/user/deposit', {
                amount: Number(amount),
                methodId: selectedMethod._id,
                depositDetails: { reference },
                screenshot: screenshot
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Deposit received! A confirmation email has been sent. Your transaction is now pending admin approval.');
            navigate('/dashboard');
        } catch (err) {
            alert(err.response?.data?.error || 'Deposit failed');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        // Could add a toast notification here
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center text-slate-600 hover:text-slate-900 mb-6 transition-colors font-medium"
                >
                    <ArrowLeft size={18} className="mr-2" />
                    Back to Dashboard
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Method Selection */}
                    <div className="lg:col-span-1 space-y-5">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6">
                            <h1 className="text-2xl font-bold text-slate-900 mb-2">Deposit Funds</h1>
                            <p className="text-slate-600 text-sm">Select a payment method to add funds to your account.</p>
                        </div>

                        <div className="space-y-3">
                            {methods.map(method => (
                                <div
                                    key={method._id}
                                    onClick={() => setSelectedMethod(method)}
                                    className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedMethod?._id === method._id
                                        ? 'border-blue-600 bg-blue-50 shadow-md'
                                        : 'border-slate-200 bg-white hover:border-slate-300 shadow-sm hover:shadow-md'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2.5 rounded-xl ${selectedMethod?._id === method._id ? 'bg-blue-100' : 'bg-slate-100'}`}>
                                            {method.type === 'crypto' ? <Bitcoin size={20} className="text-orange-500" /> : <CreditCard size={20} className="text-blue-600" />}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-slate-900 text-sm">{method.name}</h3>
                                            <p className="text-xs text-slate-500 capitalize mt-0.5">{method.type} Transfer</p>
                                        </div>
                                    </div>
                                    {selectedMethod?._id === method._id && (
                                        <div className="absolute top-3 right-3 text-blue-600">
                                            <CheckCircle size={18} />
                                        </div>
                                    )}
                                </div>
                            ))}
                            {methods.length === 0 && (
                                <div className="p-6 bg-white rounded-xl border border-dashed border-slate-300 text-center text-slate-500">
                                    <p className="text-sm">No payment methods available at this time.</p>
                                </div>
                            )}
                        </div>

                        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3 text-sm text-blue-800">
                            <Shield className="flex-shrink-0 mt-0.5" size={18} />
                            <p>All deposits are secure and monitored. Processing times may vary by method.</p>
                        </div>
                    </div>

                    {/* Right Column: Details & Form */}
                    <div className="lg:col-span-2">
                        {selectedMethod ? (
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
                                <div className="px-6 py-5 border-b border-slate-200/60 bg-gradient-to-r from-slate-50 to-white">
                                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                        {selectedMethod.name} Details
                                    </h2>
                                </div>

                                <div className="p-6 space-y-6">
                                    {/* Payment Details Box */}
                                    <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-4">
                                        <div className="flex items-start gap-2 mb-2">
                                            <Info size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                                            <p className="text-sm text-slate-600">Please send the exact amount to the following details:</p>
                                        </div>

                                        <div className="grid gap-3">
                                            {Object.entries(selectedMethod.details).map(([key, value]) => (
                                                <div key={key} className="bg-white p-3 rounded-lg border border-slate-200 flex flex-col">
                                                    <span className="text-xs text-slate-500 uppercase font-semibold tracking-wider mb-1.5">
                                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                                    </span>
                                                    <div className="flex items-center justify-between gap-2">
                                                        <span className="font-mono text-sm font-medium text-slate-900 break-all">{value}</span>
                                                        <button
                                                            onClick={() => copyToClipboard(value)}
                                                            className="text-slate-400 hover:text-blue-600 p-1 transition-colors flex-shrink-0"
                                                            title="Copy to clipboard"
                                                        >
                                                            <Copy size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Deposit Form */}
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Amount to Deposit</label>
                                            <div className="relative rounded-lg shadow-sm">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <span className="text-slate-500 text-base font-medium">$</span>
                                                </div>
                                                <input
                                                    type="number"
                                                    className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pl-9 pr-16 text-base border-slate-300 rounded-lg py-3 font-medium"
                                                    placeholder="0.00"
                                                    value={amount}
                                                    onChange={e => setAmount(e.target.value)}
                                                    required
                                                    min="0.01"
                                                    step="0.01"
                                                />
                                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                                    <span className="text-slate-500 text-sm font-medium">USD</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Transaction Reference / Note</label>
                                            <input
                                                type="text"
                                                className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full text-sm border-slate-300 rounded-lg py-3 px-4"
                                                placeholder="e.g. Transaction Hash, Sender Name, Invoice #"
                                                value={reference}
                                                onChange={e => setReference(e.target.value)}
                                            />
                                            <p className="mt-1.5 text-xs text-slate-500">Optional but recommended for faster processing.</p>
                                        </div>

                                        {/* Screenshot Upload */}
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                Payment Screenshot <span className="text-slate-400 font-normal">(Optional)</span>
                                            </label>

                                            {!screenshotPreview ? (
                                                <div className="relative">
                                                    <input
                                                        type="file"
                                                        accept="image/png,image/jpeg,image/jpg"
                                                        onChange={handleScreenshotChange}
                                                        className="hidden"
                                                        id="screenshot-upload"
                                                    />
                                                    <label
                                                        htmlFor="screenshot-upload"
                                                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors"
                                                    >
                                                        <Upload className="text-slate-400 mb-2" size={24} />
                                                        <p className="text-sm text-slate-600 font-medium">Click to upload screenshot</p>
                                                        <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</p>
                                                    </label>
                                                </div>
                                            ) : (
                                                <div className="relative rounded-lg border-2 border-slate-200 overflow-hidden">
                                                    <img src={screenshotPreview} alt="Payment screenshot" className="w-full h-48 object-contain bg-slate-50" />
                                                    <button
                                                        type="button"
                                                        onClick={removeScreenshot}
                                                        className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                    <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                                                        <Image size={12} />
                                                        Screenshot attached
                                                    </div>
                                                </div>
                                            )}
                                            <p className="mt-1.5 text-xs text-slate-500">Upload proof of payment to speed up approval process.</p>
                                        </div>

                                        <div className="pt-2">
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-md text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg transform hover:-translate-y-0.5'
                                                    }`}
                                            >
                                                {loading ? 'Processing Request...' : 'I Have Made The Payment'}
                                            </button>
                                            <p className="text-center text-xs text-slate-400 mt-3">
                                                By clicking above, you confirm that you have transferred the funds to the details provided.
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full min-h-[500px] bg-white rounded-2xl shadow-sm border border-slate-200/60 flex flex-col items-center justify-center text-center p-8">
                                <div className="bg-slate-50 p-6 rounded-full mb-5">
                                    <CreditCard size={40} className="text-slate-300" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Select a Payment Method</h3>
                                <p className="text-slate-500 max-w-sm text-sm">
                                    Choose a payment method from the left to view deposit details and proceed with your transaction.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Deposit;
