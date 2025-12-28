import React from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Activity, CreditCard, ArrowRight } from 'lucide-react';

const Overview = () => {
    return (
        <div className="page-content">
            {/* Hero Section */}
            <div style={{ backgroundColor: '#f0f2f5', padding: '4rem 0' }}>
                <div className="container">
                    <h1 style={{ fontSize: '2.5rem', color: 'var(--citi-blue)', marginBottom: '1rem' }}>Banking Overview</h1>
                    <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '700px' }}>
                        A complete view of your financial life. Manage your accounts, track your spending, and plan for the future all in one place.
                    </p>
                </div>
            </div>

            {/* Dashboard Preview Section */}
            <div style={{ padding: '4rem 0', backgroundColor: 'var(--white)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                        {/* Card 1 */}
                        <div className="card hover-effect" style={{ padding: '2rem', borderTop: '4px solid var(--citi-blue)' }}>
                            <div className="flex justify-between items-start mb-4">
                                <div style={{ backgroundColor: 'rgba(0, 59, 112, 0.1)', padding: '1rem', borderRadius: '50%' }}>
                                    <Activity size={24} color="var(--citi-blue)" />
                                </div>
                                <Link to="/banking/checking" style={{ color: 'var(--citi-light-blue)', fontWeight: '600', fontSize: '0.9rem' }}>View Checking</Link>
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--citi-blue)' }}>Everyday Banking</h3>
                            <p style={{ color: '#666', marginBottom: '1.5rem' }}>Manage your daily transactions with ease. Pay bills, transfer money, and deposit checks.</p>
                            <ul style={{ listStyle: 'none', padding: 0, color: '#555' }}>
                                <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--citi-light-blue)' }}></div>
                                    Real-time alerts
                                </li>
                                <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--citi-light-blue)' }}></div>
                                    Mobile check deposit
                                </li>
                            </ul>
                        </div>

                        {/* Card 2 */}
                        <div className="card hover-effect" style={{ padding: '2rem', borderTop: '4px solid var(--citi-light-blue)' }}>
                            <div className="flex justify-between items-start mb-4">
                                <div style={{ backgroundColor: 'rgba(5, 109, 174, 0.1)', padding: '1rem', borderRadius: '50%' }}>
                                    <PieChart size={24} color="var(--citi-light-blue)" />
                                </div>
                                <Link to="/banking/savings" style={{ color: 'var(--citi-light-blue)', fontWeight: '600', fontSize: '0.9rem' }}>View Savings</Link>
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--citi-blue)' }}>Savings & Growth</h3>
                            <p style={{ color: '#666', marginBottom: '1.5rem' }}>Watch your money grow with our high-yield savings accounts and CD options.</p>
                            <ul style={{ listStyle: 'none', padding: 0, color: '#555' }}>
                                <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--citi-light-blue)' }}></div>
                                    Competitive APY
                                </li>
                                <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--citi-light-blue)' }}></div>
                                    Goal tracking tools
                                </li>
                            </ul>
                        </div>

                        {/* Card 3 */}
                        <div className="card hover-effect" style={{ padding: '2rem', borderTop: '4px solid var(--citi-red)' }}>
                            <div className="flex justify-between items-start mb-4">
                                <div style={{ backgroundColor: 'rgba(217, 38, 28, 0.1)', padding: '1rem', borderRadius: '50%' }}>
                                    <CreditCard size={24} color="var(--citi-red)" />
                                </div>
                                <Link to="/credit-cards" style={{ color: 'var(--citi-light-blue)', fontWeight: '600', fontSize: '0.9rem' }}>View Cards</Link>
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--citi-blue)' }}>Credit & Lending</h3>
                            <p style={{ color: '#666', marginBottom: '1.5rem' }}>Find the right credit card or loan to help you achieve your financial goals.</p>
                            <ul style={{ listStyle: 'none', padding: 0, color: '#555' }}>
                                <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--citi-light-blue)' }}></div>
                                    Rewards & cash back
                                </li>
                                <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--citi-light-blue)' }}></div>
                                    Low intro APR
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div style={{ backgroundColor: 'var(--citi-blue)', color: 'white', padding: '3rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Ready to get started?</h2>
                    <p style={{ marginBottom: '2rem', opacity: 0.9 }}>Open an account in minutes and experience banking designed for you.</p>
                    <Link to="/register" className="btn" style={{ backgroundColor: 'white', color: 'var(--citi-blue)', padding: '1rem 2.5rem', fontWeight: 'bold' }}>
                        Open an Account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Overview;
