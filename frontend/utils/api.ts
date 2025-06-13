import axiosInstance from "./axios";

export const getAllProducts = async () => {
    const res = await axiosInstance.get('/api/products');
    return res.data;
};

export const getProductById = async (id: string | number) => {
    const res = await axiosInstance.get(`/api/products/${id}`);
    return res.data;
};

export const createProduct = async (product: {
    name: string;
    price: number;
    img: string;
}) => {
    const res = await axiosInstance.post('/api/products', product);
    return res.data;
};

export const updateProduct = async (
    id: string | number,
    product: { id: number; name: string; price: string; img: string }
) => {
    const res = await axiosInstance.put(`/api/products/${id}`, product);
    return res.data;
};

export const deleteProduct = async (id: string | number) => {
    const res = await axiosInstance.delete(`/api/product/${id}`);
    return res.data;
};

export const searchProducts = async (query: string) => {
    const res = await axiosInstance.get('/api/products/search', {
        params: { query }
    })

    return res.data;
}
