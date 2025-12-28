import { Link } from 'react-router-dom';
import { CreditCard, Landmark, DollarSign, TrendingUp, ChevronRight, Smartphone, ShieldCheck, Gift } from 'lucide-react';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div>
            {/* Hero Section */}
            <section style={{
                background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(/images/hero-bg.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '6rem 0',
                position: 'relative',
                minHeight: '600px',
                display: 'flex',
                alignItems: 'center'
            }}>
                <div className="container flex justify-between items-center" style={{ position: 'relative', zIndex: 10, flexWrap: 'wrap', gap: '2rem' }}>
                    <div style={{ maxWidth: '600px', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        <h1 style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                            Bank your way, <br />every day.
                        </h1>
                        <p style={{ fontSize: '1.25rem', marginBottom: '2rem', fontWeight: '500' }}>
                            Enjoy a seamless banking experience with our award-winning mobile app and online tools.
                        </p>
                        <div className="flex gap-4">
                            <Link to="/register" className="btn" style={{ backgroundColor: 'var(--citi-light-blue)', color: 'white', padding: '1rem 2rem', fontSize: '1.1rem', border: 'none' }}>Open an Account</Link>
                            <Link to="/banking/overview" className="btn btn-outline" style={{ borderColor: 'white', color: 'white', padding: '1rem 2rem', fontSize: '1.1rem' }}>Learn More</Link>
                        </div>
                    </div>

                    {/* Login Box (Floating) */}
                    <div className="card" style={{ width: '100%', maxWidth: '400px', borderTop: '4px solid var(--citi-blue)', padding: '2rem', backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(5px)' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--citi-blue)' }}>Sign On</h2>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="input-group">
                                <label className="input-label">User ID</label>
                                <input type="text" className="input-field" placeholder="User ID" />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Password</label>
                                <input type="password" className="input-field" placeholder="Password" />
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label className="flex items-center gap-2" style={{ fontSize: '0.9rem', color: '#666' }}>
                                    <input type="checkbox" /> Remember User ID
                                </label>
                            </div>
                            <Link to="/login" className="btn btn-primary w-full text-center" style={{ display: 'block' }}>Sign On</Link>
                            <div className="mt-4 text-center" style={{ fontSize: '0.9rem' }}>
                                <Link to="/register" style={{ color: 'var(--citi-light-blue)', fontWeight: '600' }}>Register</Link>
                                <span style={{ margin: '0 0.5rem', color: '#ccc' }}>|</span>
                                <a href="#" style={{ color: 'var(--citi-light-blue)', fontWeight: '600' }}>Forgot User ID/Password?</a>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* Promotional Banner */}
            <section style={{ backgroundColor: 'var(--citi-blue)', color: 'white', padding: '1.5rem 0' }}>
                <div className="container flex justify-between items-center" style={{ flexWrap: 'wrap', gap: '1rem' }}>
                    <div className="flex items-center gap-3">
                        <div style={{ backgroundColor: 'white', padding: '0.5rem', borderRadius: '50%', color: 'var(--citi-blue)' }}>
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <span style={{ fontWeight: 'bold', fontSize: '1.1rem', display: 'block' }}>Earn 4.30% APY</span>
                            <span style={{ fontSize: '0.9rem', opacity: 0.9 }}>On your savings with a High Yield Savings account.</span>
                        </div>
                    </div>
                    <Link to="/banking/savings" className="flex items-center gap-1" style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none' }}>
                        Start Saving <ChevronRight size={20} />
                    </Link>
                </div>
            </section>

            {/* Features Grid */}
            <section style={{ padding: '5rem 0', backgroundColor: 'var(--white)' }}>
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 style={{ fontSize: '2.5rem', color: 'var(--citi-blue)', marginBottom: '1rem' }}>Why Choose Us?</h2>
                        <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '700px', margin: '0 auto' }}>
                            We provide financial solutions that fit your lifestyle, from everyday banking to long-term wealth management.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem', marginTop: '3rem' }}>
                        <FeatureCard
                            icon={<CreditCard size={48} color="var(--citi-light-blue)" />}
                            title="Credit Cards"
                            desc="Find the perfect card for your needs, whether you want cash back, travel rewards, or a low interest rate."
                            link="/credit-cards"
                        />
                        <FeatureCard
                            icon={<Landmark size={48} color="var(--citi-light-blue)" />}
                            title="Checking Accounts"
                            desc="Enjoy fee-free checking options with access to thousands of ATMs nationwide."
                            link="/banking/checking"
                        />
                        <FeatureCard
                            icon={<DollarSign size={48} color="var(--citi-light-blue)" />}
                            title="Personal Loans"
                            desc="Get the funds you need for your next big project or consolidation with competitive rates."
                            link="/lending"
                        />
                        <FeatureCard
                            icon={<TrendingUp size={48} color="var(--citi-light-blue)" />}
                            title="Investing"
                            desc="Take control of your financial future with our easy-to-use investment platforms."
                            link="/investing"
                        />
                    </div>
                </div>
            </section>

            {/* Mobile Banking Section - Wealth Management Style */}
            <section style={{ backgroundColor: '#001529', color: 'white', padding: '5rem 0', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'url(/images/mobile-banking.png) center/cover', opacity: 0.1 }}></div>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5rem', flexWrap: 'wrap' }}>
                        <div style={{ flex: '1 1 400px' }}>
                            <span style={{ color: 'var(--citi-light-blue)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '0.5rem' }}>Digital Banking</span>
                            <h2 style={{ fontFamily: 'serif', fontSize: '3rem', fontWeight: '300', marginBottom: '1.5rem', lineHeight: 1.2 }}>
                                Banking in the palm of your hand.
                            </h2>
                            <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.9, lineHeight: 1.6 }}>
                                The Mobile Banking App gives you a fast, simple and secure way to bank. Manage your accounts, pay bills, deposit checks and more, all from your mobile device.
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                                    <ShieldCheck size={24} color="var(--citi-light-blue)" />
                                    <span style={{ fontSize: '1.05rem' }}>Secure biometric login</span>
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                                    <Smartphone size={24} color="var(--citi-light-blue)" />
                                    <span style={{ fontSize: '1.05rem' }}>Mobile check deposit</span>
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Gift size={24} color="var(--citi-light-blue)" />
                                    <span style={{ fontSize: '1.05rem' }}>Exclusive offers and deals</span>
                                </li>
                            </ul>
                            <button className="btn" style={{ backgroundColor: 'white', color: '#001529', padding: '1rem 2rem', fontSize: '1.1rem' }}>Download the App</button>
                        </div>
                        <div style={{ flex: '1 1 400px', textAlign: 'center' }}>
                            <img
                                src="/images/mobile-banking.png"
                                alt="Mobile Banking"
                                style={{ maxWidth: '100%', borderRadius: '0.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Security & Trust Section */}
            <section style={{ padding: '5rem 0', backgroundColor: 'var(--white)' }}>
                <div className="container">
                    <div className="text-center" style={{ marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontFamily: 'serif', color: '#001529', marginBottom: '1rem' }}>Your security is our priority</h2>
                        <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '700px', margin: '0 auto' }}>
                            Bank with confidence knowing your money and information are protected by industry-leading security measures.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                        <div className="card text-center" style={{ padding: '3rem', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                            <div style={{ width: '80px', height: '80px', backgroundColor: '#f0f7fa', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--citi-blue)', margin: '0 auto 2rem' }}>
                                <ShieldCheck size={40} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333', fontFamily: 'serif' }}>FDIC Insured</h3>
                            <p style={{ color: '#666', lineHeight: 1.6 }}>Your deposits are insured up to $250,000 by the FDIC, giving you peace of mind.</p>
                        </div>

                        <div className="card text-center" style={{ padding: '3rem', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                            <div style={{ width: '80px', height: '80px', backgroundColor: '#f0f7fa', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--citi-blue)', margin: '0 auto 2rem' }}>
                                <ShieldCheck size={40} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333', fontFamily: 'serif' }}>256-bit Encryption</h3>
                            <p style={{ color: '#666', lineHeight: 1.6 }}>Bank-level encryption protects your data and transactions at all times.</p>
                        </div>

                        <div className="card text-center" style={{ padding: '3rem', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                            <div style={{ width: '80px', height: '80px', backgroundColor: '#f0f7fa', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--citi-blue)', margin: '0 auto 2rem' }}>
                                <ShieldCheck size={40} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333', fontFamily: 'serif' }}>Fraud Protection</h3>
                            <p style={{ color: '#666', lineHeight: 1.6 }}>24/7 monitoring and $0 liability for unauthorized transactions on your accounts.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Customer Testimonials Section */}
            <section style={{ padding: '5rem 0', backgroundColor: '#f8f9fa' }}>
                <div className="container">
                    <div className="text-center" style={{ marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontFamily: 'serif', color: '#001529', marginBottom: '1rem' }}>What our customers say</h2>
                        <p style={{ fontSize: '1.1rem', color: '#666' }}>Join millions of satisfied customers who trust us for their banking needs.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        <div className="card" style={{ padding: '2.5rem', backgroundColor: 'white', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                            <div style={{ color: '#FFB800', marginBottom: '1rem', fontSize: '1.2rem' }}>★★★★★</div>
                            <p style={{ color: '#666', marginBottom: '1.5rem', lineHeight: 1.6, fontStyle: 'italic' }}>
                                "The mobile app is incredibly user-friendly. I can manage all my accounts, pay bills, and even deposit checks without visiting a branch."
                            </p>
                            <div style={{ borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                                <p style={{ fontWeight: 'bold', color: '#333', marginBottom: '0.25rem' }}>Sarah Johnson</p>
                                <p style={{ fontSize: '0.9rem', color: '#999' }}>Customer since 2019</p>
                            </div>
                        </div>

                        <div className="card" style={{ padding: '2.5rem', backgroundColor: 'white', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                            <div style={{ color: '#FFB800', marginBottom: '1rem', fontSize: '1.2rem' }}>★★★★★</div>
                            <p style={{ color: '#666', marginBottom: '1.5rem', lineHeight: 1.6, fontStyle: 'italic' }}>
                                "Excellent customer service and competitive rates. The rewards on my credit card have saved me hundreds of dollars."
                            </p>
                            <div style={{ borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                                <p style={{ fontWeight: 'bold', color: '#333', marginBottom: '0.25rem' }}>Michael Chen</p>
                                <p style={{ fontSize: '0.9rem', color: '#999' }}>Customer since 2017</p>
                            </div>
                        </div>

                        <div className="card" style={{ padding: '2.5rem', backgroundColor: 'white', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                            <div style={{ color: '#FFB800', marginBottom: '1rem', fontSize: '1.2rem' }}>★★★★★</div>
                            <p style={{ color: '#666', marginBottom: '1.5rem', lineHeight: 1.6, fontStyle: 'italic' }}>
                                "I've been banking here for over a decade. Their wealth management services have helped me grow my investments significantly."
                            </p>
                            <div style={{ borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                                <p style={{ fontWeight: 'bold', color: '#333', marginBottom: '0.25rem' }}>Emily Rodriguez</p>
                                <p style={{ fontSize: '0.9rem', color: '#999' }}>Customer since 2012</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call-to-Action Section */}
            <section style={{ backgroundColor: '#001529', color: 'white', padding: '5rem 0', textAlign: 'center' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h2 style={{ fontFamily: 'serif', fontSize: '3rem', fontWeight: '300', marginBottom: '1.5rem', lineHeight: 1.2 }}>
                        Ready to get started?
                    </h2>
                    <p style={{ fontSize: '1.2rem', marginBottom: '2.5rem', opacity: 0.9 }}>
                        Open your account today and experience banking that works for you.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/register" className="btn" style={{ backgroundColor: 'white', color: '#001529', padding: '1rem 2.5rem', fontSize: '1.1rem', display: 'inline-block' }}>
                            Open an Account
                        </Link>
                        <Link to="/banking/overview" className="btn" style={{ backgroundColor: 'transparent', color: 'white', border: '2px solid white', padding: '1rem 2.5rem', fontSize: '1.1rem', display: 'inline-block' }}>
                            Explore Products
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

const FeatureCard = ({ icon, title, desc, link }) => (
    <div className="card hover-effect" style={{ padding: '2.5rem', textAlign: 'center', transition: 'transform 0.3s ease' }}>
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>{icon}</div>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--citi-blue)' }}>{title}</h3>
        <p style={{ color: '#666', marginBottom: '1.5rem', lineHeight: 1.6 }}>{desc}</p>
        <Link to={link} style={{ color: 'var(--citi-light-blue)', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            Learn More <ChevronRight size={16} />
        </Link>
    </div>
);

export default Home;
