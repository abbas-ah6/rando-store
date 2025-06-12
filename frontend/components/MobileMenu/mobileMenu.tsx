'use client';

import { useState } from 'react';
import Link from 'next/link';
import CartButton from '../CartButton/cartButton';

type MobileMenuProps = {
    links: { href: string; label: string }[];
};

const MobileMenu: React.FC<MobileMenuProps> = ({ links }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="flex items-center gap-4">
                <CartButton />
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-purple-800 focus:outline-none cursor-pointer transition-transform duration-300 ease-in-out"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        {isOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>
            </div>

            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden absolute left-0 w-full bg-white border-t border-gray-100 px-6 py-4 z-50 shadow-2xl ${
                    isOpen ? 'max-h-[500px] opacity-100 top-[10%]' : 'max-h-0 opacity-0 top-[10%]'
                }`}
            >
                <nav className="flex flex-col space-y-3">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="text-gray-800 hover:text-purple-700 font-medium transition-colors duration-300"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </>
    );
};

export default MobileMenu;
