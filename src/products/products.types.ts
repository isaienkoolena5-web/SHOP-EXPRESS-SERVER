export interface Product {
    id: string;
    title: string;
    description: string;
    price: string;
    stock: number;
    category: "cosmetics" | "clothing";
    createdAt: string;
}