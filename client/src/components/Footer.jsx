import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#333', color: '#fff', paddingTop: '4rem', paddingBottom: '2rem' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                    <div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#fff' }}>Why Citi</h4>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '0.8rem' }}><Link to="#" style={{ color: '#ccc', textDecoration: 'none' }}>Our Story</Link></li>
                            <li style={{ marginBottom: '0.8rem' }}><Link to="#" style={{ color: '#ccc', textDecoration: 'none' }}>Careers</Link></li>
                            <li style={{ marginBottom: '0.8rem' }}><Link to="#" style={{ color: '#ccc', textDecoration: 'none' }}>Benefits & Services</Link></li>
                            <li style={{ marginBottom: '0.8rem' }}><Link to="#" style={{ color: '#ccc', textDecoration: 'none' }}>Rewards</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#fff' }}>Wealth Management</h4>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '0.8rem' }}><Link to="#" style={{ color: '#ccc', textDecoration: 'none' }}>Citigold® Private Client</Link></li>
                            <li style={{ marginBottom: '0.8rem' }}><Link to="#" style={{ color: '#ccc', textDecoration: 'none' }}>Citigold®</Link></li>
                            <li style={{ marginBottom: '0.8rem' }}><Link to="#" style={{ color: '#ccc', textDecoration: 'none' }}>Citi Priority</Link></li>
                            <li style={{ marginBottom: '0.8rem' }}><Link to="#" style={{ color: '#ccc', textDecoration: 'none' }}>Citi Alliance</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#fff' }}>Business Banking</h4>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '0.8rem' }}><Link to="#" style={{ color: '#ccc', textDecoration: 'none' }}>Small Business Accounts</Link></li>
                            <li style={{ marginBottom: '0.8rem' }}><Link to="#" style={{ color: '#ccc', textDecoration: 'none' }}>Commercial Banking</Link></li>
                            <li style={{ marginBottom: '0.8rem' }}><Link to="#" style={{ color: '#ccc', textDecoration: 'none' }}>Corporate & Investment</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#fff' }}>Help & Support</h4>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '0.8rem' }}><Link to="#" style={{ color: '#ccc', textDecoration: 'none' }}>Contact Us</Link></li>
                            <li style={{ marginBottom: '0.8rem' }}><Link to="#" style={{ color: '#ccc', textDecoration: 'none' }}>Help & FAQs</Link></li>
                            <li style={{ marginBottom: '0.8rem' }}><Link to="#" style={{ color: '#ccc', textDecoration: 'none' }}>Security Center</Link></li>
                            <li style={{ marginBottom: '0.8rem' }}><Link to="#" style={{ color: '#ccc', textDecoration: 'none' }}>Accessibility</Link></li>
                        </ul>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid #555', paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="flex justify-between items-center" style={{ flexWrap: 'wrap', gap: '1rem' }}>
                        <div className="flex gap-4">
                            <Link to="#" style={{ color: '#fff' }}><Facebook size={24} /></Link>
                            <Link to="#" style={{ color: '#fff' }}><Twitter size={24} /></Link>
                            <Link to="#" style={{ color: '#fff' }}><Instagram size={24} /></Link>
                            <Link to="#" style={{ color: '#fff' }}><Linkedin size={24} /></Link>
                            <Link to="#" style={{ color: '#fff' }}><Youtube size={24} /></Link>
                        </div>
                        <div style={{ fontSize: '0.9rem', color: '#ccc' }}>
                            <Link to="#" style={{ marginRight: '1.5rem', color: '#ccc', textDecoration: 'none' }}>Terms & Conditions</Link>
                            <Link to="#" style={{ marginRight: '1.5rem', color: '#ccc', textDecoration: 'none' }}>Privacy</Link>
                            <Link to="#" style={{ marginRight: '1.5rem', color: '#ccc', textDecoration: 'none' }}>Notice at Collection</Link>
                            <Link to="#" style={{ color: '#ccc', textDecoration: 'none' }}>CA Privacy Hub</Link>
                        </div>
                    </div>

                    <div style={{ fontSize: '0.8rem', color: '#999', lineHeight: '1.5' }}>
                        <p style={{ marginBottom: '0.5rem' }}>
                            Citigroup.com is the global source of information about and access to financial services provided by the Citigroup family of companies.
                        </p>
                        <p style={{ marginBottom: '0.5rem' }}>
                            Copyright © 2024 Citigroup Inc. All rights reserved.
                        </p>
                        <p>
                            Citi, Citibank, Citi and Arc Design used herein are service marks of Citigroup Inc., Citibank (South Dakota), N.A., or their affiliates, used and registered throughout the world.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
