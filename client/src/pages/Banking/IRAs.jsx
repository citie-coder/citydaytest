import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, TrendingUp, Calendar } from 'lucide-react';

const IRAs = () => {
    return (
        <div className="page-content">
            {/* Hero Section */}
            <div style={{ backgroundColor: '#333', color: 'white', padding: '4rem 0' }}>
                <div className="container">
                    <div style={{ maxWidth: '600px' }}>
                        <h1 style={{ fontSize: '3rem', fontWeight: '300', marginBottom: '1.5rem' }}>Plan for the retirement you deserve.</h1>
                        <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9 }}>
                            Explore our IRA options and find the right strategy for your future.
                        </p>
                        <Link to="/register" className="btn" style={{ backgroundColor: 'var(--citi-light-blue)', color: 'white', padding: '1rem 2rem', fontSize: '1.1rem', display: 'inline-block' }}>
                            Open an IRA
                        </Link>
                    </div>
                </div>
            </div>

            {/* Options Section */}
            <div style={{ padding: '4rem 0', backgroundColor: 'var(--white)' }}>
                <div className="container">
                    <h2 className="text-center" style={{ fontSize: '2rem', color: 'var(--citi-blue)', marginBottom: '3rem' }}>
                        Choose the right IRA for you
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        <div className="card" style={{ padding: '2rem' }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--citi-blue)' }}>Traditional IRA</h3>
                            <p style={{ color: '#666', marginBottom: '1.5rem' }}>Contributions may be tax-deductible, and earnings grow tax-deferred until withdrawal.</p>
                            <ul style={{ listStyle: 'none', padding: 0, color: '#555' }}>
                                <li style={{ marginBottom: '0.5rem' }}>• Tax-deferred growth</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Potential tax deduction</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Mandatory distributions at age 73</li>
                            </ul>
                        </div>

                        <div className="card" style={{ padding: '2rem' }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--citi-blue)' }}>Roth IRA</h3>
                            <p style={{ color: '#666', marginBottom: '1.5rem' }}>Contributions are made with after-tax dollars, but qualified withdrawals are tax-free.</p>
                            <ul style={{ listStyle: 'none', padding: 0, color: '#555' }}>
                                <li style={{ marginBottom: '0.5rem' }}>• Tax-free growth</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Tax-free withdrawals in retirement</li>
                                <li style={{ marginBottom: '0.5rem' }}>• No mandatory distributions</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tools Section */}
            <div style={{ padding: '4rem 0', backgroundColor: 'var(--gray-100)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        <div className="flex gap-4 items-start">
                            <div style={{ color: 'var(--citi-blue)' }}><Briefcase size={32} /></div>
                            <div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Rollover your 401(k)</h4>
                                <p style={{ fontSize: '0.9rem', color: '#666' }}>Consolidate your retirement savings into a single, easy-to-manage account.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div style={{ color: 'var(--citi-blue)' }}><TrendingUp size={32} /></div>
                            <div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Investment Options</h4>
                                <p style={{ fontSize: '0.9rem', color: '#666' }}>Choose from a wide range of investment products, including CDs, mutual funds, and ETFs.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div style={{ color: 'var(--citi-blue)' }}><Calendar size={32} /></div>
                            <div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Retirement Planner</h4>
                                <p style={{ fontSize: '0.9rem', color: '#666' }}>Use our tools to estimate how much you need to save for your retirement goals.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IRAs;
