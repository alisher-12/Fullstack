import { useState } from "react";
import "./BestSeller.css";

function BestSeller(): JSX.Element {

    //...

    // Create best seller name as a component state: 
    const nameArr = useState<string>(); // 1. call useState and get an array - always having only two items.
    const bestSellerName = nameArr[0]; // 2. Take first value from array - this is the state variable.
    const setBestSellerName = nameArr[1]; // 3. Take second value from array - this is a function for changing the state + rerendering the component.

    //... AJAX...

    // Create best seller items as a component state (using destructuring assignment): 
    const [bestSellerItems, setBestSellerItems] = useState<number>();

    //...

    function showBestSeller(): void { // Demo for getting the best seller supplier from the backend

        // Change the state + rerender the component:
        setBestSellerName("Exotic Liquids");
        setBestSellerItems(17);

    }

    //...

    return (
        <div className="BestSeller Box">
            <button onClick={showBestSeller}>Show Best Seller</button>
            <span>Best Seller Name: {bestSellerName}, Total Items: {bestSellerItems}</span>
        </div>
    );
}

export default BestSeller;
