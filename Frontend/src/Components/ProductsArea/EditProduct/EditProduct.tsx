import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import notifyService from "../../../Services/NotifyService";
import productsService from "../../../Services/ProductsService";
import "./EditProduct.css";

function EditProduct(): JSX.Element {

    const params = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, formState, setValue } = useForm<ProductModel>();

    useEffect(() => {
        const id = +params.prodId;
        productsService.getOneProduct(id)
            .then(product => {
                setValue("id", product.id);
                setValue("name", product.name);
                setValue("price", product.price);
                setValue("stock", product.stock);
            })
            .catch(err => notifyService.error(err));
    }, []);

    async function send(product: ProductModel) {
        try {
            await productsService.updateProduct(product);
            notifyService.success("Product has been updated");
            navigate("/products");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="EditProduct Box">

            <form onSubmit={handleSubmit(send)}>

                <h2>Edit Product</h2>

                {/* Product ID: */}
                <input type="hidden" {...register("id")} />

                <label>Name: </label>
                <input type="text" {...register("name", {
                    required: { value: true, message: "Missing name" },
                    minLength: { value: 2, message: "Name must be minimum 2 chars" },
                    maxLength: { value: 100, message: "Name can't exceed 100 chars" }
                })} />
                <span>{formState.errors.name?.message}</span>

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

                <button>Update</button>

            </form>

        </div>
    );
}

export default EditProduct;
