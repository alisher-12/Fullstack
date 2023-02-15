import { SyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import notifyService from "../../../Services/NotifyService";
import productsService from "../../../Services/ProductsService";
import "./AddProduct.css";

function AddProduct(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<ProductModel>();

    const navigate = useNavigate();

    async function send(product: ProductModel) {
        try {
            await productsService.addProduct(product);
            notifyService.success("Product has been added");
            navigate("/products");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="AddProduct Box">

            <form onSubmit={handleSubmit(send)}>

                <h2>Add Product</h2>

                <label>Name: </label>
                <input type="text" {...register("name", {
                    required: { value: true, message: "Missing name" },
                    minLength: { value: 2, message: "Name must be minimum 2 chars" },
                    maxLength: { value: 100, message: "Name can't exceed 100 chars" }
                })} />
                <span>{formState.errors.name?.message}</span> {/* <span>{formState.errors.name && formState.errors.name.message}</span> */}

                <label>Price: </label>
                <input type="number" step="0.01" {...register("price", {
                    required: { value: true, message: "Missing price" },
                    min: { value: 0, message: "Price can't be negative" },
                    max: { value: 1000, message: "Price can't exceed 1000" },
                })} />
                <span>{formState.errors.price?.message}</span>

                <label>Stock: </label>
                <input type="number" {...register("stock", {
                    required: { value: true, message: "Missing stock" },
                    min: { value: 0, message: "Stock can't be negative" },
                    max: { value: 10000, message: "Stock can't exceed 10,000" },
                })} />
                <span>{formState.errors.stock?.message}</span>

                <label>Image: </label>
                <input type="file" accept="image/*" {...register("image")} />

                <button>Add</button>

            </form>

        </div>
    );
}

export default AddProduct;
