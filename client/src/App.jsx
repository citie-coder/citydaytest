import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import AdminPaymentMethods from './pages/AdminPaymentMethods';
import Deposit from './pages/Deposit';
import Withdraw from './pages/Withdraw';
import History from './pages/History';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

import SetPin from './pages/SetPin';
import PinGuard from './components/PinGuard';

// New Pages
import CreditCards from './pages/CreditCards';
import Lending from './pages/Lending';
import Investing from './pages/Investing';
import WealthManagement from './pages/WealthManagement';
import Checking from './pages/Banking/Checking';
import Savings from './pages/Banking/Savings';
import Overview from './pages/Banking/Overview';
import CDS from './pages/Banking/CDS';
import IRAs from './pages/Banking/IRAs';
import Rates from './pages/Banking/Rates';
import SmallBusiness from './pages/Banking/SmallBusiness';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="forgot-password" element={<ForgotPassword />} />
                    <Route path="reset-password" element={<ResetPassword />} />

                    {/* Protected Routes with PinGuard */}
                    <Route path="set-pin" element={<SetPin />} />

                    <Route path="dashboard" element={
                        <PinGuard>
                            <Dashboard />
                        </PinGuard>
                    } />
                    <Route path="profile" element={
                        <PinGuard>
                            <Profile />
                        </PinGuard>
                    } />
                    <Route path="deposit" element={
                        <PinGuard>
                            <Deposit />
                        </PinGuard>
                    } />
                    <Route path="withdraw" element={
                        <PinGuard>
                            <Withdraw />
                        </PinGuard>
                    } />
                    <Route path="history" element={
                        <PinGuard>
                            <History />
                        </PinGuard>
                    } />

                    <Route path="admin" element={<AdminDashboard />} />
                    <Route path="admin/payment-methods" element={<AdminPaymentMethods />} />

                    {/* New Routes */}
                    <Route path="credit-cards" element={<CreditCards />} />
                    <Route path="lending" element={<Lending />} />
                    <Route path="investing" element={<Investing />} />
                    <Route path="wealth-management" element={<WealthManagement />} />

                    <Route path="banking/checking" element={
                        <PinGuard>
                            <Checking />
                        </PinGuard>
                    } />
                    <Route path="banking/savings" element={
                        <PinGuard>
                            <Savings />
                        </PinGuard>
                    } />
                    <Route path="banking/overview" element={
                        <PinGuard>
                            <Overview />
                        </PinGuard>
                    } />
                    <Route path="banking/cds" element={
                        <PinGuard>
                            <CDS />
                        </PinGuard>
                    } />
                    <Route path="banking/iras" element={
                        <PinGuard>
                            <IRAs />
                        </PinGuard>
                    } />
                    <Route path="banking/rates" element={
                        <PinGuard>
                            <Rates />
                        </PinGuard>
                    } />
                    <Route path="banking/small-business" element={
                        <PinGuard>
                            <SmallBusiness />
                        </PinGuard>
                    } />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
