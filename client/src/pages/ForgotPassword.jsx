import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const res = await axios.post('https://cityday-api.onrender.com/api/auth/forgot-password', { email });
            setMessage(res.data.message);
            setSuccess(true);
        } catch (err) {
            setMessage(err.response?.data?.error || 'An error occurred. Please try again.');
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* Back to Login */}
                <Link to="/login" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 font-medium transition-colors">
                    <ArrowLeft size={20} />
                    Back to Login
                </Link>

                {/* Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-slate-200/60 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-10 text-center">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Mail size={32} className="text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">Forgot Password?</h1>
                        <p className="text-blue-100">No worries, we'll send you reset instructions</p>
                    </div>

                    <div className="px-8 py-10">
                        {success ? (
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle size={32} className="text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">Check your email</h3>
                                <p className="text-slate-600 mb-6">{message}</p>
                                <p className="text-sm text-slate-500 mb-6">
                                    Didn't receive the email? Check your spam folder or{' '}
                                    <button
                                        onClick={() => {
                                            setSuccess(false);
                                            setMessage('');
                                        }}
                                        className="text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        try again
                                    </button>
                                </p>
                                <Link
                                    to="/login"
                                    className="inline-block w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-md"
                                >
                                    Back to Login
                                </Link>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        required
                                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>

                                {message && !success && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                                        {message}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl transition-colors shadow-md disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Sending...' : 'Send Reset Link'}
                                </button>

                                <p className="text-center text-sm text-slate-600">
                                    Remember your password?{' '}
                                    <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                                        Sign in
                                    </Link>
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
