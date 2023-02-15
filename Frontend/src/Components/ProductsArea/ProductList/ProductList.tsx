import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import notifyService from "../../../Services/NotifyService";
import productsService from "../../../Services/ProductsService";
import Loading from "../../SharedArea/Loading/Loading";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";

function ProductList(): JSX.Element {

    // Products State: 
    const [products, setProducts] = useState<ProductModel[]>([]);

    // AJAX Side Effect: 
    useEffect(() => {

        // Get products from server: 
        productsService.getAllProducts()
            .then(products => setProducts(products))
            .catch(err => notifyService.error(err));

    }, []);

    return (
        <div className="ProductList">

            <NavLink to="/products/new">➕</NavLink>

            {products.length === 0 && <Loading />}

            {products.map(p => <ProductCard key={p.id} product={p} />)}

        </div>
    );
}

export default ProductList;
