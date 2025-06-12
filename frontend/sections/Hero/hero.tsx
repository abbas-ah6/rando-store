import CustomLink from '@/components/CustomLink/customLink';
import React from 'react';
import Image from 'next/image';

const Hero: React.FC<THero> = ({ heading, subHeading, links, banner }) => {
    return (
        <section className="container mx-auto flex flex-col items-center justify-center text-center min-h-[60vh] px-[30px] py-[60px] mt-[34px]">
            <div className="flex flex-col justify-center items-center text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-3xl text-gray-800">{heading}</h1>
                <p className="text-lg md:text-xl text-gray-700/85 mb-6 max-w-3xl text-balance">{subHeading}</p>
                {links && links.length > 0 && (
                    <div className="flex justify-center flex-wrap gap-4 mb-6">
                        {links.map((link, index) => (
                            <CustomLink key={index} {...link} />
                        ))}
                    </div>
                )}

                {banner?.src && (
                    <div className="mt-6 flex justify-center relative max-w-[1080px] w-[1080px] max-h-[550px] h-[550px]">
                        <Image
                            src={banner.src}
                            alt={banner.fileName || 'Hero Banner'}
                            fill
                            className="rounded-lg object-cover w-full h-full"
                        />
                    </div>
                )}
            </div>
        </section>
    );
};

export default Hero;
