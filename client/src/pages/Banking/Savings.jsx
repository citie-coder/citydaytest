import React from 'react';
import { TrendingUp, Lock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const Savings = () => {
    return (
        <div className="page-content">
            {/* Hero Section */}
            <div style={{ background: 'linear-gradient(135deg, var(--citi-blue) 0%, #002a50 100%)', color: 'white', padding: '4rem 0' }}>
                <div className="container">
                    <div style={{ maxWidth: '600px' }}>
                        <span style={{ display: 'inline-block', padding: '0.25rem 0.5rem', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '4px', fontSize: '0.875rem', marginBottom: '1rem' }}>
                            HIGH-YIELD SAVINGS
                        </span>
                        <h1 style={{ fontSize: '3.5rem', fontWeight: '300', marginBottom: '1rem', lineHeight: 1.1 }}>
                            4.30% <span style={{ fontSize: '1.5rem' }}>APY</span>
                        </h1>
                        <p style={{ fontSize: '1.5rem', marginBottom: '2rem', opacity: 0.9 }}>
                            Accelerate your savings with our competitive rates.
                        </p>
                        <Link to="/register" className="btn" style={{ backgroundColor: 'var(--citi-light-blue)', color: 'white', padding: '1rem 2rem', fontSize: '1.1rem', display: 'inline-block' }}>
                            Start Saving Now
                        </Link>
                    </div>
                </div>
            </div>

            {/* Benefits Grid */}
            <div style={{ padding: '4rem 0', backgroundColor: 'var(--white)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                        <div className="flex gap-4">
                            <div style={{ color: 'var(--citi-light-blue)' }}>
                                <TrendingUp size={32} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--citi-blue)' }}>Competitive Rates</h3>
                                <p style={{ color: '#666', lineHeight: 1.6 }}>Earn more on your money with rates that are consistently higher than the national average.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div style={{ color: 'var(--citi-light-blue)' }}>
                                <Lock size={32} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--citi-blue)' }}>FDIC Insured</h3>
                                <p style={{ color: '#666', lineHeight: 1.6 }}>Your deposits are insured up to the maximum amount allowed by law.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div style={{ color: 'var(--citi-light-blue)' }}>
                                <DollarSign size={32} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--citi-blue)' }}>No Hidden Fees</h3>
                                <p style={{ color: '#666', lineHeight: 1.6 }}>Enjoy $0 monthly maintenance fees and no minimum balance requirements.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Calculator Section Placeholder */}
            <div style={{ padding: '4rem 0', backgroundColor: 'var(--gray-100)' }}>
                <div className="container text-center">
                    <h2 style={{ fontSize: '2rem', color: 'var(--citi-blue)', marginBottom: '1rem' }}>Watch your savings grow</h2>
                    <p style={{ marginBottom: '2rem', color: '#666' }}>See how much you could earn with our high-yield savings account.</p>
                    <div className="card" style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--citi-blue)' }}>
                            Projected Savings: $12,450
                        </div>
                        <p style={{ fontSize: '0.875rem', color: '#999', marginTop: '0.5rem' }}>Based on $10,000 initial deposit over 5 years.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Savings;
