'use client';

import ProductCard from '@/components/ProductCard/productCard';
import React, { useEffect, useState } from 'react';
import CustomLink from '@/components/CustomLink/customLink';
import { getAllProducts, searchProducts } from '@/utils/api';
import { SearchInput } from '@/components/SearchBar/searchBar';

const Products: React.FC<TProductsList> = ({ heading, subHeading, showAllProducts }) => {
    const [products, setProducts] = useState<TProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState<string>('');

    async function fetchProducts() {
        try {
            const res = await getAllProducts();
            const formatted = Object.values(res) as TProduct[];
            setProducts(formatted);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const displayedProducts = showAllProducts
        ? products
        : products.slice(0, 3);

    const handleSearch = async () => {

        if (!searchQuery.trim()) {
            fetchProducts()
        }

        try {
            const products = await searchProducts(searchQuery);
            setProducts(products);
        } catch (error) {
            console.error('Failed to search products:', error)
        }
    }

    const handleClearSearch = () => {
        setSearchQuery('')
        fetchProducts();
    }

    return (
        <section id='products-list' className="container mx-auto px-[30px] py-12">
            <div className='flex lg:flex-row flex-col mb-10 w-full justify-between gap-3.5 items-center'>
                <div className="lg:text-start text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>
                    <p className="text-lg text-gray-600">{subHeading}</p>
                </div>

                <SearchInput
                    value={searchQuery}
                    handleSearch={handleSearch}
                    onChange={({ target }) => {
                        setSearchQuery(target.value)
                    }}
                    onClearSearch={handleClearSearch}
                />
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
