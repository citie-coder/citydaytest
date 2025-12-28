import { useState, useEffect } from "react";
import axios from "axios";
import {
    ArrowDownLeft,
    ArrowUpRight,
    CreditCard,
    Send,
    Plus,
    History,
    ChevronRight,
    Wallet,
    TrendingUp,
    Bell,
    Eye,
    EyeOff,
    DollarSign,
    Activity,
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showBalance, setShowBalance] = useState(true);

    const token = localStorage.getItem("token");

    const fetchData = async () => {
        try {
            const res = await axios.get("/api/user/dashboard", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(res.data.user);
            setTransactions(res.data.transactions);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [token]);

    if (loading)
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-3">
                    <div className="animate-spin rounded-full h-10 w-10 border-3 border-slate-200 border-t-blue-600"></div>
                    <p className="text-slate-600 font-medium text-sm">Loading...</p>
                </div>
            </div>
        );

    if (!user)
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <p className="text-slate-600">Please log in to view your dashboard.</p>
            </div>
        );

    return (
        <div className="min-h-screen  bg-slate-50">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3 pr-3">
                            <div className=" w-9 h-9 p-3 bg-blue-600 rounded-lg flex items-center justify-center">
                                <Wallet className="text-white " size={20} />
                            </div>
                            <h1 className="text-lg font-bold text-slate-900 hidden sm:block">Wallet</h1>
                        </div>

                        <div className="flex items-center gap-3">
                            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600">
                                <Bell size={20} />
                            </button>
                            <Link to="/profile" className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm hover:bg-blue-700 transition-colors">
                                {(user.firstName?.[0] || user.email?.[0] || "U").toUpperCase()}
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-900 mb-1">
                        Welcome back, {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.firstName || "User"}! 👋
                    </h2>
                    <p className="text-sm text-slate-600">Here's your financial overview</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
                        <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="text-blue-100 text-xs font-medium mb-1">Total Balance</p>
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-3xl font-bold">
                                            {showBalance ? `$${user.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}` : "••••••"}
                                        </h3>
                                        <button
                                            onClick={() => setShowBalance(!showBalance)}
                                            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                                        >
                                            {showBalance ? <Eye size={18} /> : <EyeOff size={18} />}
                                        </button>
                                    </div>
                                </div>
                                <div className="bg-white/10 p-3 rounded-lg">
                                    <DollarSign size={24} />
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="px-2 py-1 bg-green-500/20 text-green-100 rounded text-xs font-medium flex items-center gap-1">
                                    <TrendingUp size={12} />
                                    +2.5%
                                </span>
                                <span className="text-blue-100 text-xs">vs last month</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 border border-slate-200">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-slate-600 text-xs font-medium mb-1">Transactions</p>
                                <h3 className="text-2xl font-bold text-slate-900">{transactions.length}</h3>
                            </div>
                            <div className="bg-blue-50 p-3 rounded-lg">
                                <Activity size={20} className="text-blue-600" />
                            </div>
                        </div>
                        <p className="text-xs text-slate-500">Total this month</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <Link to="/deposit" className="bg-white rounded-lg p-4 border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all group">
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <div className="bg-emerald-50 p-2.5 rounded-lg group-hover:scale-110 transition-transform">
                                        <Plus className="text-emerald-600" size={20} />
                                    </div>
                                    <span className="font-medium text-slate-700 text-sm">Deposit</span>
                                </div>
                            </Link>
                            <Link to="/withdraw" className="bg-white rounded-lg p-4 border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all group">
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <div className="bg-rose-50 p-2.5 rounded-lg group-hover:scale-110 transition-transform">
                                        <Send className="text-rose-600" size={20} />
                                    </div>
                                    <span className="font-medium text-slate-700 text-sm">Withdraw</span>
                                </div>
                            </Link>
                            <Link to="/history" className="bg-white rounded-lg p-4 border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all group">
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <div className="bg-blue-50 p-2.5 rounded-lg group-hover:scale-110 transition-transform">
                                        <History className="text-blue-600" size={20} />
                                    </div>
                                    <span className="font-medium text-slate-700 text-sm">History</span>
                                </div>
                            </Link>
                            <Link to="/credit-cards" className="bg-white rounded-lg p-4 border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all group">
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <div className="bg-violet-50 p-2.5 rounded-lg group-hover:scale-110 transition-transform">
                                        <CreditCard className="text-violet-600" size={20} />
                                    </div>
                                    <span className="font-medium text-slate-700 text-sm">Cards</span>
                                </div>
                            </Link>
                        </div>

                        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
                                <h3 className="text-lg font-bold text-slate-900">Recent Activity</h3>
                                <Link to="/history" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
                                    View All <ChevronRight size={16} />
                                </Link>
                            </div>
                            <div className="divide-y divide-slate-100">
                                {transactions.slice(0, 5).map((tx) => (
                                    <div key={tx._id} className="px-5 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${tx.type === "deposit" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
                                                {tx.type === "deposit" ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900 capitalize text-sm">{tx.type}</p>
                                                <p className="text-xs text-slate-500">
                                                    {new Date(tx.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className={`text-sm font-semibold ${tx.type === "deposit" ? "text-emerald-600" : "text-slate-900"}`}>
                                                {tx.type === "deposit" ? "+" : "-"}${tx.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                                            </p>
                                            <span className={`text-xs ${tx.status === "approved" ? "text-emerald-600" : tx.status === "declined" ? "text-rose-600" : "text-yellow-600"}`}>
                                                {tx.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                {transactions.length === 0 && (
                                    <div className="px-5 py-12 text-center">
                                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                            <Activity size={20} className="text-slate-400" />
                                        </div>
                                        <p className="text-slate-600 font-medium text-sm">No transactions yet</p>
                                        <p className="text-xs text-slate-500 mt-1">Your activity will appear here</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-xl border border-slate-200 p-5">
                            <h3 className="text-base font-bold text-slate-900 mb-4">Account Info</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-600 text-sm">Account Number</span>
                                    <span className="font-medium text-slate-900 text-sm font-mono">{user.accountNumber}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-600 text-sm">Status</span>
                                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-medium">Active</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-600 text-sm">Member Since</span>
                                    <span className="font-medium text-slate-900 text-sm">
                                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'N/A'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-600 text-sm">Account Type</span>
                                    <span className="font-medium text-slate-900 text-sm">Premium</span>
                                </div>
                                <div className="pt-2 border-t border-slate-200">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-slate-600 text-sm">Address</span>
                                        <span className="font-medium text-slate-900 text-sm">{user.address || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl p-5 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
                            <div className="relative">
                                <div className="bg-white/20 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                                    <TrendingUp size={20} />
                                </div>
                                <h3 className="text-lg font-bold mb-2">Upgrade to Platinum</h3>
                                <p className="text-purple-100 mb-4 text-sm">Get 2% cash back and exclusive benefits.</p>
                                <button className="w-full bg-white text-purple-700 font-medium py-2 rounded-lg hover:bg-purple-50 transition-all text-sm">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
