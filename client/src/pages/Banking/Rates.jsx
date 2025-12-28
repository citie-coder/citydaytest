import React from 'react';
import { Link } from 'react-router-dom';

const Rates = () => {
    return (
        <div className="page-content">
            <div className="container" style={{ padding: '4rem 0' }}>
                <h1 style={{ fontSize: '2.5rem', color: 'var(--citi-blue)', marginBottom: '1rem' }}>Current Interest Rates</h1>
                <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '3rem' }}>
                    View our latest rates for checking, savings, and CD accounts. Rates are subject to change.
                </p>

                {/* Savings Rates */}
                <div style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '1.75rem', color: 'var(--citi-blue)', marginBottom: '1.5rem', borderBottom: '2px solid var(--gray-200)', paddingBottom: '0.5rem' }}>Savings Accounts</h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: 'var(--shadow)', backgroundColor: 'white' }}>
                        <thead style={{ backgroundColor: '#f8f9fa' }}>
                            <tr>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Account Type</th>
                                <th style={{ padding: '1rem', textAlign: 'center' }}>Interest Rate</th>
                                <th style={{ padding: '1rem', textAlign: 'center' }}>APY</th>
                                <th style={{ padding: '1rem', textAlign: 'center' }}>Minimum Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '1rem', fontWeight: '600' }}>Citi® Accelerate Savings</td>
                                <td style={{ padding: '1rem', textAlign: 'center' }}>4.20%</td>
                                <td style={{ padding: '1rem', textAlign: 'center', color: 'var(--citi-light-blue)', fontWeight: 'bold' }}>4.30%</td>
                                <td style={{ padding: '1rem', textAlign: 'center' }}>$0</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '1rem', fontWeight: '600' }}>Citi® Savings</td>
                                <td style={{ padding: '1rem', textAlign: 'center' }}>0.05%</td>
                                <td style={{ padding: '1rem', textAlign: 'center', color: 'var(--citi-light-blue)', fontWeight: 'bold' }}>0.05%</td>
                                <td style={{ padding: '1rem', textAlign: 'center' }}>$0</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* CD Rates */}
                <div style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '1.75rem', color: 'var(--citi-blue)', marginBottom: '1.5rem', borderBottom: '2px solid var(--gray-200)', paddingBottom: '0.5rem' }}>Certificates of Deposit (CDs)</h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: 'var(--shadow)', backgroundColor: 'white' }}>
                        <thead style={{ backgroundColor: '#f8f9fa' }}>
                            <tr>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Term</th>
                                <th style={{ padding: '1rem', textAlign: 'center' }}>Interest Rate</th>
                                <th style={{ padding: '1rem', textAlign: 'center' }}>APY</th>
                                <th style={{ padding: '1rem', textAlign: 'center' }}>Minimum Deposit</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '1rem', fontWeight: '600' }}>6 Month</td>
                                <td style={{ padding: '1rem', textAlign: 'center' }}>3.90%</td>
                                <td style={{ padding: '1rem', textAlign: 'center', color: 'var(--citi-light-blue)', fontWeight: 'bold' }}>4.00%</td>
                                <td style={{ padding: '1rem', textAlign: 'center' }}>$500</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '1rem', fontWeight: '600' }}>12 Month</td>
                                <td style={{ padding: '1rem', textAlign: 'center' }}>4.40%</td>
                                <td style={{ padding: '1rem', textAlign: 'center', color: 'var(--citi-light-blue)', fontWeight: 'bold' }}>4.50%</td>
                                <td style={{ padding: '1rem', textAlign: 'center' }}>$500</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '1rem', fontWeight: '600' }}>18 Month</td>
                                <td style={{ padding: '1rem', textAlign: 'center' }}>4.15%</td>
                                <td style={{ padding: '1rem', textAlign: 'center', color: 'var(--citi-light-blue)', fontWeight: 'bold' }}>4.25%</td>
                                <td style={{ padding: '1rem', textAlign: 'center' }}>$500</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="text-center">
                    <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '2rem' }}>
                        Rates are subject to change without notice. Fees could reduce earnings.
                    </p>
                    <Link to="/register" className="btn btn-primary">Open an Account</Link>
                </div>
            </div>
        </div>
    );
};

export default Rates;
