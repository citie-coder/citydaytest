import React from 'react';
import { TrendingUp, PieChart, Shield, ArrowRight } from 'lucide-react';

const Investing = () => {
    const investmentOptions = [
        {
            title: "Self-Directed Trading",
            icon: <TrendingUp size={48} />,
            description: "Take control of your portfolio with our advanced trading platform and tools.",
            features: ["$0 Commission Stocks", "Real-time Data", "Advanced Charting"]
        },
        {
            title: "Managed Portfolios",
            icon: <PieChart size={48} />,
            description: "Let our experts manage your investments based on your goals and risk tolerance.",
            features: ["Automated Rebalancing", "Tax-Loss Harvesting", "Low Advisory Fees"]
        },
        {
            title: "Retirement Planning",
            icon: <Shield size={48} />,
            description: "Secure your future with our comprehensive retirement accounts and planning services.",
            features: ["IRA & Roth IRA", "401(k) Rollovers", "Retirement Calculator"]
        }
    ];

    return (
        <div className="page-content">
            {/* Hero Section */}
            <div style={{ background: 'linear-gradient(to right, var(--citi-blue), var(--citi-light-blue))', color: 'white', padding: '4rem 0', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'url(https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80) center/cover', opacity: 0.1 }}></div>
                <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h1 style={{ fontSize: '3rem', fontWeight: '300', marginBottom: '1.5rem', lineHeight: 1.2 }}>
                            Grow your wealth with confidence.
                        </h1>
                        <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9 }}>
                            Smart investment solutions designed to help you reach your financial goals faster.
                        </p>
                        <button className="btn" style={{ backgroundColor: 'white', color: 'var(--citi-blue)', padding: '1rem 2rem', fontSize: '1.1rem', display: 'inline-block' }}>
                            Start Investing
                        </button>
                    </div>
                </div>
            </div>

            {/* Options Section */}
            <div style={{ padding: '4rem 0', backgroundColor: 'var(--white)' }}>
                <div className="container">
                    <h2 className="text-center" style={{ fontSize: '2rem', color: 'var(--citi-blue)', marginBottom: '3rem' }}>
                        Investment Options
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {investmentOptions.map((option, index) => (
                            <div key={index} className="card" style={{ padding: '2rem', borderTop: '4px solid var(--citi-light-blue)' }}>
                                <div style={{ color: 'var(--citi-light-blue)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                                    {option.icon}
                                </div>
                                <h3 className="text-center" style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--citi-blue)' }}>{option.title}</h3>
                                <p className="text-center" style={{ color: '#666', marginBottom: '1.5rem' }}>{option.description}</p>
                                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
                                    {option.features.map((feature, idx) => (
                                        <li key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', color: '#444' }}>
                                            <div style={{ width: '6px', height: '6px', backgroundColor: 'var(--citi-light-blue)', borderRadius: '50%', marginRight: '0.75rem' }}></div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button style={{ color: 'var(--citi-light-blue)', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer' }}>
                                    Explore Option <ArrowRight size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Investing;
