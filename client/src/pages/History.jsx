import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowDownLeft, ArrowUpRight, Search, Filter, Download } from 'lucide-react';

const History = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, deposit, withdraw
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await axios.get('http://api.cityday2.avaxverse.com/api/user/dashboard', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // Assuming the dashboard endpoint returns all transactions for now. 
                // In a real app, we'd want a dedicated paginated endpoint.
                setTransactions(res.data.transactions);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchTransactions();
    }, [token]);

    const filteredTransactions = transactions.filter(tx => {
        if (filter === 'all') return true;
        return tx.type === filter;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center text-slate-600 hover:text-slate-900 transition-colors font-medium"
                    >
                        <ArrowLeft size={18} className="mr-2" />
                        Back to Dashboard
                    </button>
                    <h1 className="text-2xl font-bold text-slate-900">Transaction History</h1>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
                    {/* Toolbar */}
                    <div className="px-6 py-4 border-b border-slate-200/60 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gradient-to-r from-slate-50 to-white">
                        <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
                            <button
                                onClick={() => setFilter('all')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'all' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setFilter('deposit')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'deposit' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
                            >
                                Deposits
                            </button>
                            <button
                                onClick={() => setFilter('withdraw')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'withdraw' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
                            >
                                Withdrawals
                            </button>
                        </div>

                        <div className="flex gap-2">
                            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
                                <Filter size={16} />
                                Filter
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
                                <Download size={16} />
                                Export
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Type</th>
                                    <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Date</th>
                                    <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Reference</th>
                                    <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                                    <th scope="col" className="px-6 py-3.5 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="animate-spin rounded-full h-8 w-8 border-3 border-slate-200 border-t-blue-600"></div>
                                                <p>Loading transactions...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredTransactions.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-slate-500">No transactions found matching your criteria.</td>
                                    </tr>
                                ) : (
                                    filteredTransactions.map((tx) => (
                                        <tr key={tx._id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className={`flex-shrink-0 h-10 w-10 rounded-xl flex items-center justify-center ${tx.type === 'deposit' ? 'bg-gradient-to-br from-emerald-100 to-green-50 text-emerald-600' : 'bg-gradient-to-br from-rose-100 to-red-50 text-rose-600'}`}>
                                                        {tx.type === 'deposit' ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                                                    </div>
                                                    <div className="ml-3">
                                                        <div className="text-sm font-semibold text-slate-900 capitalize">{tx.type}</div>
                                                        <div className="text-xs text-slate-500">{tx.methodName || 'Bank Transfer'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                                {new Date(tx.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                                <div className="text-xs text-slate-400">{new Date(tx.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                                <span className="font-mono text-xs bg-slate-100 px-2.5 py-1 rounded-lg">{tx._id.slice(-8).toUpperCase()}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2.5 py-1 inline-flex text-xs font-medium rounded-lg 
                                                    ${tx.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                                                        tx.status === 'declined' ? 'bg-rose-100 text-rose-700' :
                                                            'bg-yellow-100 text-yellow-700'}`}>
                                                    {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className={`px-6 py-4 whitespace-nowrap text-right text-sm font-semibold ${tx.type === 'deposit' ? 'text-emerald-600' : 'text-slate-900'}`}>
                                                {tx.type === 'deposit' ? '+' : '-'}${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination (Mock) */}
                    <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-slate-600">
                                    Showing <span className="font-semibold">1</span> to <span className="font-semibold">{filteredTransactions.length}</span> of <span className="font-semibold">{filteredTransactions.length}</span> results
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-lg shadow-sm gap-2" aria-label="Pagination">
                                    <button className="relative inline-flex items-center px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all">
                                        Previous
                                    </button>
                                    <button className="relative inline-flex items-center px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all">
                                        Next
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default History;
