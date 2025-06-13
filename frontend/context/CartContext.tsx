'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('cart');
        if (stored) setCart(JSON.parse(stored));
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addItem = (item: CartItem) => {
        setCart(prev => {
            const existing = prev.find(p => p.id === item.id);
            if (existing) {
                return prev.map(p =>
                    p.id === item.id ? { ...p, quantity: p.quantity! + 1 } : p
                );
            } else {
                return [...prev, { ...item, quantity: 1 }];
            }
        });
        setIsCartOpen(true);
    };

    const removeItem = (id: number) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const clearCart = () => setCart([]);

    const toggleCart = (open: boolean) => setIsCartOpen(open);

    const updateItemQuantity = (id: number, quantity: number) => {
        setCart(prev =>
            prev.map(item =>
                item.id == id ? { ...item, quantity: Math.max(1, quantity) } : item
            )
        );
    };

    const totalItems = cart.reduce((sum, item) => sum + item.quantity!, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity!, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addItem,
                removeItem,
                clearCart,
                totalItems,
                totalPrice,
                isCartOpen,
                toggleCart,
                updateItemQuantity
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCartContext must be used within CartProvider');
    return ctx;
};
