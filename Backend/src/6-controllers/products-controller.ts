import express, { NextFunction, Request, Response } from "express";
import ProductModel from "../4-models/product-model";
import productsLogic from "../5-logic/products-logic";

const router = express.Router();

// GET http://localhost:3001/api/products
router.get("/api/products", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const products = await productsLogic.getAllProducts();
        response.json(products);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:3001/api/products/:id
router.get("/api/products/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const product = await productsLogic.getOneProduct(id);
        response.json(product);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:3001/api/products
router.post("/api/products", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const product = new ProductModel(request.body);
        const addedProduct = await productsLogic.addProduct(product);
        response.status(201).json(addedProduct);
    }
    catch (err: any) {
        next(err);
    }
});

// PUT http://localhost:3001/api/products/:id
router.put("/api/products/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        request.body.id = id;
        const product = new ProductModel(request.body);
        const updatedProduct = await productsLogic.updateProduct(product);
        response.json(updatedProduct);
    }
    catch (err: any) {
        next(err);
    }
});

// DELETE http://localhost:3001/api/products/:id
router.delete("/api/products/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await productsLogic.deleteProduct(id);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;
