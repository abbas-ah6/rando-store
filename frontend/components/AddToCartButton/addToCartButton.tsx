import { ShoppingCart } from 'lucide-react';
import useCart from '@/hooks/useCart';

const AddToCartButton = ({ product }: { product: TProduct }) => {
    const { addItem } = useCart();

    return (
        <button
            onClick={() => addItem({ ...product, quantity: 1 })}
            className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white font-medium bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 hover:from-orange-400 hover:via-orange-500 hover:to-orange-600 duration-500 ease-in-out transition-all cursor-pointer"
        >
            <ShoppingCart size={18} />
            Add to Cart
        </button>
    );
};

export default AddToCartButton;
