import { Router } from "express";
import {v7} from "uuid";
import { Product } from "../products.types";

const router = Router();

const products: Product[] = [{
    id: v7(),
    title: "Mascara",
    description: "With waterproof effect",
    price: " 15 $",
    stock: 10,
    category: "cosmetics",
    createdAt: new Date().toDateString(),
},];

// GET / products
router.get ("/", (_req, res) => {
    res.status(200).json(products);
});

// GET / products/:id
router.get ("/:id", (req, res) => {
    const {id} = req.params;
    const product = products.find((product) => product.id === id);
    if (!product) {
        res.status(404).json({ 
        error: `Product item with id ${id} not found` 
    });

    }
    
    res.status(200).json(product);
});
// POST / products
router.post ("/", (req, res) => {
    const {title, description, price, stock} = req.body;
    if (!title || !description || !price || !stock) {
        res.status(400).json({
        error: "Title, description, price and stock ara required"
    });
    }
    const newProduct: Product ={
    id: v7(),
    title,
    description,
    price,
    stock,
    category: "cosmetics",
    createdAt: new Date().toDateString(),
};
products.push(newProduct);
res.status(201).json({message: "New product is created.", id: newProduct.id });

});   

//PATCH /products/:id
router.patch("/:id", (req, res) => {
    const {id} = req.params;
    const product = products.find((product) => product.id === id);

    if (!product) {
        return res.status(404).json({ 
        error: `Product item with id ${id} not found` 
    });
    }
    
    const {title, description, price, stock} = req.body;

     if (!title && !description && !price && !stock) {
        res.status(400).json({
        error: "At least one field is required",
    });
    }
     if (title) {
        product.title = title;
     }
      if (description) {
        product.description = description;
     }

     if (price) {
        product.price = price;
     }
    if (stock) {
        product.stock = stock;
     }
     
     res.status(200).json(product)
});

// DELETE /products/:id
router.delete("/:id", (req, res) => {
    const {id} = req.params;
    const indexOfProduct = products.findIndex((product) => product.id === id);

    if (indexOfProduct === -1) {
        return res.status(404).json({ 
        error: `Product item with id ${id} not found` 

    });
}
    const deletedProduct = products[indexOfProduct];

    products.splice(indexOfProduct, 1)

    res.status(200).json({message: "Product deleted", deletedProduct});
});

export default router;