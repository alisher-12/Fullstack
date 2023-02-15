import BestSeller from "../BestSeller/BestSeller";
import Clock from "../Clock/Clock";
import Sale from "../Sale/Sale";
import "./Home.css";

function Home(): JSX.Element {
    return (
        <div className="Home">

            {/* Props */}
            <Sale category="Beverages" percent={10} />
            <Sale category="Candies" percent={20} />

            {/* State */}
            <BestSeller />

            {/* useEffect */}
            <Clock />

        </div>
    );
}

export default Home;
