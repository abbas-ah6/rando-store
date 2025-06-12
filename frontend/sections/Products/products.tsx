'use client';

import ProductCard from '@/components/ProductCard/productCard';
import axiosInstance from '@/utils/axios';
import React, { useEffect, useState } from 'react';
import CustomLink from '@/components/CustomLink/customLink';

const Products: React.FC<TProductsList> = ({ heading, subHeading, showAllProducts }) => {
    const [products, setProducts] = useState<TProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await axiosInstance.get('/products');
                const formatted = Object.values(res.data) as TProduct[];
                setProducts(formatted);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    const displayedProducts = showAllProducts
        ? products
        : products.slice(0, 3);

    return (
        <section id='products-list' className="container mx-auto px-[30px] py-12">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>
                <p className="text-lg text-gray-600">{subHeading}</p>
            </div>

            {loading ? (
                <p className="text-center">Loading products...</p>
            ) : (
                <>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {displayedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {!showAllProducts && (
                        <div className="text-center mt-8">
                            <CustomLink href='/products' label='See All Products' />
                        </div>
                    )}
                </>
            )}
        </section>
    );
};

export default Products;
