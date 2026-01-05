import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [step, setStep] = useState(1); // 1: Credentials, 2: OTP
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [userId, setUserId] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post('https://cityday-api.onrender.com/api/auth/login', { email, password });
            setUserId(res.data.userId);
            setStep(2);
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post('https://cityday-api.onrender.com/api/auth/verify-otp', { userId, otp });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));

            if (res.data.user.isAdmin) {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Invalid OTP');
        }
    };

    return (
        <div className="container" style={{ padding: '4rem 0', maxWidth: '500px' }}>
            <div className="card">
                <h2 className="text-center" style={{ marginBottom: '2rem', color: 'var(--citi-blue)' }}>
                    {step === 1 ? 'Sign On' : 'Verify Identity'}
                </h2>

                {error && <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: '0.375rem', marginBottom: '1rem' }}>{error}</div>}

                {step === 1 ? (
                    <form onSubmit={handleLogin}>
                        <div className="input-group">
                            <label className="input-label">Email Address</label>
                            <input
                                type="email"
                                className="input-field"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Password</label>
                            <input
                                type="password"
                                className="input-field"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex justify-end mb-4">
                            <Link to="/forgot-password" style={{ color: 'var(--citi-light-blue)', fontSize: '0.9rem' }}>Forgot password?</Link>
                        </div>
                        <button type="submit" className="btn btn-primary w-full">Next</button>
                        <div className="mt-4 text-center">
                            <Link to="/register" style={{ color: 'var(--citi-light-blue)' }}>Need an account? Register now</Link>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp}>
                        <p className="mb-4 text-center" style={{ color: '#666' }}>
                            We've sent a One-Time Password to your email.
                        </p>
                        <div className="input-group">
                            <label className="input-label">Enter OTP</label>
                            <input
                                type="text"
                                className="input-field text-center"
                                style={{ letterSpacing: '0.5rem', fontSize: '1.5rem' }}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                maxLength={6}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-full">Verify & Sign On</button>
                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="btn w-full mt-4"
                            style={{ color: '#666' }}
                        >
                            Back to Login
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Login;
