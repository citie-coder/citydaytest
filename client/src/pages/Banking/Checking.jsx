import React from 'react';
import { Check, CreditCard, Shield, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Checking = () => {
    return (
        <div className="page-content">
            {/* Hero Section */}
            <div style={{ backgroundColor: 'var(--citi-blue)', color: 'white', padding: '4rem 0' }}>
                <div className="container">
                    <div style={{ maxWidth: '600px' }}>
                        <h1 style={{ fontSize: '3rem', fontWeight: '300', marginBottom: '1.5rem', lineHeight: 1.2 }}>
                            Checking that works for you.
                        </h1>
                        <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9 }}>
                            Enjoy a checking account with no monthly service fees and access to over 65,000 fee-free ATMs.
                        </p>
                        <Link to="/register" className="btn" style={{ backgroundColor: 'var(--citi-light-blue)', color: 'white', padding: '1rem 2rem', fontSize: '1.1rem', display: 'inline-block' }}>
                            Open an Account
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div style={{ padding: '4rem 0', backgroundColor: 'var(--white)' }}>
                <div className="container">
                    <h2 className="text-center" style={{ fontSize: '2rem', color: 'var(--citi-blue)', marginBottom: '3rem' }}>
                        Why choose our Checking?
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        <div className="card text-center" style={{ padding: '2rem' }}>
                            <div style={{ color: 'var(--citi-light-blue)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                                <Shield size={48} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--citi-blue)' }}>No Monthly Fees</h3>
                            <p style={{ color: '#666' }}>Keep more of your money with $0 monthly maintenance fees on eligible accounts.</p>
                        </div>

                        <div className="card text-center" style={{ padding: '2rem' }}>
                            <div style={{ color: 'var(--citi-light-blue)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                                <CreditCard size={48} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--citi-blue)' }}>Fee-Free ATMs</h3>
                            <p style={{ color: '#666' }}>Access cash at over 65,000 fee-free ATMs nationwide.</p>
                        </div>

                        <div className="card text-center" style={{ padding: '2rem' }}>
                            <div style={{ color: 'var(--citi-light-blue)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                                <Smartphone size={48} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--citi-blue)' }}>Digital Banking</h3>
                            <p style={{ color: '#666' }}>Manage your money anytime, anywhere with our top-rated mobile app.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comparison Table */}
            <div style={{ padding: '4rem 0', backgroundColor: 'var(--bg-color)' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2rem', color: 'var(--citi-blue)', marginBottom: '2rem' }}>Compare Accounts</h2>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', boxShadow: 'var(--shadow)' }}>
                            <thead>
                                <tr style={{ backgroundColor: 'var(--citi-blue)', color: 'white' }}>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Feature</th>
                                    <th style={{ padding: '1rem', textAlign: 'center' }}>Regular Checking</th>
                                    <th style={{ padding: '1rem', textAlign: 'center' }}>Premium Checking</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderBottom: '1px solid var(--gray-200)' }}>
                                    <td style={{ padding: '1rem', fontWeight: '600' }}>Monthly Fee</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>$0</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>$25 (waivable)</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid var(--gray-200)' }}>
                                    <td style={{ padding: '1rem', fontWeight: '600' }}>ATM Fees</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>None at our ATMs</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>Reimbursed worldwide</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '1rem', fontWeight: '600' }}>Interest</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>None</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>Yes</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checking;
