import React from 'react';
import { Briefcase, Users, FileText, ChevronRight } from 'lucide-react';

const WealthManagement = () => {
    const services = [
        {
            title: "Private Banking",
            icon: <Briefcase size={48} />,
            description: "Exclusive banking services tailored to your unique lifestyle and needs."
        },
        {
            title: "Estate Planning",
            icon: <FileText size={48} />,
            description: "Preserve and transfer your wealth effectively to future generations."
        },
        {
            title: "Family Office",
            icon: <Users size={48} />,
            description: "Comprehensive management of your family's financial affairs."
        }
    ];

    return (
        <div className="page-content">
            {/* Hero Section */}
            <div style={{ backgroundColor: '#001529', color: 'white', padding: '4rem 0', position: 'relative', overflow: 'hidden', minHeight: '500px', display: 'flex', alignItems: 'center' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'url(/images/wealth-hero.png) center/cover', opacity: 0.3 }}></div>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ maxWidth: '700px' }}>
                        <span style={{ color: 'var(--citi-light-blue)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '0.5rem' }}>Citi Private Client</span>
                        <h1 style={{ fontFamily: 'serif', fontSize: '3.5rem', fontWeight: '300', marginBottom: '1.5rem', lineHeight: 1.1 }}>
                            Preserving your legacy for generations.
                        </h1>
                        <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9, fontWeight: '300' }}>
                            Expert guidance and personalized strategies for high-net-worth individuals and families.
                        </p>
                        <button className="btn" style={{ backgroundColor: 'white', color: '#001529', padding: '1rem 2rem', fontSize: '1.1rem', display: 'inline-block' }}>
                            Schedule a Consultation
                        </button>
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <div style={{ padding: '4rem 0', backgroundColor: 'var(--white)' }}>
                <div className="container">
                    <h2 className="text-center" style={{ fontSize: '2rem', color: 'var(--citi-blue)', marginBottom: '1rem' }}>
                        Holistic Wealth Management
                    </h2>
                    <p className="text-center" style={{ maxWidth: '600px', margin: '0 auto 4rem', color: '#666' }}>
                        We take a comprehensive approach to managing your wealth, considering every aspect of your financial life.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {services.map((service, index) => (
                            <div key={index} className="card text-center" style={{ padding: '2.5rem' }}>
                                <div style={{ width: '64px', height: '64px', backgroundColor: '#f0f7fa', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--citi-blue)', margin: '0 auto 1.5rem' }}>
                                    {service.icon}
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#333' }}>{service.title}</h3>
                                <p style={{ color: '#666', marginBottom: '1.5rem' }}>{service.description}</p>
                                <a href="#" style={{ color: 'var(--citi-blue)', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center' }}>
                                    Learn More <ChevronRight size={16} style={{ marginLeft: '4px' }} />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WealthManagement;
