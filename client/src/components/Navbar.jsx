import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, Shield, Search, MapPin, Globe, Menu, X, ChevronDown, ChevronRight } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [isBankingOpen, setIsBankingOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileBankingOpen, setIsMobileBankingOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <nav style={{ backgroundColor: 'var(--white)', borderBottom: '1px solid var(--gray-200)', position: 'relative', zIndex: 50 }}>
            {/* Top Bar with FDIC info and Utility Links */}
            <div className="container" style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link to="/" className="flex items-center gap-1">
                            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--citi-blue)', display: 'flex', alignItems: 'center', lineHeight: 1 }}>
                                Cityday<span style={{ color: 'var(--citi-red)', fontSize: '3rem', lineHeight: '0', marginLeft: '-2px', marginTop: '-10px' }}>&#8250;</span>
                            </div>
                        </Link>
                        <div className="desktop-only" style={{ fontSize: '0.7rem', color: '#666', lineHeight: '1.2' }}>
                            <span style={{ fontWeight: 'bold', color: '#333' }}>FDIC</span> FDIC-Insured – Backed by the full faith and credit of the U.S. Government<br />
                            Modern Bank, N.A.
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="desktop-only flex items-center gap-6" style={{ fontSize: '0.75rem', color: '#333' }}>
                            <div className="flex flex-col items-center cursor-pointer">
                                <MapPin size={20} strokeWidth={1.5} />
                                <span>ATM / BRANCH</span>
                            </div>
                            <div className="flex flex-col items-center cursor-pointer">
                                <Globe size={20} strokeWidth={1.5} />
                                <span>ESPAÑOL</span>
                            </div>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button className="mobile-only" onClick={toggleMobileMenu} style={{ background: 'none', border: 'none', color: 'var(--citi-blue)' }}>
                            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Navigation - Desktop */}
            <div className="desktop-only" style={{ backgroundColor: '#f0f2f5', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb' }}>
                <div className="container flex items-center justify-between" style={{ height: '50px' }}>
                    <div className="flex items-center h-full">
                        <Link to="/credit-cards" className="nav-link">Credit Cards</Link>

                        <div
                            className="nav-item-dropdown h-full flex items-center"
                            onMouseEnter={() => setIsBankingOpen(true)}
                            onMouseLeave={() => setIsBankingOpen(false)}
                            style={{ position: 'relative' }}
                        >
                            <button
                                className={`nav-link h-full ${isBankingOpen ? 'active' : ''}`}
                                style={{
                                    background: isBankingOpen ? '#4b5563' : 'transparent',
                                    color: isBankingOpen ? 'white' : 'var(--citi-blue)',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    padding: '0 1rem',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                Banking
                            </button>

                            {isBankingOpen && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '100%',
                                        left: '-100px', /* Adjust to center or align better */
                                        backgroundColor: 'white',
                                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                                        padding: '2rem',
                                        zIndex: 1000,
                                        minWidth: '600px',
                                        display: 'flex',
                                        gap: '3rem',
                                        borderTop: '4px solid var(--citi-blue)',
                                        borderRadius: '0 0 4px 4px'
                                    }}
                                >
                                    {/* Invisible bridge to prevent closing when moving mouse diagonally */}
                                    <div style={{ position: 'absolute', top: '-20px', left: 0, width: '100%', height: '20px', background: 'transparent' }}></div>

                                    <div className="flex flex-col gap-4" style={{ flex: 1 }}>
                                        <span style={{ fontSize: '0.85rem', color: '#666', fontWeight: 'bold', letterSpacing: '0.5px' }}>BANKING ACCOUNTS</span>
                                        <Link to="/banking/checking" className="dropdown-link">Checking</Link>
                                        <Link to="/banking/savings" className="dropdown-link">Savings</Link>
                                        <Link to="/banking/overview" className="dropdown-link">Banking Overview</Link>
                                        <Link to="/banking/cds" className="dropdown-link">Certificates of Deposit</Link>
                                        <Link to="/banking/iras" className="dropdown-link">Banking IRAs</Link>
                                        <Link to="/banking/rates" className="dropdown-link">Rates</Link>
                                        <Link to="/banking/small-business" className="dropdown-link">Small Business Banking</Link>
                                    </div>
                                    <div className="flex flex-col gap-4" style={{ flex: 1, borderLeft: '1px solid #e5e7eb', paddingLeft: '2rem' }}>
                                        <span style={{ fontSize: '0.85rem', color: '#666', fontWeight: 'bold', letterSpacing: '0.5px' }}>QUICK LINKS</span>
                                        <Link to="#" className="dropdown-link flex items-center gap-2">
                                            <span>Personal Banking Guide</span>
                                        </Link>
                                        <Link to="#" className="dropdown-link flex items-center gap-2">
                                            <span>Small Business Guide</span>
                                        </Link>
                                        <Link to="#" className="dropdown-link flex items-center gap-2">
                                            <span>Citi® Bonus Offers</span>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        <Link to="/lending" className="nav-link">Lending</Link>
                        <Link to="/investing" className="nav-link">Investing</Link>
                        <Link to="/wealth-management" className="nav-link">Wealth Management</Link>

                        {token && (
                            <Link to="/dashboard" className="nav-link font-semibold text-blue-800">Dashboard</Link>
                        )}

                        {!token ? (
                            <Link to="/register" className="nav-link flex items-center gap-1">
                                Open an Account <span style={{ fontSize: '1.2em' }}>›</span>
                            </Link>
                        ) : (
                            <button onClick={handleLogout} className="nav-link flex items-center gap-1 text-red-600 hover:text-red-800">
                                <LogOut size={16} /> Sign Off
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <Search size={20} color="var(--citi-blue)" style={{ cursor: 'pointer' }} />
                    </div>
                </div>
            </div>

            {/* Login Overlay Placeholder - In a real app this might be absolutely positioned or a modal */}
            {!token && (
                <div style={{ position: 'absolute', top: '100%', right: '10%', zIndex: 40, marginTop: '20px' }}>
                    {/* This space is reserved for the login box if we were replicating the homepage layout exactly */}
                </div>
            )}

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="mobile-menu" style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    width: '100%',
                    backgroundColor: 'white',
                    borderTop: '1px solid var(--gray-200)',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    height: 'calc(100vh - 80px)', // Adjust based on header height
                    overflowY: 'auto'
                }}>
                    {!token ? (
                        <div className="flex flex-col gap-2 pb-4 border-b border-gray-200">
                            <Link to="/login" className="btn btn-primary text-center" onClick={() => setIsMobileMenuOpen(false)}>Sign On</Link>
                            <Link to="/register" className="btn btn-outline text-center" onClick={() => setIsMobileMenuOpen(false)}>Open an Account</Link>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2 pb-4 border-b border-gray-200">
                            <div className="flex items-center gap-2 px-2 py-2">
                                {user.isAdmin ? <Shield size={20} color="var(--citi-blue)" /> : <User size={20} color="var(--citi-blue)" />}
                                <span style={{ fontWeight: 500 }}>{user.email}</span>
                            </div>
                            <button onClick={handleLogout} className="btn btn-outline text-center flex items-center justify-center gap-2">
                                <LogOut size={18} /> Sign Off
                            </button>
                        </div>
                    )}

                    <div className="flex flex-col gap-1">
                        {token && (
                            <Link to="/dashboard" className="mobile-nav-link font-semibold text-blue-800" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
                        )}
                        <Link to="/credit-cards" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Credit Cards</Link>

                        <div className="mobile-nav-group">
                            <button
                                onClick={() => setIsMobileBankingOpen(!isMobileBankingOpen)}
                                className="mobile-nav-link w-full flex justify-between items-center"
                                style={{ background: 'none', border: 'none', textAlign: 'left' }}
                            >
                                Banking {isMobileBankingOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                            </button>

                            {isMobileBankingOpen && (
                                <div className="flex flex-col gap-1 pl-4 bg-gray-50 py-2 rounded">
                                    <Link to="/banking/checking" className="mobile-sub-link" onClick={() => setIsMobileMenuOpen(false)}>Checking</Link>
                                    <Link to="/banking/savings" className="mobile-sub-link" onClick={() => setIsMobileMenuOpen(false)}>Savings</Link>
                                    <Link to="/banking/overview" className="mobile-sub-link" onClick={() => setIsMobileMenuOpen(false)}>Overview</Link>
                                    <Link to="/banking/cds" className="mobile-sub-link" onClick={() => setIsMobileMenuOpen(false)}>CDs</Link>
                                    <Link to="/banking/iras" className="mobile-sub-link" onClick={() => setIsMobileMenuOpen(false)}>IRAs</Link>
                                    <Link to="/banking/rates" className="mobile-sub-link" onClick={() => setIsMobileMenuOpen(false)}>Rates</Link>
                                    <Link to="/banking/small-business" className="mobile-sub-link" onClick={() => setIsMobileMenuOpen(false)}>Small Business</Link>
                                </div>
                            )}
                        </div>

                        <Link to="/lending" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Lending</Link>
                        <Link to="/investing" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Investing</Link>
                        <Link to="/wealth-management" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Wealth Management</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
