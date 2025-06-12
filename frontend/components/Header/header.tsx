import Link from 'next/link';
import React from 'react';
import CartButton from '../CartButton/cartButton';

export const Header: React.FC<THeader> = ({ storeName, links }) => {
    return (
        <header className="w-full border-b border-b-purple-400/30">
            <div className="container mx-auto py-4 flex items-center justify-between px-[30px]">
                <Link href="/">
                    <div className="flex items-center space-x-2 font-bold text-purple-800 text-4xl tracking-tighter">
                        {storeName}
                    </div>
                </Link>

                <nav className="flex items-center space-x-6">
                    {links.map((link, idx) => (
                        <Link
                            key={idx}
                            href={link.href}
                            className="text-gray-800 hover:text-purple-700 ease-in-out duration-300 transition font-medium"
                        >
                            {link.label}
                        </Link>
                    ))}

                    <CartButton />
                </nav>
            </div>
        </header>
    );
};
