import React from 'react';
import { ArrowRight, Home, Car, CreditCard, DollarSign, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const Lending = () => {
    const loanProducts = [
        {
            title: "Personal Loans",
            icon: <DollarSign size={40} />,
            description: "Flexible financing for your personal needs. Competitive rates and quick approval.",
            link: "/apply/personal"
        },
        {
            title: "Mortgages",
            icon: <Home size={40} />,
            description: "Find your dream home with our range of mortgage options tailored to you.",
            link: "/apply/mortgage"
        },
        {
            title: "Auto Loans",
            icon: <Car size={40} />,
            description: "Get behind the wheel faster with our low-rate auto loans.",
            link: "/apply/auto"
        },
        {
            title: "Credit Lines",
            icon: <CreditCard size={40} />,
            description: "Access funds when you need them with a flexible line of credit.",
            link: "/apply/credit"
        }
    ];

    return (
        <div className="page-content">
            {/* Hero Section - Wealth Management Style */}
            <div style={{ backgroundColor: '#001529', color: 'white', padding: '5rem 0', position: 'relative', overflow: 'hidden', minHeight: '500px', display: 'flex', alignItems: 'center' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80) center/cover', opacity: 0.2 }}></div>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ maxWidth: '700px' }}>
                        <span style={{ color: 'var(--citi-light-blue)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '0.5rem' }}>Citi Lending</span>
                        <h1 style={{ fontFamily: 'serif', fontSize: '3.5rem', fontWeight: '300', marginBottom: '1.5rem', lineHeight: 1.1 }}>
                            Lending solutions for every stage of life.
                        </h1>
                        <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9, fontWeight: '300' }}>
                            Whether you're buying a home, a car, or consolidating debt, we have the right loan for you.
                        </p>
                        <button className="btn" style={{ backgroundColor: 'white', color: '#001529', padding: '1rem 2rem', fontSize: '1.1rem', display: 'inline-block' }}>
                            Check Your Rate
                        </button>
                    </div>
                </div>
            </div>

            {/* Products Section - Wealth Management Style */}
            <div style={{ padding: '5rem 0', backgroundColor: 'var(--white)' }}>
                <div className="container">
                    <h2 className="text-center" style={{ fontSize: '2.5rem', fontFamily: 'serif', color: '#001529', marginBottom: '3rem' }}>
                        Find the right loan for you
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
                        {loanProducts.map((product, index) => (
                            <div key={index} className="card text-center" style={{ padding: '3rem', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                                <div style={{ width: '80px', height: '80px', backgroundColor: '#f0f7fa', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--citi-blue)', margin: '0 auto 2rem' }}>
                                    {product.icon}
                                </div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333', fontFamily: 'serif' }}>{product.title}</h3>
                                <p style={{ color: '#666', marginBottom: '1.5rem', lineHeight: 1.6 }}>{product.description}</p>
                                <Link to={product.link} style={{ color: 'var(--citi-blue)', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                    Learn More <ArrowRight size={16} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Why Choose Us Section - Wealth Management Style */}
            <div style={{ padding: '5rem 0', backgroundColor: '#f8f9fa' }}>
                <div className="container">
                    <h2 className="text-center" style={{ fontSize: '2.5rem', fontFamily: 'serif', color: '#001529', marginBottom: '3rem' }}>
                        Why borrow from us?
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
                        <div className="card text-center" style={{ padding: '3rem', border: 'none', backgroundColor: 'white', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                            <div style={{ width: '80px', height: '80px', backgroundColor: '#f0f7fa', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--citi-blue)', margin: '0 auto 2rem' }}>
                                <DollarSign size={40} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333', fontFamily: 'serif' }}>Competitive Rates</h3>
                            <p style={{ color: '#666', lineHeight: 1.6 }}>We offer some of the lowest rates in the industry to help you save money.</p>
                        </div>

                        <div className="card text-center" style={{ padding: '3rem', border: 'none', backgroundColor: 'white', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                            <div style={{ width: '80px', height: '80px', backgroundColor: '#f0f7fa', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--citi-blue)', margin: '0 auto 2rem' }}>
                                <Check size={40} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333', fontFamily: 'serif' }}>Fast Approval</h3>
                            <p style={{ color: '#666', lineHeight: 1.6 }}>Get a decision in minutes with our simple and secure online application.</p>
                        </div>

                        <div className="card text-center" style={{ padding: '3rem', border: 'none', backgroundColor: 'white', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                            <div style={{ width: '80px', height: '80px', backgroundColor: '#f0f7fa', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--citi-blue)', margin: '0 auto 2rem' }}>
                                <Home size={40} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333', fontFamily: 'serif' }}>Personal Service</h3>
                            <p style={{ color: '#666', lineHeight: 1.6 }}>Our dedicated loan officers are here to guide you every step of the way.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Expert Guidance Section - Wealth Management Style */}
            <div style={{ padding: '5rem 0', backgroundColor: 'var(--white)' }}>
                <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '5rem', flexWrap: 'wrap', flexDirection: 'row-reverse' }}>
                    <div style={{ flex: '1 1 400px' }}>
                        <span style={{ color: 'var(--citi-light-blue)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '0.5rem' }}>Personalized Support</span>
                        <h2 style={{ fontSize: '2.5rem', fontFamily: 'serif', color: '#001529', marginBottom: '1.5rem', lineHeight: 1.2 }}>
                            Expert guidance at every step.
                        </h2>
                        <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem', lineHeight: 1.6 }}>
                            Navigating the world of loans can be complex. That's why our dedicated loan officers are here to help you understand your options and choose the best solution for your financial goals.
                        </p>
                        <button className="btn" style={{ backgroundColor: 'var(--citi-blue)', color: 'white', padding: '1rem 2rem' }}>
                            Speak with an Officer
                        </button>
                    </div>
                    <div style={{ flex: '1 1 400px' }}>
                        <img
                            src="/images/business-lending.png"
                            alt="Personal Lending"
                            style={{ width: '100%', borderRadius: '0.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Lending;
