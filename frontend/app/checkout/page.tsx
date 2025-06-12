"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { BASE_URL } from '@/utils/constants';
import { useCartContext } from '@/context/CartContext';
import Link from 'next/link';

const Checkout = () => {
    const { cart, totalPrice, clearCart } = useCartContext();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        phone: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (cart.length === 0) {
            alert('Your cart is empty');
            return;
        }

        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    cart,
                    totalPrice,
                }),
            });
            const data = await response.json();

            if (!response.ok) throw new Error(data.message);

            clearCart();
            setSubmitted(true);

        } catch (error: any) {
            setError(error.message || 'Something went wrong');
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-100 container mx-auto">
            {!submitted && (
                <section className="w-1/2 bg-white p-10 shadow-md">
                    <h2 className="text-2xl font-semibold mb-2">Delivery Information</h2>
                    {cart.length === 0 && <p className='text-red-500'>Please add items to your cart before proceeding to checkout!</p>}
                    <form onSubmit={handleSubmit} className="space-y-5 mt-6">
                        <div>
                            <label htmlFor="fullName" className="block mb-1 font-medium">
                                Full Name
                            </label>
                            <input
                                id="fullName"
                                type="text"
                                disabled={cart.length === 0 ? true : false}
                                placeholder="John Doe"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block mb-1 font-medium">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                disabled={cart.length === 0 ? true : false}
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="address" className="block mb-1 font-medium">
                                Address
                            </label>
                            <input
                                id="address"
                                type="text"
                                disabled={cart.length === 0 ? true : false}
                                placeholder="123 Main St, City, Country"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block mb-1 font-medium">
                                Phone Number
                            </label>
                            <input
                                id="phone"
                                type="tel"
                                disabled={cart.length === 0 ? true : false}
                                placeholder="+1 234 567 890"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                required
                            />
                        </div>

                        {error && <p className="text-red-500 mb-3">{error}</p>}

                        <button
                            type="submit"
                            disabled={isLoading || cart.length == 0}
                            className={`w-full py-2 px-4 rounded cursor-pointer ease-in-out transition-colors duration-300 text-white ${(isLoading || cart.length == 0) ? 'bg-gray-400' : 'bg-purple-700 hover:bg-purple-600'}`}
                        >
                            {isLoading ? 'Submitting...' : 'Place Order'}
                        </button>
                    </form>
                </section>
            )}

            {submitted ? (
                <section className="w-full bg-gray-50 p-10 shadow-inner overflow-y-auto text-center">
                    <h2 className="text-2xl font-semibold text-green-700 mb-4 mt-24">
                        Order placed successfully!
                    </h2>
                    <p className="text-gray-700 mb-8">
                        Thank you for your purchase. A confirmation email has been sent to your inbox.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link
                            className="bg-gray-800 text-white px-5 py-2 rounded hover:bg-gray-700 transition ease-in-out duration-500"
                            href={'/'}
                        >
                            Go Home Page
                        </Link>
                        <Link
                            className="bg-brand-purple text-white px-5 py-2 rounded bg-purple-700 hover:bg-purple-600 transition ease-in-out duration-500"
                            href={'/products'}
                        >
                            Explore Products
                        </Link>
                    </div>
                </section>
            ) : (
                <section className="w-1/2 bg-gray-50 p-10 shadow-inner overflow-y-auto">
                    <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

                    <div className="space-y-4">
                        {cart.length === 0 && (
                            <>
                                <p>Your cart is empty.</p>
                                <div className="flex justify-center gap-4">
                                    <Link
                                        className="bg-gray-800 text-white px-5 py-2 rounded hover:bg-gray-700 transition ease-in-out duration-500"
                                        href={'/'}
                                    >
                                        Go Home Page
                                    </Link>
                                    <Link
                                        className="bg-brand-purple text-white px-5 py-2 rounded bg-purple-700 hover:bg-purple-600 transition ease-in-out duration-500"
                                        href={'/products'}
                                    >
                                        Explore Products
                                    </Link>
                                </div>
                            </>
                        )}



                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-4 border-b border-gray-300 pb-4"
                            >
                                <div className="relative w-20 h-20 rounded overflow-hidden">
                                    <Image
                                        src={`${BASE_URL}/${item.img}`}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                                </div>
                                <p className="font-semibold">${(item.price * item.quantity!).toFixed(2)}</p>
                            </div>
                        ))}

                        {cart.length > 0 && (
                            <div className="flex justify-between mt-8 border-t pt-6 text-lg font-bold">
                                <span>Total</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                        )}
                    </div>
                </section>
            )
            }
        </div>
    );
};

export default Checkout;
