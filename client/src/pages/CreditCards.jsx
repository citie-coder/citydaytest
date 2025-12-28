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
            {/* Hero Section - Wealth Management Style */}
            <div style={{ backgroundColor: '#001529', color: 'white', padding: '5rem 0', position: 'relative', overflow: 'hidden', minHeight: '500px', display: 'flex', alignItems: 'center' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'url(https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80) center/cover', opacity: 0.2 }}></div>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ maxWidth: '700px' }}>
                        <span style={{ color: 'var(--citi-light-blue)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '0.5rem' }}>Citi Credit Cards</span>
                        <h1 style={{ fontFamily: 'serif', fontSize: '3.5rem', fontWeight: '300', marginBottom: '1.5rem', lineHeight: 1.1 }}>
                            Experience the power of premium credit.
                        </h1>
                        <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9, fontWeight: '300' }}>
                            Unlock exclusive rewards, travel benefits, and financial flexibility with our suite of credit cards.
                        </p>
                        <button className="btn" style={{ backgroundColor: 'white', color: '#001529', padding: '1rem 2rem', fontSize: '1.1rem', display: 'inline-block' }}>
                            Compare Cards
                        </button>
                    </div>
                </div>
            </div>

            {/* Features Section - Wealth Management Style */}
            <div style={{ padding: '5rem 0', backgroundColor: 'var(--white)' }}>
                <div className="container">
                    <h2 className="text-center" style={{ fontSize: '2.5rem', fontFamily: 'serif', color: '#001529', marginBottom: '1rem' }}>
                        Why choose our Credit Cards?
                    </h2>
                    <p className="text-center" style={{ maxWidth: '600px', margin: '0 auto 4rem', color: '#666', fontSize: '1.1rem' }}>
                        Designed to enhance your lifestyle with superior rewards and world-class security.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                        <div className="card text-center" style={{ padding: '3rem', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                            <div style={{ width: '80px', height: '80px', backgroundColor: '#f0f7fa', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--citi-blue)', margin: '0 auto 2rem' }}>
                                <CreditCard size={40} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333', fontFamily: 'serif' }}>Great Rewards</h3>
                            <p style={{ color: '#666', lineHeight: 1.6 }}>Earn cash back, points, or miles on every purchase you make with our generous rewards programs.</p>
                        </div>

                        <div className="card text-center" style={{ padding: '3rem', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                            <div style={{ width: '80px', height: '80px', backgroundColor: '#f0f7fa', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--citi-blue)', margin: '0 auto 2rem' }}>
                                <Shield size={40} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333', fontFamily: 'serif' }}>Security First</h3>
                            <p style={{ color: '#666', lineHeight: 1.6 }}>Rest easy with $0 Liability on unauthorized charges and 24/7 fraud monitoring protecting your account.</p>
                        </div>

                        <div className="card text-center" style={{ padding: '3rem', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                            <div style={{ width: '80px', height: '80px', backgroundColor: '#f0f7fa', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--citi-blue)', margin: '0 auto 2rem' }}>
                                <Globe size={40} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333', fontFamily: 'serif' }}>Travel Benefits</h3>
                            <p style={{ color: '#666', lineHeight: 1.6 }}>Enjoy no foreign transaction fees and comprehensive travel protection on select premium cards.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Manage Anywhere Section - Wealth Management Style */}
            <div style={{ padding: '5rem 0', backgroundColor: '#f8f9fa' }}>
                <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '5rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1 1 400px' }}>
                        <span style={{ color: 'var(--citi-light-blue)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '0.5rem' }}>Digital Experience</span>
                        <h2 style={{ fontSize: '2.5rem', fontFamily: 'serif', color: '#001529', marginBottom: '1.5rem', lineHeight: 1.2 }}>
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
                            style={{ width: '100%', borderRadius: '0.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                        />
                    </div>
                </div>
            </div>

            {/* Products Section - Wealth Management Style */}
            <div style={{ padding: '5rem 0', backgroundColor: 'var(--white)' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', fontFamily: 'serif', color: '#001529', marginBottom: '3rem', textAlign: 'center' }}>Featured Cards</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
                        {cards.map((card, index) => (
                            <div key={index} className="card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                                <div style={{ height: '220px', overflow: 'hidden' }}>
                                    <img src={card.image} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} />
                                </div>
                                <div style={{ padding: '2.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: '#001529', fontFamily: 'serif' }}>{card.title}</h3>
                                    <p style={{ color: '#666', marginBottom: '1.5rem', flex: 1, lineHeight: 1.6 }}>{card.description}</p>
                                    <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                                        {card.features.map((feature, idx) => (
                                            <li key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem', color: '#444', fontSize: '0.95rem' }}>
                                                <Check size={16} style={{ color: 'var(--citi-light-blue)', marginRight: '0.75rem' }} />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <button className="btn" style={{ backgroundColor: '#001529', color: 'white', width: '100%', padding: '1rem' }}>
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Comparison Table - Wealth Management Style */}
            <div style={{ padding: '5rem 0', backgroundColor: '#f8f9fa' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', fontFamily: 'serif', color: '#001529', marginBottom: '3rem', textAlign: 'center' }}>Compare Cards</h2>
                    <div style={{ overflowX: 'auto', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#001529', color: 'white' }}>
                                    <th style={{ padding: '1.5rem', textAlign: 'left', fontFamily: 'serif', fontSize: '1.1rem' }}>Feature</th>
                                    <th style={{ padding: '1.5rem', textAlign: 'center', fontFamily: 'serif', fontSize: '1.1rem' }}>Double Cash</th>
                                    <th style={{ padding: '1.5rem', textAlign: 'center', fontFamily: 'serif', fontSize: '1.1rem' }}>Premier Travel</th>
                                    <th style={{ padding: '1.5rem', textAlign: 'center', fontFamily: 'serif', fontSize: '1.1rem' }}>Simplicity</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '1.5rem', fontWeight: '600', color: '#333' }}>Annual Fee</td>
                                    <td style={{ padding: '1.5rem', textAlign: 'center', color: '#666' }}>$0</td>
                                    <td style={{ padding: '1.5rem', textAlign: 'center', color: '#666' }}>$95</td>
                                    <td style={{ padding: '1.5rem', textAlign: 'center', color: '#666' }}>$0</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '1.5rem', fontWeight: '600', color: '#333' }}>Intro APR</td>
                                    <td style={{ padding: '1.5rem', textAlign: 'center', color: '#666' }}>0% for 18 mo</td>
                                    <td style={{ padding: '1.5rem', textAlign: 'center', color: '#666' }}>N/A</td>
                                    <td style={{ padding: '1.5rem', textAlign: 'center', color: '#666' }}>0% for 21 mo</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '1.5rem', fontWeight: '600', color: '#333' }}>Rewards</td>
                                    <td style={{ padding: '1.5rem', textAlign: 'center', color: '#666' }}>2% Cash Back</td>
                                    <td style={{ padding: '1.5rem', textAlign: 'center', color: '#666' }}>3x Points</td>
                                    <td style={{ padding: '1.5rem', textAlign: 'center', color: '#666' }}>None</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '1.5rem', fontWeight: '600', color: '#333' }}>Foreign Trans. Fee</td>
                                    <td style={{ padding: '1.5rem', textAlign: 'center', color: '#666' }}>3%</td>
                                    <td style={{ padding: '1.5rem', textAlign: 'center', color: '#666' }}>0%</td>
                                    <td style={{ padding: '1.5rem', textAlign: 'center', color: '#666' }}>3%</td>
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
