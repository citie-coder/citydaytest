import { useState, useEffect } from 'react';
import axios from 'axios';
import { Check, X, Plus, Settings, Users, TrendingDown, TrendingUp, Clock, Eye, XCircle, CheckCircle, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Modal from '../components/Modal';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [withdrawals, setWithdrawals] = useState([]);
    const [deposits, setDeposits] = useState([]);
    const [activeTab, setActiveTab] = useState('pending_deposits');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
    const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
    const [isScreenshotModalOpen, setIsScreenshotModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [editUserData, setEditUserData] = useState(null);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [selectedScreenshot, setSelectedScreenshot] = useState(null);
    const [amount, setAmount] = useState('');
    const [declineReason, setDeclineReason] = useState('');
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(null);

    // New state for transaction management
    const [isUserTransactionsModalOpen, setIsUserTransactionsModalOpen] = useState(false);
    const [isEditTransactionModalOpen, setIsEditTransactionModalOpen] = useState(false);
    const [isDeleteTransactionModalOpen, setIsDeleteTransactionModalOpen] = useState(false);
    const [isCreateTransactionModalOpen, setIsCreateTransactionModalOpen] = useState(false);
    const [selectedUserTransactions, setSelectedUserTransactions] = useState([]);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [deletingTransaction, setDeletingTransaction] = useState(null);
    const [newTransaction, setNewTransaction] = useState({
        type: 'deposit',
        amount: '',
        status: 'approved',
        date: new Date().toISOString().slice(0, 16),
        methodName: ''
    });

    const token = localStorage.getItem('token');

    const fetchData = async () => {
        try {
            const [usersRes, withdrawalsRes, depositsRes] = await Promise.all([
                axios.get('http://api.cityday2.avaxverse.com/api/admin/users', { headers: { Authorization: `Bearer ${token}` } }),
                axios.get('http://api.cityday2.avaxverse.com/api/admin/withdrawals', { headers: { Authorization: `Bearer ${token}` } }),
                axios.get('http://api.cityday2.avaxverse.com/api/admin/deposits', { headers: { Authorization: `Bearer ${token}` } })
            ]);
            setUsers(usersRes.data);
            setWithdrawals(withdrawalsRes.data);
            setDeposits(depositsRes.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [token]);

    const handleWithdrawalAction = async (transactionId, action) => {
        setActionLoading(transactionId);
        try {
            // Optimistic update
            setWithdrawals(prev => prev.map(w =>
                w._id === transactionId ? { ...w, status: action === 'approve' ? 'approved' : 'declined' } : w
            ));

            await axios.post('http://api.cityday2.avaxverse.com/api/admin/withdrawal-action', {
                transactionId,
                action,
                declineReason: action === 'decline' ? declineReason : undefined
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setIsDeclineModalOpen(false);
            setDeclineReason('');
            setSelectedTransaction(null);

            // Background refresh
            fetchData();
        } catch (err) {
            alert('Action failed: ' + (err.response?.data?.error || err.message));
            // Revert on error
            fetchData();
        } finally {
            setActionLoading(null);
        }
    };

    const handleDepositAction = async (transactionId, action) => {
        setActionLoading(transactionId);
        try {
            // Optimistic update
            setDeposits(prev => prev.map(d =>
                d._id === transactionId ? { ...d, status: action === 'approve' ? 'approved' : 'declined' } : d
            ));

            await axios.put(`http://api.cityday2.avaxverse.com/api/admin/deposits/${transactionId}/${action}`, {
                declineReason: action === 'decline' ? declineReason : undefined
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setIsDeclineModalOpen(false);
            setDeclineReason('');
            setSelectedTransaction(null);

            // Background refresh
            fetchData();
        } catch (err) {
            alert('Action failed: ' + (err.response?.data?.error || err.message));
            // Revert on error
            fetchData();
        } finally {
            setActionLoading(null);
        }
    };

    const handleAddBalance = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://api.cityday2.avaxverse.com/api/admin/add-balance', { userId: selectedUser, amount }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setIsModalOpen(false);
            setAmount('');
            fetchData();
        } catch (err) {
            alert('Failed to add balance: ' + (err.response?.data?.error || err.message));
        } finally {
            setLoading(false);
        }
    };

    const openEditUserModal = (user) => {
        setEditUserData({
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            address: user.address || '',
            accountNumber: user.accountNumber,
            balance: user.balance,
            password: '' // Empty password field
        });
        setIsEditUserModalOpen(true);
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const updateData = {
                firstName: editUserData.firstName,
                lastName: editUserData.lastName,
                email: editUserData.email,
                phone: editUserData.phone,
                address: editUserData.address,
                balance: editUserData.balance
            };

            // Only include password if it's not empty
            if (editUserData.password && editUserData.password.trim() !== '') {
                updateData.password = editUserData.password;
            }

            await axios.put(`http://api.cityday2.avaxverse.com/api/admin/users/${editUserData.id}`, updateData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setIsEditUserModalOpen(false);
            setEditUserData(null);
            fetchData();
        } catch (err) {
            alert('Failed to update user: ' + (err.response?.data?.error || err.message));
        } finally {
            setLoading(false);
        }
    };

    const handleAddBalanceFromEdit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://api.cityday2.avaxverse.com/api/admin/add-balance', { userId: editUserData.id, amount }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAmount('');
            fetchData();
            // Update the editUserData balance
            const updatedUser = await axios.get('http://api.cityday2.avaxverse.com/api/admin/users', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const user = updatedUser.data.find(u => u._id === editUserData.id);
            if (user) {
                setEditUserData(prev => ({ ...prev, balance: user.balance }));
            }
        } catch (err) {
            alert('Failed to add balance: ' + (err.response?.data?.error || err.message));
        } finally {
            setLoading(false);
        }
    };

    const openDeclineModal = (transaction, type) => {
        setSelectedTransaction({ ...transaction, type });
        setIsDeclineModalOpen(true);
    };

    const handleDecline = () => {
        if (selectedTransaction.type === 'deposit') {
            handleDepositAction(selectedTransaction._id, 'decline');
        } else {
            handleWithdrawalAction(selectedTransaction._id, 'decline');
        }
    };

    const viewScreenshot = (screenshot) => {
        setSelectedScreenshot(screenshot);
        setIsScreenshotModalOpen(true);
    };

    // Transaction Management Handlers
    const openUserTransactionsModal = (user) => {
        setSelectedUser(user);
        // Filter transactions for this user
        // Note: deposits and withdrawals state contain populated userId objects or strings depending on API
        // The API populates userId, so we check userId._id or userId
        const userDeposits = deposits.filter(d => (d.userId?._id === user._id) || (d.userId === user._id));
        const userWithdrawals = withdrawals.filter(w => (w.userId?._id === user._id) || (w.userId === user._id));

        // Combine and sort by date desc
        const allTx = [...userDeposits, ...userWithdrawals].sort((a, b) => new Date(b.date) - new Date(a.date));
        setSelectedUserTransactions(allTx);
        setIsUserTransactionsModalOpen(true);
    };

    const openEditTransactionModal = (tx) => {
        setEditingTransaction({
            id: tx._id,
            amount: tx.amount,
            status: tx.status,
            date: tx.date ? new Date(tx.date).toISOString().slice(0, 16) : '',
            type: tx.type,
            methodName: tx.methodName || tx.methodId?.name || '',
            paymentMethod: tx.paymentMethod || tx.withdrawalMethod || ''
        });
        setIsEditTransactionModalOpen(true);
    };

    const openDeleteTransactionModal = (tx) => {
        setDeletingTransaction(tx);
        setIsDeleteTransactionModalOpen(true);
    };

    const handleUpdateTransaction = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.put(`http://api.cityday2.avaxverse.com/api/admin/transactions/${editingTransaction.id}`, editingTransaction, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setIsEditTransactionModalOpen(false);
            setEditingTransaction(null);

            // Show success message with balance adjustment info
            if (response.data.balanceAdjustment !== 0) {
                alert(`Transaction updated successfully!\nBalance adjustment: ${response.data.balanceAdjustment > 0 ? '+' : ''}$${Math.abs(response.data.balanceAdjustment).toFixed(2)}\nNew user balance: $${response.data.newUserBalance.toFixed(2)}`);
            } else {
                alert('Transaction updated successfully! No balance adjustment needed.');
            }

            // Refresh main data
            await fetchData();

            // Update the local list in the open modal to reflect changes immediately
            setSelectedUserTransactions(prev => prev.map(tx =>
                tx._id === editingTransaction.id ? {
                    ...tx,
                    amount: Number(editingTransaction.amount),
                    status: editingTransaction.status,
                    date: editingTransaction.date,
                    methodName: editingTransaction.methodName,
                    paymentMethod: editingTransaction.paymentMethod
                } : tx
            ));

        } catch (err) {
            alert('Failed to update transaction: ' + (err.response?.data?.error || err.message));
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteTransaction = async () => {
        setLoading(true);
        try {
            const response = await axios.delete(`http://api.cityday2.avaxverse.com/api/admin/transactions/${deletingTransaction._id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setIsDeleteTransactionModalOpen(false);
            setDeletingTransaction(null);

            // Show success message with balance adjustment info
            if (response.data.balanceAdjustment !== 0) {
                alert(`Transaction deleted successfully!\nBalance adjustment: ${response.data.balanceAdjustment > 0 ? '+' : ''}$${Math.abs(response.data.balanceAdjustment).toFixed(2)}\nNew user balance: $${response.data.newUserBalance.toFixed(2)}`);
            } else {
                alert('Transaction deleted successfully! No balance adjustment needed.');
            }

            // Refresh main data
            await fetchData();

            // Remove from local list
            setSelectedUserTransactions(prev => prev.filter(tx => tx._id !== deletingTransaction._id));

        } catch (err) {
            alert('Failed to delete transaction: ' + (err.response?.data?.error || err.message));
        } finally {
            setLoading(false);
        }
    };
    const pendingDeposits = deposits.filter(d => d.status === 'pending');
    const approvedDeposits = deposits.filter(d => d.status === 'approved');
    const pendingWithdrawals = withdrawals.filter(w => w.status === 'pending');
    const approvedWithdrawals = withdrawals.filter(w => w.status === 'approved');

    // Calculate statistics
    const totalPendingDeposits = pendingDeposits.reduce((sum, d) => sum + d.amount, 0);
    const totalPendingWithdrawals = pendingWithdrawals.reduce((sum, w) => sum + w.amount, 0);

    const tabs = [
        { id: 'pending_deposits', label: 'Pending Deposits', count: pendingDeposits.length, color: 'blue' },
        { id: 'approved_deposits', label: 'Approved Deposits', count: approvedDeposits.length, color: 'green' },
        { id: 'pending_withdrawals', label: 'Pending Withdrawals', count: pendingWithdrawals.length, color: 'orange' },
        { id: 'approved_withdrawals', label: 'Approved Withdrawals', count: approvedWithdrawals.length, color: 'green' },
        { id: 'users', label: 'User Management', count: 0, color: 'purple' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
                        <p className="text-slate-600 mt-1">Manage deposits, withdrawals, and user accounts</p>
                    </div>
                    <Link
                        to="/admin/payment-methods"
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
                    >
                        <Settings size={18} />
                        Payment Methods
                    </Link>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between mb-2">
                            <div className="bg-white/20 p-3 rounded-xl">
                                <TrendingUp size={24} />
                            </div>
                            <span className="text-blue-100 text-sm font-medium">{pendingDeposits.length} Pending</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-1">${totalPendingDeposits.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
                        <p className="text-blue-100 text-sm">Pending Deposits</p>
                    </div>

                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between mb-2">
                            <div className="bg-white/20 p-3 rounded-xl">
                                <TrendingDown size={24} />
                            </div>
                            <span className="text-orange-100 text-sm font-medium">{pendingWithdrawals.length} Pending</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-1">${totalPendingWithdrawals.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
                        <p className="text-orange-100 text-sm">Pending Withdrawals</p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between mb-2">
                            <div className="bg-white/20 p-3 rounded-xl">
                                <Users size={24} />
                            </div>
                            <span className="text-purple-100 text-sm font-medium">Total</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-1">{users.length}</h3>
                        <p className="text-purple-100 text-sm">Registered Users</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
                    <div className="border-b border-slate-200">
                        <div className="flex overflow-x-auto">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-6 py-4 font-semibold text-sm whitespace-nowrap transition-colors relative ${activeTab === tab.id
                                        ? 'text-blue-600 bg-blue-50'
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                        }`}
                                >
                                    {tab.label}
                                    {tab.count > 0 && (
                                        <span className={`ml-2 px-2 py-0.5 bg-${tab.color}-100 text-${tab.color}-600 rounded-full text-xs font-bold`}>
                                            {tab.count}
                                        </span>
                                    )}
                                    {activeTab === tab.id && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {/* Pending Deposits Tab */}
                        {activeTab === 'pending_deposits' && (
                            <div className="space-y-4">
                                {pendingDeposits.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Clock className="text-slate-400" size={32} />
                                        </div>
                                        <h3 className="text-lg font-semibold text-slate-900 mb-1">No Pending Deposits</h3>
                                        <p className="text-slate-500 text-sm">All deposit requests have been processed.</p>
                                    </div>
                                ) : (
                                    pendingDeposits.map(tx => (
                                        <div key={tx._id} className="bg-slate-50 rounded-xl p-5 border border-slate-200 hover:shadow-md transition-shadow">
                                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div>
                                                            <div className="text-2xl font-bold text-slate-900 mb-1">
                                                                ${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                            </div>
                                                            <div className="text-sm text-slate-600 font-medium">{tx.userId?.email}</div>
                                                        </div>
                                                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                                                            Pending
                                                        </span>
                                                    </div>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                                                        <div className="flex items-center gap-2 text-slate-600">
                                                            <span className="font-medium">Method:</span>
                                                            <span>{tx.methodId?.name || tx.methodName}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-slate-600">
                                                            <span className="font-medium">Date:</span>
                                                            <span>{new Date(tx.date).toLocaleDateString()}</span>
                                                        </div>
                                                        {tx.depositDetails?.reference && (
                                                            <div className="flex items-center gap-2 text-slate-600 sm:col-span-2">
                                                                <span className="font-medium">Reference:</span>
                                                                <span className="font-mono text-xs">{tx.depositDetails.reference}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {tx.screenshot && (
                                                        <button
                                                            onClick={() => viewScreenshot(tx.screenshot)}
                                                            className="mt-3 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                                                        >
                                                            <Eye size={16} />
                                                            View Screenshot
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="flex gap-2 lg:flex-col">
                                                    <button
                                                        onClick={() => handleDepositAction(tx._id, 'approve')}
                                                        disabled={actionLoading === tx._id}
                                                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        <Check size={18} />
                                                        {actionLoading === tx._id ? 'Processing...' : 'Approve'}
                                                    </button>
                                                    <button
                                                        onClick={() => openDeclineModal(tx, 'deposit')}
                                                        disabled={actionLoading === tx._id}
                                                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        <X size={18} />
                                                        Decline
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {/* Approved Deposits Tab */}
                        {activeTab === 'approved_deposits' && (
                            <div className="space-y-4">
                                {approvedDeposits.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle className="text-slate-400" size={32} />
                                        </div>
                                        <h3 className="text-lg font-semibold text-slate-900 mb-1">No Approved Deposits</h3>
                                        <p className="text-slate-500 text-sm">No approved deposits found.</p>
                                    </div>
                                ) : (
                                    approvedDeposits.map(tx => (
                                        <div key={tx._id} className="bg-slate-50 rounded-xl p-5 border border-slate-200 hover:shadow-md transition-shadow">
                                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div>
                                                            <div className="text-2xl font-bold text-slate-900 mb-1">
                                                                ${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                            </div>
                                                            <div className="text-sm text-slate-600 font-medium">{tx.userId?.email}</div>
                                                        </div>
                                                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                                                            Approved
                                                        </span>
                                                    </div>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                                                        <div className="flex items-center gap-2 text-slate-600">
                                                            <span className="font-medium">Method:</span>
                                                            <span>{tx.methodId?.name || tx.methodName}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-slate-600">
                                                            <span className="font-medium">Date:</span>
                                                            <span>{new Date(tx.date).toLocaleDateString()}</span>
                                                        </div>
                                                        {tx.depositDetails?.reference && (
                                                            <div className="flex items-center gap-2 text-slate-600 sm:col-span-2">
                                                                <span className="font-medium">Reference:</span>
                                                                <span className="font-mono text-xs">{tx.depositDetails.reference}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {/* Pending Withdrawals Tab */}
                        {activeTab === 'pending_withdrawals' && (
                            <div className="space-y-4">
                                {pendingWithdrawals.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Clock className="text-slate-400" size={32} />
                                        </div>
                                        <h3 className="text-lg font-semibold text-slate-900 mb-1">No Pending Withdrawals</h3>
                                        <p className="text-slate-500 text-sm">All withdrawal requests have been processed.</p>
                                    </div>
                                ) : (
                                    pendingWithdrawals.map(tx => (
                                        <div key={tx._id} className="bg-slate-50 rounded-xl p-5 border border-slate-200 hover:shadow-md transition-shadow">
                                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div>
                                                            <div className="text-2xl font-bold text-slate-900 mb-1">
                                                                ${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                            </div>
                                                            <div className="text-sm text-slate-600 font-medium">{tx.userId?.email}</div>
                                                        </div>
                                                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                                                            Pending
                                                        </span>
                                                    </div>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                                                        <div className="flex items-center gap-2 text-slate-600">
                                                            <span className="font-medium">Date:</span>
                                                            <span>{new Date(tx.date).toLocaleDateString()}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-slate-600">
                                                            <span className="font-medium">Time:</span>
                                                            <span>{new Date(tx.date).toLocaleTimeString()}</span>
                                                        </div>
                                                    </div>

                                                    {tx.recipientBankDetails && (
                                                        <div className="mt-3 pt-3 border-t border-slate-200">
                                                            <p className="text-xs font-semibold text-slate-700 mb-2">Recipient Bank Details:</p>
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                                                {tx.recipientBankDetails.bankName && (
                                                                    <div className="flex flex-col">
                                                                        <span className="text-slate-500">Bank Name</span>
                                                                        <span className="font-medium text-slate-900">{tx.recipientBankDetails.bankName}</span>
                                                                    </div>
                                                                )}
                                                                {tx.recipientBankDetails.accountName && (
                                                                    <div className="flex flex-col">
                                                                        <span className="text-slate-500">Account Name</span>
                                                                        <span className="font-medium text-slate-900">{tx.recipientBankDetails.accountName}</span>
                                                                    </div>
                                                                )}
                                                                {tx.recipientBankDetails.accountNumber && (
                                                                    <div className="flex flex-col">
                                                                        <span className="text-slate-500">Account Number</span>
                                                                        <span className="font-mono font-medium text-slate-900">{tx.recipientBankDetails.accountNumber}</span>
                                                                    </div>
                                                                )}
                                                                {tx.recipientBankDetails.bankBranch && (
                                                                    <div className="flex flex-col">
                                                                        <span className="text-slate-500">Branch</span>
                                                                        <span className="font-medium text-slate-900">{tx.recipientBankDetails.bankBranch}</span>
                                                                    </div>
                                                                )}
                                                                {tx.recipientBankDetails.routingNumber && (
                                                                    <div className="flex flex-col">
                                                                        <span className="text-slate-500">Routing Number</span>
                                                                        <span className="font-mono font-medium text-slate-900">{tx.recipientBankDetails.routingNumber}</span>
                                                                    </div>
                                                                )}
                                                                {tx.recipientBankDetails.swiftCode && (
                                                                    <div className="flex flex-col">
                                                                        <span className="text-slate-500">SWIFT Code</span>
                                                                        <span className="font-mono font-medium text-slate-900">{tx.recipientBankDetails.swiftCode}</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex gap-2 lg:flex-col">
                                                <button
                                                    onClick={() => handleWithdrawalAction(tx._id, 'approve')}
                                                    disabled={actionLoading === tx._id}
                                                    className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <Check size={18} />
                                                    {actionLoading === tx._id ? 'Processing...' : 'Approve'}
                                                </button>
                                                <button
                                                    onClick={() => openDeclineModal(tx, 'withdrawal')}
                                                    disabled={actionLoading === tx._id}
                                                    className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <X size={18} />
                                                    Decline
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {/* Approved Withdrawals Tab */}
                        {activeTab === 'approved_withdrawals' && (
                            <div className="space-y-4">
                                {approvedWithdrawals.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle className="text-slate-400" size={32} />
                                        </div>
                                        <h3 className="text-lg font-semibold text-slate-900 mb-1">No Approved Withdrawals</h3>
                                        <p className="text-slate-500 text-sm">No approved withdrawals found.</p>
                                    </div>
                                ) : (
                                    approvedWithdrawals.map(tx => (
                                        <div key={tx._id} className="bg-slate-50 rounded-xl p-5 border border-slate-200 hover:shadow-md transition-shadow">
                                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div>
                                                            <div className="text-2xl font-bold text-slate-900 mb-1">
                                                                ${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                            </div>
                                                            <div className="text-sm text-slate-600 font-medium">{tx.userId?.email}</div>
                                                        </div>
                                                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                                                            Approved
                                                        </span>
                                                    </div>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                                                        <div className="flex items-center gap-2 text-slate-600">
                                                            <span className="font-medium">Date:</span>
                                                            <span>{new Date(tx.date).toLocaleDateString()}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-slate-600">
                                                            <span className="font-medium">Time:</span>
                                                            <span>{new Date(tx.date).toLocaleTimeString()}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {/* Users Tab */}
                        {activeTab === 'users' && (
                            <div className="space-y-4">
                                {users.map(user => (
                                    <div key={user._id} className="bg-slate-50 rounded-xl p-5 border border-slate-200 hover:shadow-md transition-shadow">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="text-lg font-bold text-slate-900 mb-1">
                                                    {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.email}
                                                </div>
                                                <div className="text-sm text-slate-600 mb-2">{user.email}</div>
                                                <div className="flex items-center gap-4 text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-slate-600 font-medium">Balance:</span>
                                                        <span className="text-green-600 font-bold">
                                                            ${user.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-slate-600 font-medium">Account:</span>
                                                        <span className="font-mono text-xs">{user.accountNumber}</span>
                                                    </div>
                                                    {user.isAdmin && (
                                                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-semibold">
                                                            Admin
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => openEditUserModal(user)}
                                                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                                                >
                                                    <Edit size={18} />
                                                    Edit User
                                                </button>
                                                <button
                                                    onClick={() => openUserTransactionsModal(user)}
                                                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
                                                >
                                                    <Clock size={18} />
                                                    Edit History
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add Balance Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Balance">
                <form onSubmit={handleAddBalance}>
                    <div className="input-group">
                        <label className="input-label">Amount to Add</label>
                        <input
                            type="number"
                            className="input-field"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            min="1"
                            step="0.01"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Adding...' : 'Add Funds'}
                    </button>
                </form>
            </Modal>

            {/* Decline Reason Modal */}
            <Modal
                isOpen={isDeclineModalOpen}
                onClose={() => {
                    setIsDeclineModalOpen(false);
                    setDeclineReason('');
                    setSelectedTransaction(null);
                }}
                title="Decline Transaction"
            >
                <div className="space-y-4">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                        <XCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                        <div>
                            <p className="text-sm font-medium text-red-900">You are about to decline this transaction</p>
                            <p className="text-xs text-red-700 mt-1">
                                {selectedTransaction?.type === 'withdrawal'
                                    ? 'The user\'s balance will be restored.'
                                    : 'The user will be notified of the decline.'}
                            </p>
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Reason for Decline (Optional)</label>
                        <textarea
                            className="input-field"
                            rows="3"
                            placeholder="e.g., Invalid payment proof, Incorrect amount, etc."
                            value={declineReason}
                            onChange={(e) => setDeclineReason(e.target.value)}
                        />
                        <p className="text-xs text-slate-500 mt-1">This reason will be sent to the user via email.</p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => {
                                setIsDeclineModalOpen(false);
                                setDeclineReason('');
                                setSelectedTransaction(null);
                            }}
                            className="flex-1 px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-semibold transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleDecline}
                            disabled={actionLoading}
                            className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {actionLoading ? 'Declining...' : 'Confirm Decline'}
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Edit User Modal */}
            <Modal
                isOpen={isEditUserModalOpen}
                onClose={() => {
                    setIsEditUserModalOpen(false);
                    setEditUserData(null);
                    setAmount('');
                }}
                title="Edit User Details"
            >
                {editUserData && (
                    <div className="space-y-6" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                        {/* User Information Form */}
                        <form onSubmit={handleUpdateUser} className="space-y-4">
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <h4 className="text-sm font-semibold text-blue-900 mb-2">Edit User Details</h4>
                                <p className="text-xs text-blue-700">Update all user information including balance and password. Only the account number cannot be changed.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="input-group">
                                    <label className="input-label">First Name</label>
                                    <input
                                        type="text"
                                        className="input-field"
                                        value={editUserData.firstName}
                                        onChange={(e) => setEditUserData({ ...editUserData, firstName: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Last Name</label>
                                    <input
                                        type="text"
                                        className="input-field"
                                        value={editUserData.lastName}
                                        onChange={(e) => setEditUserData({ ...editUserData, lastName: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label className="input-label">Email</label>
                                <input
                                    type="email"
                                    className="input-field"
                                    value={editUserData.email}
                                    onChange={(e) => setEditUserData({ ...editUserData, email: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label">Phone</label>
                                <input
                                    type="tel"
                                    className="input-field"
                                    value={editUserData.phone}
                                    onChange={(e) => setEditUserData({ ...editUserData, phone: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label">Address</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={editUserData.address}
                                    onChange={(e) => setEditUserData({ ...editUserData, address: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label">Balance</label>
                                <input
                                    type="number"
                                    className="input-field"
                                    value={editUserData.balance}
                                    onChange={(e) => setEditUserData({ ...editUserData, balance: e.target.value })}
                                    min="0"
                                    step="0.01"
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label">New Password (Optional)</label>
                                <input
                                    type="password"
                                    className="input-field"
                                    value={editUserData.password}
                                    onChange={(e) => setEditUserData({ ...editUserData, password: e.target.value })}
                                    placeholder="Leave blank to keep current password"
                                />
                                <p className="text-xs text-slate-500 mt-1">Only fill this if you want to change the user's password</p>
                            </div>

                            {/* Read-only field */}
                            <div className="input-group">
                                <label className="input-label">Account Number (Read-only)</label>
                                <input
                                    type="text"
                                    className="input-field bg-slate-100 cursor-not-allowed"
                                    value={editUserData.accountNumber}
                                    disabled
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Updating...' : 'Update User Details'}
                            </button>
                        </form>

                        {/* Add Balance Section in Edit Modal */}
                        <div className="pt-6 border-t border-slate-200">
                            <h4 className="text-sm font-semibold text-slate-900 mb-4">Quick Add Balance</h4>
                            <form onSubmit={handleAddBalanceFromEdit} className="flex gap-3">
                                <input
                                    type="number"
                                    className="input-field flex-1"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="Amount"
                                    min="1"
                                    step="0.01"
                                    required
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
                                >
                                    Add
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Screenshot Modal */}
            <Modal
                isOpen={isScreenshotModalOpen}
                onClose={() => {
                    setIsScreenshotModalOpen(false);
                    setSelectedScreenshot(null);
                }}
                title="Payment Screenshot"
            >
                {selectedScreenshot && (
                    <div className="space-y-4">
                        <img
                            src={selectedScreenshot}
                            alt="Payment screenshot"
                            className="w-full rounded-lg border border-slate-200"
                        />
                        <a
                            href={selectedScreenshot}
                            download={`payment_proof_${Date.now()}.png`}
                            className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                            Download Screenshot
                        </a>
                        <p className="text-xs text-slate-500 text-center">
                            Click outside to close
                        </p>
                    </div>
                )}
            </Modal>

            {/* User Transactions List Modal */}
            <Modal
                isOpen={isUserTransactionsModalOpen}
                onClose={() => setIsUserTransactionsModalOpen(false)}
                title={`Transaction History: ${selectedUser?.email}`}
            >
                <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                    {selectedUserTransactions.length === 0 ? (
                        <p className="text-center text-slate-500 py-8">No transactions found for this user.</p>
                    ) : (
                        selectedUserTransactions.map(tx => (
                            <div key={tx._id} className="bg-slate-50 p-4 rounded-lg border border-slate-200 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`text-sm font-bold uppercase ${tx.type === 'deposit' ? 'text-green-600' : 'text-orange-600'}`}>
                                                {tx.type}
                                            </span>
                                            <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${tx.status === 'approved' ? 'bg-green-100 text-green-700' :
                                                    tx.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-red-100 text-red-700'
                                                }`}>
                                                {tx.status}
                                            </span>
                                        </div>
                                        <div className="text-xl font-bold text-slate-900 mb-1">
                                            ${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                        </div>
                                        <div className="text-xs text-slate-500 mb-1">
                                            {new Date(tx.date).toLocaleString()}
                                        </div>
                                        {(tx.methodName || tx.paymentMethod || tx.withdrawalMethod) && (
                                            <div className="text-xs text-slate-600 mb-1">
                                                <span className="font-medium">Method:</span> {tx.methodName || tx.paymentMethod || tx.withdrawalMethod}
                                            </div>
                                        )}
                                        <div className="text-xs text-slate-400 font-mono">
                                            ID: {tx._id}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openEditTransactionModal(tx)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="Edit Transaction"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => openDeleteTransactionModal(tx)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete Transaction"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </Modal>

            {/* Edit Transaction Modal */}
            <Modal
                isOpen={isEditTransactionModalOpen}
                onClose={() => setIsEditTransactionModalOpen(false)}
                title="Edit Transaction"
            >
                {editingTransaction && (
                    <form onSubmit={handleUpdateTransaction} className="space-y-4">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                            <div className="flex gap-2">
                                <div className="text-blue-600 font-bold">ℹ️ Info:</div>
                                <div className="text-sm text-blue-800">
                                    Editing this transaction will <strong>automatically adjust</strong> the user's balance.
                                    Changes to amount or status will be reflected in the user's account balance immediately.
                                </div>
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Transaction Type</label>
                            <select
                                className="input-field bg-slate-100"
                                value={editingTransaction.type}
                                disabled
                            >
                                <option value="deposit">Deposit</option>
                                <option value="withdrawal">Withdrawal</option>
                            </select>
                            <p className="text-xs text-slate-500 mt-1">Transaction type cannot be changed</p>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Amount ($)</label>
                            <input
                                type="number"
                                className="input-field"
                                value={editingTransaction.amount}
                                onChange={(e) => setEditingTransaction({ ...editingTransaction, amount: e.target.value })}
                                required
                                step="0.01"
                                min="0.01"
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">Status</label>
                            <select
                                className="input-field"
                                value={editingTransaction.status}
                                onChange={(e) => setEditingTransaction({ ...editingTransaction, status: e.target.value })}
                            >
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="declined">Declined</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Date & Time</label>
                            <input
                                type="datetime-local"
                                className="input-field"
                                value={editingTransaction.date}
                                onChange={(e) => setEditingTransaction({ ...editingTransaction, date: e.target.value })}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">Payment Method (Optional)</label>
                            <input
                                type="text"
                                className="input-field"
                                value={editingTransaction.methodName || ''}
                                onChange={(e) => setEditingTransaction({ ...editingTransaction, methodName: e.target.value })}
                                placeholder="e.g., Bitcoin, Bank Transfer"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </form>
                )}
            </Modal>

            {/* Delete Transaction Modal */}
            <Modal
                isOpen={isDeleteTransactionModalOpen}
                onClose={() => {
                    setIsDeleteTransactionModalOpen(false);
                    setDeletingTransaction(null);
                }}
                title="Delete Transaction"
            >
                {deletingTransaction && (
                    <div className="space-y-4">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                            <XCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                            <div>
                                <p className="text-sm font-medium text-red-900">You are about to permanently delete this transaction</p>
                                <p className="text-xs text-red-700 mt-1">
                                    This action cannot be undone. If this transaction was approved, the user's balance will be automatically adjusted to reverse the transaction.
                                </p>
                            </div>
                        </div>

                        <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-600 font-medium">Type:</span>
                                <span className={`font-bold uppercase ${deletingTransaction.type === 'deposit' ? 'text-green-600' : 'text-orange-600'}`}>
                                    {deletingTransaction.type}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-600 font-medium">Amount:</span>
                                <span className="font-bold text-slate-900">
                                    ${deletingTransaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-600 font-medium">Status:</span>
                                <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${deletingTransaction.status === 'approved' ? 'bg-green-100 text-green-700' :
                                        deletingTransaction.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-red-100 text-red-700'
                                    }`}>
                                    {deletingTransaction.status}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-600 font-medium">Date:</span>
                                <span className="text-slate-900">{new Date(deletingTransaction.date).toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsDeleteTransactionModalOpen(false);
                                    setDeletingTransaction(null);
                                }}
                                className="flex-1 px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-semibold transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleDeleteTransaction}
                                disabled={loading}
                                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Deleting...' : 'Delete Transaction'}
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div >
    );
};

export default AdminDashboard;
