'use client';

import useCart from '@/hooks/useCart';
import Image from 'next/image';
import { X, Trash2 } from 'lucide-react';
import CustomLink from '../CustomLink/customLink';

const CartSidebar = () => {
    const {
        cart,
        removeItem,
        totalItems,
        totalPrice,
        isCartOpen,
        toggleCart,
        updateItemQuantity,
    } = useCart();

    return (
        <div
            className={`fixed top-0 left-0 h-full w-96 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
        >
            <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-bold">Your Cart</h2>
                <button className='cursor-pointer' onClick={() => toggleCart(false)}>
                    <X className="w-6 h-6" />
                </button>
            </div>

            <div className="p-4 space-y-4 overflow-y-auto max-h-[80vh]">
                {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center">
                        <Image
                            src={`http://localhost:8000${item.img}`}
                            alt={item.name}
                            width={60}
                            height={60}
                            className="rounded object-cover"
                        />
                        <div className="flex-1">
                            <h3 className="font-medium text-sm">{item.name}</h3>
                            <p className="text-sm text-gray-500">${item.price}</p>

                            <div className="flex items-center mt-2 gap-2">
                                <button
                                    onClick={() =>
                                        updateItemQuantity(item.id, item.quantity! > 1 ? item.quantity! - 1 : 1)
                                    }
                                    className="cursor-pointer px-2 py-1 text-sm border rounded hover:bg-gray-100"
                                >
                                    –
                                </button>
                                <span className="text-sm">{item.quantity}</span>
                                <button
                                    onClick={() =>
                                        updateItemQuantity(item.id, item.quantity! + 1)
                                    }
                                    className="cursor-pointer px-2 py-1 text-sm border rounded hover:bg-gray-100"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-600 transition cursor-pointer"
                            aria-label="Remove item"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                ))}
            </div>

            {totalItems == 0 && (
                <span className='p-4 text-red-500'>Your cart is empty</span>
            )}

            <div className="p-4 border-t mt-4">
                <p className="font-semibold">Total: ${totalPrice.toFixed(2)}</p>
                <p className="text-sm text-gray-500">{totalItems} item(s)</p>
            </div>

            {totalItems > 0 && (
                <div className='p-4 w-full flex'>
                    <CustomLink className='w-full text-center' href='/checkout' label='Checkout' />
                </div>
            )}

        </div>
    );
};

export default CartSidebar;
