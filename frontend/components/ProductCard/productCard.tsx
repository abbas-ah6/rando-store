import { BASE_URL } from '@/utils/constants';
import Image from 'next/image';
import React from 'react';
import AddToCartButton from '../AddToCartButton/addToCartButton';

const ProductCard: React.FC<TProductCardProps> = ({ product }) => {
    return (
        <div className="border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out bg-white">
            <div className="relative w-full aspect-square overflow-hidden rounded-t-lg">
                <Image
                    src={`${BASE_URL}/${product.img}`}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority={false}
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-gray-700 font-medium">${product.price}</p>
                <AddToCartButton product={product} />
            </div>
        </div>
    );
};


export default ProductCard;
