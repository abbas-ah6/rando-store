"use client";

import axiosInstance from "@/utils/axios";
import { useState } from "react";

type ProductForm = {
    name: string;
    price: string;
    img: string;
    description: string;
};

export default function AddProductForm() {
    const [form, setForm] = useState<ProductForm>({
        name: "",
        price: "",
        img: "",
        description: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        if (!form.name || !form.price || !form.img) {
            setMessage("Please fill in all required fields.");
            setLoading(false);
            return;
        }

        if (Number(form.price) < 0) {
            setMessage("Price cannot be less then zero.");
            setLoading(false);
            return;
        }

        try {
            const { data } = await axiosInstance.post("/products", {
                name: form.name,
                price: Number(form.price),
                img: form.img,
                description: form.description,
            });

            setMessage(`Product added successfully (ID: ${data.id})`);
            setForm({ name: "", price: "", img: "", description: "" });
        } catch (error: any) {
            const msg =
                error?.response?.data?.message || "Error submitting the form. Please try again.";
            setMessage(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {message && (
                <p
                    className={`mb-4 text-sm font-medium text-purple-500 
                        }`}
                >
                    {message}
                </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
                <div>
                    <label htmlFor="name" className="block font-semibold mb-1">
                        Product Name *
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="price" className="block font-semibold mb-1">
                        Price ($) *
                    </label>
                    <input
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={form.price}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="img" className="block font-semibold mb-1">
                        Image URL * (Make sure image url is from unsplash.com)
                    </label>
                    <input
                        id="img"
                        name="img"
                        type="text"
                        value={form.img}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block font-semibold mb-1">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={3}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-purple-700 w-full cursor-pointer text-white px-4 py-2 rounded hover:bg-purple-600 ease-in-out transition-colors duration-500 disabled:opacity-50"
                >
                    {loading ? "Adding..." : "Add Product"}
                </button>
            </form>
        </>
    );
}
