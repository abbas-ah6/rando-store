import CustomLink from '@/components/CustomLink/customLink';
import React from 'react';
import Image from 'next/image';

const Hero: React.FC<THero> = ({ heading, subHeading, links, banner }) => {
    return (
        <section className="container mx-auto flex flex-col items-center justify-center text-center px-6 py-12 mt-8">
            <div className="flex flex-col justify-center items-center text-center w-full">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 max-w-3xl text-gray-800">
                    {heading}
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-700/85 mb-6 max-w-2xl text-balance">
                    {subHeading}
                </p>

                {links && links.length > 0 && (
                    <div className="flex justify-center flex-wrap gap-4 mb-6">
                        {links.map((link, index) => (
                            <CustomLink key={index} {...link} />
                        ))}
                    </div>
                )}

                {banner?.src && (
                    <div className="mt-6 w-full max-w-5xl aspect-[2/1] relative">
                        <Image
                            src={banner.src}
                            alt={banner.fileName || 'Hero Banner'}
                            fill
                            className="rounded-lg object-cover"
                            sizes="(max-width: 768px) 100vw, 80vw"
                            priority
                        />
                    </div>
                )}
            </div>
        </section>
    );
};

export default Hero;
