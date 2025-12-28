import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Users, Briefcase } from 'lucide-react';

const SmallBusiness = () => {
    return (
        <div className="page-content">
            {/* Hero Section */}
            <div style={{ background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', color: 'white', padding: '6rem 0' }}>
                <div className="container">
                    <div style={{ maxWidth: '700px' }}>
                        <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '1.5rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                            Banking built for business.
                        </h1>
                        <p style={{ fontSize: '1.5rem', marginBottom: '2rem', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                            Solutions to help you manage cash flow, finance growth, and streamline operations.
                        </p>
                        <Link to="/register" className="btn" style={{ backgroundColor: 'var(--citi-light-blue)', color: 'white', padding: '1rem 2rem', fontSize: '1.1rem', display: 'inline-block' }}>
                            Open a Business Account
                        </Link>
                    </div>
                </div>
            </div>

            {/* Solutions Grid */}
            <div style={{ padding: '5rem 0', backgroundColor: 'var(--white)' }}>
                <div className="container">
                    <h2 className="text-center" style={{ fontSize: '2.5rem', color: 'var(--citi-blue)', marginBottom: '4rem' }}>
                        Business Solutions
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                        <div className="text-center">
                            <div style={{ backgroundColor: 'var(--gray-100)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                <Building2 size={40} color="var(--citi-blue)" />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--citi-blue)' }}>Business Checking</h3>
                            <p style={{ color: '#666', lineHeight: 1.6 }}>Flexible accounts designed to grow with your business. Enjoy fee waivers and digital tools.</p>
                        </div>

                        <div className="text-center">
                            <div style={{ backgroundColor: 'var(--gray-100)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                <Briefcase size={40} color="var(--citi-blue)" />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--citi-blue)' }}>Lending & Credit</h3>
                            <p style={{ color: '#666', lineHeight: 1.6 }}>Access capital when you need it with lines of credit, term loans, and business credit cards.</p>
                        </div>

                        <div className="text-center">
                            <div style={{ backgroundColor: 'var(--gray-100)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                <Users size={40} color="var(--citi-blue)" />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--citi-blue)' }}>Cash Management</h3>
                            <p style={{ color: '#666', lineHeight: 1.6 }}>Optimize your cash flow with merchant services, payroll solutions, and wire transfers.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div style={{ backgroundColor: 'var(--citi-blue)', color: 'white', padding: '4rem 0' }}>
                <div className="container flex items-center justify-between" style={{ flexWrap: 'wrap', gap: '2rem' }}>
                    <div style={{ flex: 1, minWidth: '300px' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Partner with a dedicated specialist.</h2>
                        <p style={{ opacity: 0.9, fontSize: '1.1rem' }}>Our business relationship managers are here to help you navigate your financial journey.</p>
                    </div>
                    <div>
                        <button className="btn btn-outline" style={{ borderColor: 'white', color: 'white', padding: '1rem 2rem' }}>
                            Contact Us
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SmallBusiness;
