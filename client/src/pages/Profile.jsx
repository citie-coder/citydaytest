import { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Lock, Save, ArrowLeft, Edit2, Check, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isPinModalOpen, setIsPinModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: ''
    });
    const [pinData, setPinData] = useState({
        currentPin: '',
        newPin: '',
        confirmPin: ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });
    const [pinMessage, setPinMessage] = useState({ type: '', text: '' });
    const [saveLoading, setSaveLoading] = useState(false);

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const res = await axios.get('/api/user/dashboard', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(res.data.user);
            setFormData({
                firstName: res.data.user.firstName || '',
                lastName: res.data.user.lastName || '',
                email: res.data.user.email || '',
                phone: res.data.user.phone || '',
                address: res.data.user.address || ''
            });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setSaveLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const res = await axios.put('/api/user/profile', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(res.data.user);
            setIsEditing(false);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.error || 'Failed to update profile' });
        } finally {
            setSaveLoading(false);
        }
    };

    const handleCancelEdit = () => {
        setFormData({
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            email: user.email || '',
            phone: user.phone || '',
            address: user.address || ''
        });
        setIsEditing(false);
        setMessage({ type: '', text: '' });
    };

    const handleSetPin = async (e) => {
        e.preventDefault();
        setPinMessage({ type: '', text: '' });

        if (pinData.newPin !== pinData.confirmPin) {
            setPinMessage({ type: 'error', text: 'PINs do not match' });
            return;
        }

        if (!/^\d{4}$/.test(pinData.newPin)) {
            setPinMessage({ type: 'error', text: 'PIN must be exactly 4 digits' });
            return;
        }

        setSaveLoading(true);

        try {
            await axios.post('/api/user/set-withdrawal-pin', {
                pin: pinData.newPin,
                currentPin: pinData.currentPin || undefined
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setPinMessage({ type: 'success', text: 'Withdrawal PIN set successfully!' });
            setPinData({ currentPin: '', newPin: '', confirmPin: '' });
            setTimeout(() => {
                setIsPinModalOpen(false);
                setPinMessage({ type: '', text: '' });
            }, 2000);
            fetchUserData();
        } catch (err) {
            setPinMessage({ type: 'error', text: err.response?.data?.error || 'Failed to set PIN' });
        } finally {
            setSaveLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-3">
                    <div className="animate-spin rounded-full h-10 w-10 border-3 border-slate-200 border-t-blue-600"></div>
                    <p className="text-slate-600 font-medium text-sm">Loading...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <p className="text-slate-600">Please log in to view your profile.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/dashboard" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
                            <ArrowLeft size={20} />
                            <span className="font-medium">Back to Dashboard</span>
                        </Link>
                        <h1 className="text-lg font-bold text-slate-900">My Profile</h1>
                        <div className="w-24"></div>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Messages */}
                {message.text && (
                    <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                        {message.text}
                    </div>
                )}

                {/* Profile Card */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-6">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold">
                                {user.firstName?.[0]}{user.lastName?.[0]}
                            </div>
                            <div className="text-white">
                                <h2 className="text-2xl font-bold">{user.firstName} {user.lastName}</h2>
                                <p className="text-blue-100">{user.email}</p>
                                <p className="text-blue-100 text-sm font-mono mt-1">{user.accountNumber}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-slate-900">Personal Information</h3>
                            {!isEditing && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                >
                                    <Edit2 size={18} />
                                    Edit Profile
                                </button>
                            )}
                        </div>

                        <form onSubmit={handleSaveProfile}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="input-group">
                                    <label className="input-label">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        className="input-field"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        className="input-field"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="input-field"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        className="input-field"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        required
                                    />
                                </div>
                                <div className="input-group md:col-span-2">
                                    <label className="input-label">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        className="input-field"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        required
                                    />
                                </div>
                            </div>

                            {isEditing && (
                                <div className="flex gap-3 mt-6">
                                    <button
                                        type="submit"
                                        disabled={saveLoading}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50"
                                    >
                                        <Check size={18} />
                                        {saveLoading ? 'Saving...' : 'Save Changes'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCancelEdit}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-semibold"
                                    >
                                        <X size={18} />
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>

                {/* Security Section */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Security Settings</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Lock className="text-blue-600" size={20} />
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-900">Withdrawal PIN</p>
                                    <p className="text-sm text-slate-600">
                                        {user.withdrawalPin ? 'PIN is set' : 'No PIN set'}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsPinModalOpen(true)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                {user.withdrawalPin ? 'Change PIN' : 'Set PIN'}
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* PIN Modal */}
            {isPinModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-md w-full p-6">
                        <h3 className="text-xl font-bold text-slate-900 mb-4">
                            {user.withdrawalPin ? 'Change Withdrawal PIN' : 'Set Withdrawal PIN'}
                        </h3>

                        {pinMessage.text && (
                            <div className={`mb-4 p-3 rounded-lg text-sm ${pinMessage.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                                {pinMessage.text}
                            </div>
                        )}

                        <form onSubmit={handleSetPin} className="space-y-4">
                            {user.withdrawalPin && (
                                <div className="input-group">
                                    <label className="input-label">Current PIN</label>
                                    <input
                                        type="password"
                                        className="input-field"
                                        value={pinData.currentPin}
                                        onChange={(e) => setPinData({ ...pinData, currentPin: e.target.value })}
                                        maxLength="4"
                                        pattern="\d{4}"
                                        placeholder="Enter current 4-digit PIN"
                                        required
                                    />
                                </div>
                            )}
                            <div className="input-group">
                                <label className="input-label">New PIN</label>
                                <input
                                    type="password"
                                    className="input-field"
                                    value={pinData.newPin}
                                    onChange={(e) => setPinData({ ...pinData, newPin: e.target.value })}
                                    maxLength="4"
                                    pattern="\d{4}"
                                    placeholder="Enter 4-digit PIN"
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Confirm New PIN</label>
                                <input
                                    type="password"
                                    className="input-field"
                                    value={pinData.confirmPin}
                                    onChange={(e) => setPinData({ ...pinData, confirmPin: e.target.value })}
                                    maxLength="4"
                                    pattern="\d{4}"
                                    placeholder="Re-enter 4-digit PIN"
                                    required
                                />
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    disabled={saveLoading}
                                    className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50"
                                >
                                    {saveLoading ? 'Setting...' : 'Set PIN'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsPinModalOpen(false);
                                        setPinData({ currentPin: '', newPin: '', confirmPin: '' });
                                        setPinMessage({ type: '', text: '' });
                                    }}
                                    className="flex-1 px-4 py-2.5 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-semibold"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
