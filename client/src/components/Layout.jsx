import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
                <Outlet />
            </main>
            <footer style={{ backgroundColor: 'var(--citi-blue)', color: 'white', padding: '2rem 0', marginTop: 'auto' }}>
                <div className="container text-center">
                    <p>&copy; 2024 Citi Banking Platform. All rights reserved.</p>
                    <p style={{ fontSize: '0.875rem', opacity: 0.8, marginTop: '0.5rem' }}>
                        Terms & Conditions | Privacy | Security
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
