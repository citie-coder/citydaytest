import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('https://cityday-api.onrender.com/api/auth/register', {
                firstName,
                lastName,
                email,
                phone,
                address,
                password
            });
            setSuccessMessage(`Registration successful! Your account number is: ${response.data.accountNumber}`);
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed');
        }
    };

    return (
        <div className="container" style={{ padding: '4rem 0', maxWidth: '500px' }}>
            <div className="card">
                <h2 className="text-center" style={{ marginBottom: '2rem', color: 'var(--citi-blue)' }}>Open an Account</h2>

                {error && <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: '0.375rem', marginBottom: '1rem' }}>{error}</div>}
                {successMessage && <div style={{ backgroundColor: '#d1fae5', color: '#065f46', padding: '0.75rem', borderRadius: '0.375rem', marginBottom: '1rem' }}>{successMessage}</div>}

                <form onSubmit={handleRegister}>
                    <div className="input-group">
                        <label className="input-label">First Name</label>
                        <input
                            type="text"
                            className="input-field"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Last Name</label>
                        <input
                            type="text"
                            className="input-field"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
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
                        <label className="input-label">Phone Number</label>
                        <input
                            type="tel"
                            className="input-field"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="e.g., +1234567890"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Address</label>
                        <input
                            type="text"
                            className="input-field"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="e.g., 123 Main St, City, State, ZIP"
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
                    <div className="input-group">
                        <label className="input-label">Confirm Password</label>
                        <input
                            type="password"
                            className="input-field"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full">Register</button>
                    <div className="mt-4 text-center">
                        <Link to="/login" style={{ color: 'var(--citi-light-blue)' }}>Already have an account? Sign On</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
