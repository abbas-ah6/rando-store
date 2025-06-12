import axiosInstance from "./axios";

export const getAllProducts = async () => {
    const res = await axiosInstance.get('/items');
    return res.data;
};

export const getProductById = async (id: string | number) => {
    const res = await axiosInstance.get(`/items/${id}`);
    return res.data;
};

export const createProduct = async (product: {
    name: string;
    price: string;
    img: string;
}) => {
    const res = await axiosInstance.post('/items', product);
    return res.data;
};

export const updateProduct = async (
    id: string | number,
    product: { id: number; name: string; price: string; img: string }
) => {
    const res = await axiosInstance.put(`/items/${id}`, product);
    return res.data;
};

export const deleteProduct = async (id: string | number) => {
    const res = await axiosInstance.delete(`/items/${id}`);
    return res.data;
};
