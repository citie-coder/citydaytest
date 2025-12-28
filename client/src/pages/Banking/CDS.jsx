import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Clock, TrendingUp } from 'lucide-react';

const CDS = () => {
    return (
        <div className="page-content">
            {/* Hero Section */}
            <div style={{ background: 'linear-gradient(to right, #003b70, #005a9c)', color: 'white', padding: '4rem 0' }}>
                <div className="container">
                    <div style={{ maxWidth: '650px' }}>
                        <h1 style={{ fontSize: '3rem', fontWeight: '300', marginBottom: '1rem' }}>Certificates of Deposit</h1>
                        <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9 }}>
                            Lock in a guaranteed rate and watch your savings grow with confidence.
                        </p>
                        <div className="flex gap-4">
                            <Link to="/register" className="btn" style={{ backgroundColor: 'var(--citi-light-blue)', color: 'white', padding: '0.75rem 1.5rem' }}>
                                Open a CD
                            </Link>
                            <Link to="/banking/rates" className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>
                                View All Rates
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Rates Table Section */}
            <div style={{ padding: '4rem 0', backgroundColor: 'var(--white)' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2rem', color: 'var(--citi-blue)', marginBottom: '2rem', textAlign: 'center' }}>Featured CD Rates</h2>

                    <div style={{ maxWidth: '800px', margin: '0 auto', boxShadow: 'var(--shadow)', borderRadius: '8px', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead style={{ backgroundColor: '#f8f9fa' }}>
                                <tr>
                                    <th style={{ padding: '1.5rem', textAlign: 'left', color: '#666', fontWeight: '600' }}>Term</th>
                                    <th style={{ padding: '1.5rem', textAlign: 'center', color: '#666', fontWeight: '600' }}>Interest Rate</th>
                                    <th style={{ padding: '1.5rem', textAlign: 'center', color: '#666', fontWeight: '600' }}>APY*</th>
                                    <th style={{ padding: '1.5rem', textAlign: 'right' }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '1.5rem', fontWeight: 'bold', color: 'var(--citi-blue)' }}>6 Month</td>
                                    <td style={{ padding: '1.5rem', textAlign: 'center' }}>3.90%</td>
                                    <td style={{ padding: '1.5rem', textAlign: 'center', fontWeight: 'bold', color: 'var(--citi-light-blue)', fontSize: '1.2rem' }}>4.00%</td>
                                    <td style={{ padding: '1.5rem', textAlign: 'right' }}>
                                        <Link to="/register" style={{ color: 'var(--citi-light-blue)', fontWeight: '600', textDecoration: 'none' }}>Open Now &rarr;</Link>
                                    </td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '1.5rem', fontWeight: 'bold', color: 'var(--citi-blue)' }}>12 Month</td>
                                    <td style={{ padding: '1.5rem', textAlign: 'center' }}>4.40%</td>
                                    <td style={{ padding: '1.5rem', textAlign: 'center', fontWeight: 'bold', color: 'var(--citi-light-blue)', fontSize: '1.2rem' }}>4.50%</td>
                                    <td style={{ padding: '1.5rem', textAlign: 'right' }}>
                                        <Link to="/register" style={{ color: 'var(--citi-light-blue)', fontWeight: '600', textDecoration: 'none' }}>Open Now &rarr;</Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '1.5rem', fontWeight: 'bold', color: 'var(--citi-blue)' }}>18 Month</td>
                                    <td style={{ padding: '1.5rem', textAlign: 'center' }}>4.15%</td>
                                    <td style={{ padding: '1.5rem', textAlign: 'center', fontWeight: 'bold', color: 'var(--citi-light-blue)', fontSize: '1.2rem' }}>4.25%</td>
                                    <td style={{ padding: '1.5rem', textAlign: 'right' }}>
                                        <Link to="/register" style={{ color: 'var(--citi-light-blue)', fontWeight: '600', textDecoration: 'none' }}>Open Now &rarr;</Link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem', color: '#999' }}>*Annual Percentage Yield (APY) is accurate as of today. Rates are subject to change.</p>
                </div>
            </div>

            {/* Features Grid */}
            <div style={{ padding: '4rem 0', backgroundColor: 'var(--gray-100)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                            <div style={{ color: 'var(--citi-blue)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                                <ShieldCheck size={40} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Guaranteed Returns</h3>
                            <p style={{ color: '#666' }}>Know exactly how much you'll earn with a fixed interest rate for the full term.</p>
                        </div>
                        <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                            <div style={{ color: 'var(--citi-blue)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                                <Clock size={40} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Flexible Terms</h3>
                            <p style={{ color: '#666' }}>Choose from a wide range of terms, from 3 months to 5 years, to fit your goals.</p>
                        </div>
                        <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                            <div style={{ color: 'var(--citi-blue)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                                <TrendingUp size={40} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Compound Interest</h3>
                            <p style={{ color: '#666' }}>Interest is compounded daily and credited monthly to maximize your earnings.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CDS;
