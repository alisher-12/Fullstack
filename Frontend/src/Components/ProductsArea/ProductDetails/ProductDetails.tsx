import { Fragment, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import notifyService from "../../../Services/NotifyService";
import productsService from "../../../Services/ProductsService";
import Loading from "../../SharedArea/Loading/Loading";
import "./ProductDetails.css";

function ProductDetails(): JSX.Element {

    // Getting all route parameters: 
    const params = useParams();

    // Navigate method:
    const navigate = useNavigate();

    // State for the single product: 
    const [product, setProduct] = useState<ProductModel>();

    useEffect(() => {

        // Getting product id from the route: 
        const id = +params.prodId;

        productsService.getOneProduct(id)
            .then(product => setProduct(product))
            .catch(err => notifyService.error(err));

    }, []);

    async function deleteProduct() {
        try {

            const iAmSure = window.confirm("Are you sure you want to delete this product?");
            if (!iAmSure) return;

            await productsService.deleteProduct(product.id);
            notifyService.success("Product has been deleted");
            navigate("/products");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="ProductDetails">

            { !product && <Loading /> }

            {
                product &&
                <>
                    <h3>Name: {product.name}</h3>
                    <h3>Price: ${product.price}</h3>
                    <h3>Stock: {product.stock}</h3>

                    <br />
                    <br />

                    <img src={"http://localhost:3001/api/products/images/" + product.imageName} />

                    <br />
                    <br />

                    <NavLink to="/products">Back</NavLink>

                    <span> | </span>

                    <NavLink to={"/products/edit/" + product.id}>Edit</NavLink>

                    <span> | </span>

                    <NavLink to="" onClick={deleteProduct}>Delete</NavLink>

                </>

            }

        </div>
    );
}

export default ProductDetails;
