import React from 'react';
import { CreditCard, Shield, Globe, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CreditCards = () => {
    const cards = [
        {
            title: "Double Cash Card",
            image: "/images/double-cash-card.png",
            description: "Earn 2% cash back on purchases: 1% when you buy and 1% as you pay.",
            features: ["No Annual Fee", "0% Intro APR for 18 months", "2% Cash Back"]
        },
        {
            title: "Premier Travel Card",
            image: "/images/premier-card.png",
            description: "Earn 3x points on air travel, hotels, and restaurants.",
            features: ["$95 Annual Fee", "60,000 Bonus Points", "No Foreign Transaction Fees"]
        },
        {
            title: "Simplicity Card",
            image: "/images/simplicity-card.png",
            description: "The only card with no late fees, no penalty rate, and no annual fee.",
            features: ["No Annual Fee", "0% Intro APR for 21 months", "No Late Fees"]
        }
    ];

    return (
        <div className="page-content">
            {/* Hero Section */}
            <div style={{ backgroundColor: 'var(--citi-blue)', color: 'white', padding: '4rem 0', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'url(https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80) center/cover', opacity: 0.1 }}></div>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ maxWidth: '600px' }}>
                        <h1 style={{ fontSize: '3rem', fontWeight: '300', marginBottom: '1.5rem', lineHeight: 1.2 }}>
                            Find the perfect card for your lifestyle.
                        </h1>
                        <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9 }}>
                            From cash back to travel rewards, we have a credit card that fits your needs.
                        </p>
                        <button className="btn" style={{ backgroundColor: 'var(--citi-light-blue)', color: 'white', padding: '1rem 2rem', fontSize: '1.1rem', display: 'inline-block' }}>
                            Compare Cards
                        </button>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div style={{ padding: '4rem 0', backgroundColor: 'var(--white)' }}>
                <div className="container">
                    <h2 className="text-center" style={{ fontSize: '2rem', color: 'var(--citi-blue)', marginBottom: '3rem' }}>
                        Why choose our Credit Cards?
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        <div className="card text-center" style={{ padding: '2rem' }}>
                            <div style={{ color: 'var(--citi-light-blue)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                                <CreditCard size={48} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--citi-blue)' }}>Great Rewards</h3>
                            <p style={{ color: '#666' }}>Earn cash back, points, or miles on every purchase you make.</p>
                        </div>

                        <div className="card text-center" style={{ padding: '2rem' }}>
                            <div style={{ color: 'var(--citi-light-blue)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                                <Shield size={48} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--citi-blue)' }}>Security First</h3>
                            <p style={{ color: '#666' }}>Rest easy with $0 Liability on unauthorized charges and 24/7 fraud monitoring.</p>
                        </div>

                        <div className="card text-center" style={{ padding: '2rem' }}>
                            <div style={{ color: 'var(--citi-light-blue)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                                <Globe size={48} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--citi-blue)' }}>Travel Benefits</h3>
                            <p style={{ color: '#666' }}>Enjoy no foreign transaction fees and travel protection on select cards.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Section */}
            <div style={{ padding: '4rem 0', backgroundColor: 'var(--bg-color)' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2rem', color: 'var(--citi-blue)', marginBottom: '3rem' }}>Featured Cards</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {cards.map((card, index) => (
                            <div key={index} className="card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ height: '200px', overflow: 'hidden' }}>
                                    <img src={card.image} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--citi-blue)' }}>{card.title}</h3>
                                    <p style={{ color: '#666', marginBottom: '1.5rem', flex: 1 }}>{card.description}</p>
                                    <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
                                        {card.features.map((feature, idx) => (
                                            <li key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', color: '#444', fontSize: '0.9rem' }}>
                                                <Check size={16} style={{ color: 'var(--citi-light-blue)', marginRight: '0.5rem' }} />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <button className="btn" style={{ backgroundColor: 'var(--citi-blue)', color: 'white', width: '100%' }}>
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Manage Anywhere Section */}
            <div style={{ padding: '4rem 0', backgroundColor: 'var(--white)' }}>
                <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1 1 400px' }}>
                        <h2 style={{ fontSize: '2.5rem', color: 'var(--citi-blue)', marginBottom: '1.5rem', lineHeight: 1.2 }}>
                            Manage your account anywhere.
                        </h2>
                        <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem', lineHeight: 1.6 }}>
                            With the Citi Mobile® App, you can view your balance, pay bills, and track your spending from virtually anywhere. Plus, get instant alerts for suspicious activity.
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', color: '#444' }}>
                                <Check size={20} style={{ color: 'var(--citi-light-blue)', marginRight: '0.75rem' }} />
                                Real-time transaction notifications
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', color: '#444' }}>
                                <Check size={20} style={{ color: 'var(--citi-light-blue)', marginRight: '0.75rem' }} />
                                Lock and unlock your card instantly
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', color: '#444' }}>
                                <Check size={20} style={{ color: 'var(--citi-light-blue)', marginRight: '0.75rem' }} />
                                24/7 customer support access
                            </li>
                        </ul>
                    </div>
                    <div style={{ flex: '1 1 400px' }}>
                        <img
                            src="/images/mobile-banking.png"
                            alt="Mobile Banking"
                            style={{ width: '100%', borderRadius: '0.5rem', boxShadow: 'var(--shadow)' }}
                        />
                    </div>
                </div>
            </div>

            {/* Comparison Table */}
            <div style={{ padding: '4rem 0', backgroundColor: 'var(--bg-color)' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2rem', color: 'var(--citi-blue)', marginBottom: '2rem' }}>Compare Cards</h2>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', boxShadow: 'var(--shadow)' }}>
                            <thead>
                                <tr style={{ backgroundColor: 'var(--citi-blue)', color: 'white' }}>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Feature</th>
                                    <th style={{ padding: '1rem', textAlign: 'center' }}>Double Cash</th>
                                    <th style={{ padding: '1rem', textAlign: 'center' }}>Premier Travel</th>
                                    <th style={{ padding: '1rem', textAlign: 'center' }}>Simplicity</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderBottom: '1px solid var(--gray-200)' }}>
                                    <td style={{ padding: '1rem', fontWeight: '600' }}>Annual Fee</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>$0</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>$95</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>$0</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid var(--gray-200)' }}>
                                    <td style={{ padding: '1rem', fontWeight: '600' }}>Intro APR</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>0% for 18 mo</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>N/A</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>0% for 21 mo</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid var(--gray-200)' }}>
                                    <td style={{ padding: '1rem', fontWeight: '600' }}>Rewards</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>2% Cash Back</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>3x Points</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>None</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '1rem', fontWeight: '600' }}>Foreign Trans. Fee</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>3%</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>0%</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>3%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreditCards;
