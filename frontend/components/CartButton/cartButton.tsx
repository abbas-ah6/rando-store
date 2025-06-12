'use client';

import React from 'react';
import { ShoppingCart } from 'lucide-react';
import useCart from '@/hooks/useCart';

const CartButton = () => {
    const { totalItems, toggleCart } = useCart();

    return (
        <button
            onClick={() => toggleCart(true)}
            className="relative cursor-pointer"
            aria-label="Toggle Cart"
            title="Toggle Cart"
        >
            <ShoppingCart className="w-6 h-6 text-purple-800 hover:text-purple-700 transition" />
            {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                    {totalItems}
                </span>
            )}
        </button>
    );
};

export default CartButton;
