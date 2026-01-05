import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const PinGuard = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const checkPin = async () => {
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const res = await axios.get('http://api.cityday2.avaxverse.com/api/user/dashboard', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                // If user has no PIN and is not already on the set-pin page, redirect
                if (!res.data.user.hasWithdrawalPin && location.pathname !== '/set-pin') {
                    navigate('/set-pin');
                }
            } catch (err) {
                console.error('PinGuard check failed:', err);
                // If auth fails, likely token expired, let normal auth guards handle it or redirect to login
                if (err.response?.status === 401) {
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        checkPin();
    }, [token, navigate, location.pathname]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return children;
};

export default PinGuard;
