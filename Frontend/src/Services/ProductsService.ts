import axios from "axios";
import ProductModel from "../Models/ProductModel";
import { productsStore, ProductsAction, ProductsActionType } from "../Redux/ProductsState";

class ProductsService {

    // Get all products from backend:
    public async getAllProducts(): Promise<ProductModel[]> {

        // Take products resides in redux global state:
        let products = productsStore.getState().products;

        // If we have no products in global state - fetch them from server:
        if (products.length === 0) {

            // Fetch all products from backend:
            const response = await axios.get<ProductModel[]>("http://localhost:3001/api/products/products");

            // Extract products from axios response:
            products = response.data;

            // Save fetched products in global state:
            const action: ProductsAction = { type: ProductsActionType.FetchProducts, payload: products };
            productsStore.dispatch(action); // Redux will call productsReducer to perform this action.

        }

        // Return products:
        return products;
    }

    // Get one product by id:
    public async getOneProduct(id: number): Promise<ProductModel> {

        // Desired product: 
        let product;

        // Take products resides in redux global state:
        let products = productsStore.getState().products;

        // If we have no products in global state - fetch given product from server:
        if (products.length === 0) {

            // Fetch one product from backend:
            const response = await axios.get<ProductModel>("http://localhost:3001/api/products/delayed/" + id);

            // Take fetched product:
            product = response.data;
        }
        else {

            // Take product from redux:
            product = products.find(p => p.id === id);
        }

        // Return product:
        return product;
    }

    // Add new product: 
    public async addProduct(product: ProductModel): Promise<void> {

        // Convert ProductModel into FormData because we need to send text + image:
        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("price", product.price.toString());
        formData.append("stock", product.stock.toString());
        formData.append("image", product.image[0]);

        // Send product to backend: 
        const response = await axios.post<ProductModel>("http://localhost:3001/api/products", formData);
        const addedProduct: ProductModel = response.data;

        // Send added product to redux global state: 
        const action: ProductsAction = { type: ProductsActionType.AddProduct, payload: addedProduct };
        productsStore.dispatch(action); // Redux will call productsReducer to perform this action.
    }

    // Update product: 
    public async updateProduct(product: ProductModel): Promise<void> {

        // Convert ProductModel into FormData because we need to send text + image:
        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("price", product.price.toString());
        formData.append("stock", product.stock.toString());
        formData.append("image", product.image[0]);

        // Send product to backend: 
        const response = await axios.put<ProductModel>("http://localhost:3001/api/products/" + product.id, formData);
        const updatedProduct = response.data;

        // Send updated product to redux global state:
        const action: ProductsAction = { type: ProductsActionType.UpdateProduct, payload: updatedProduct };
        productsStore.dispatch(action); // Redux will call productsReducer to perform this action.
    }

    // Delete product: 
    public async deleteProduct(id: number): Promise<void> {

        // Delete this product in backend: 
        await axios.delete("http://localhost:3001/api/products/" + id);

        // Delete this product also in redux global state: 
        const action: ProductsAction = { type: ProductsActionType.DeleteProduct, payload: id };
        productsStore.dispatch(action); // Redux will call productsReducer to perform this action.
    }

}

const productsService = new ProductsService();

export default productsService;
