import React from 'react';
import Link from 'next/link';

const gradientColors = [
    'from-orange-400 to-orange-500',
    'from-purple-400 to-purple-500',
    'from-green-400 to-green-500',
];

const LinkCards: React.FC<TLinkCards> = ({ heading, subHeading, cards }) => {
    return (
        <section className="container mx-auto px-4 py-12">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>
                <p className="text-lg text-gray-600">{subHeading}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {cards.map((card, index) => (
                    <Link
                        key={index}
                        href={card.link.href}
                        className={`block rounded-lg p-6 text-white shadow-md transition-transform duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl bg-gradient-to-b ${gradientColors[index % gradientColors.length]}`}
                    >
                        <div className="flex flex-col h-full">
                            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                            <p className="mb-4">{card.shortDescription}</p>
                            <span className="mt-auto">→ {card.link.label}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default LinkCards;
