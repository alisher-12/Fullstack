import { createStore } from "redux";
import ProductModel from "../Models/ProductModel";

// 1. State - This is the data:
export class ProductsState {
    public products: ProductModel[] = []; // Our global data.
}

// 2. Action Type - List of actions we can do on the above state
export enum ProductsActionType {
    FetchProducts = "FetchProducts", // Fetch all products from backend
    AddProduct = "AddProduct", // Add new product
    UpdateProduct = "UpdateProduct", // Update existing product
    DeleteProduct = "DeleteProduct" // Delete existing product
}

// 3. Action - Object for describing a single operation on the state: 
export interface ProductsAction {
    type: ProductsActionType; // Which operation we're going to do
    payload: any; // Which data we're sending
}

// 4. Reducer - function which performs the needed operation:
export function productsReducer(currentState = new ProductsState(), action: ProductsAction): ProductsState {

    const newState = { ...currentState }; // We must duplicate the original object

    // Do the change on the newState: 
    switch (action.type) {

        case ProductsActionType.FetchProducts: // Here payload must be all products fetched from the server
            newState.products = action.payload; // Set all fetched products to the state
            break;

        case ProductsActionType.AddProduct: // Here payload must be the product to add
            newState.products.push(action.payload); // Add the new product to the state
            break;

        case ProductsActionType.UpdateProduct: // Here payload must be the product to update
            const indexToUpdate = newState.products.findIndex(p => p.id === action.payload.id); // -1 if not exist
            if (indexToUpdate >= 0) {
                newState.products[indexToUpdate] = action.payload; // Update
            }
            break;

        case ProductsActionType.DeleteProduct: // Here payload must be id to delete
            const indexToDelete = newState.products.findIndex(p => p.id === action.payload); // -1 if not exist
            if (indexToDelete >= 0) {
                newState.products.splice(indexToDelete, 1); // Delete
            }
            break;
    }

    return newState; // return the new state
}

// 5. Store - redux object for managing the global state:
export const productsStore = createStore(productsReducer);
