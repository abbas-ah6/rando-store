import AddProductForm from "@/components/AddProductForm/addProductForm";

export const metadata = {
    title: "Add Product - RandoStore",
    description: "Add new products to RandoStore",
};

export default function AddProductPage() {
    return (
        <main className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">Add Product</h1>
            <AddProductForm />
        </main>
    );
}
