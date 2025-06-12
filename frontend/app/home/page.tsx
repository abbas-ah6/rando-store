import { heroSectionData, linkCardsData, productsSectionData } from '@/data/HomePageData';
import Hero from '@/sections/Hero/hero';
import LinkCards from '@/sections/LinkCards/linkCards';
import Products from '@/sections/Products/products';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Welcome to RandoStore – Quality Products, Seamless Shopping",
    description: "Explore top-quality products with a smooth shopping experience at RandoStore. Discover deals, enjoy secure checkout, and fast delivery.",
    icons: {
        icon: '/favicon.png',
    },
};


const Home = () => {
    return (
        <>
            <Hero {...heroSectionData} />
            <LinkCards {...linkCardsData} />
            <Products {...productsSectionData} />
        </>
    )
}

export default Home;
