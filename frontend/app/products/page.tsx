import { heroSectionData, productsPageSectionData } from '@/data/ProductsPageData';
import Hero from '@/sections/Hero/hero';
import Products from '@/sections/Products/products';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Browse Products – Affordable & Reliable | RandoStore",
    description: "View our complete range of high-quality and affordable products. Find what you need with ease and shop securely with RandoStore.",
    icons: {
        icon: '/favicon.png',
    },
};


const ProductsPage = () => {
    return (
        <>
            <Hero {...heroSectionData} />
            <Products {...productsPageSectionData} />
        </>
    )
}

export default ProductsPage;