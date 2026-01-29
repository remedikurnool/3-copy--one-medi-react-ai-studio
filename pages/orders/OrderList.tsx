
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/AuthProvider';
import { useMyOrders } from '../../hooks';
import { NoOrdersState } from '../../components/ui/EmptyState'; // Assuming this exists or will create generic

const OrderStatusBadge = ({ status }: { status: string }) => {
    const getStatusColor = () => {
        switch (status) {
            case 'confirmed': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'pending': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'shipped': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            case 'delivered': return 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary';
            case 'cancelled': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
        }
    };

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${getStatusColor()}`}>
            {status}
        </span>
    );
};

export default function OrderList() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { orders, loading, error, refetch } = useMyOrders(user?.id);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-bg-light dark:bg-bg-dark p-4 flex flex-col gap-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 animate-pulse h-32"></div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-bg-light dark:bg-bg-dark p-4 flex items-center justify-center">
                <div className="text-center">
                    <span className="material-symbols-outlined text-4xl text-red-500 mb-2">error</span>
                    <p className="text-gray-600 dark:text-gray-400">Failed to load orders.</p>
                    <button onClick={refetch} className="text-primary font-bold mt-2">Try Again</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark pb-24 font-sans text-slate-900 dark:text-white">
            <header className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center gap-3">
                <button
                    onClick={() => navigate(-1)}
                    className="size-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                    <span className="material-symbols-outlined text-slate-700 dark:text-slate-200">arrow_back</span>
                </button>
                <h1 className="text-lg font-bold">My Orders</h1>
            </header>

            <div className="p-4 flex flex-col gap-4">
                {orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="size-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-4xl text-gray-400">shopping_bag</span>
                        </div>
                        <h3 className="text-lg font-bold mb-1">No orders yet</h3>
                        <p className="text-sm text-gray-500 mb-6">Start shopping for your medicines and lab tests.</p>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/30"
                        >
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    orders.map((order) => (
                        <div
                            key={order.id}
                            onClick={() => navigate(`/orders/${order.id}`)}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 active:scale-[0.99] transition-transform cursor-pointer"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex gap-3 items-center">
                                    <div className="size-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined text-xl">
                                            {order.prescription_url ? 'description' : 'shopping_bag'}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm">Order #{order.id.slice(0, 8).toUpperCase()}</h3>
                                        <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">
                                            {formatDate(order.created_at)}
                                        </p>
                                    </div>
                                </div>
                                <OrderStatusBadge status={order.status} />
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t border-dashed border-gray-100 dark:border-gray-700">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Total Amount</span>
                                    <span className="font-bold text-base">₹{order.final_amount}</span>
                                </div>
                                <div className="flex items-center gap-1 text-primary text-xs font-bold">
                                    View Details
                                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
