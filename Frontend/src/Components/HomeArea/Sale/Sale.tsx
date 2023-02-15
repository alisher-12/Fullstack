import "./Sale.css";

interface SaleProps {
    category: string;
    percent: number;
}

function Sale(props: SaleProps): JSX.Element {
    return (
        <div className="Sale Box">
			<span> 💲 Sale 💰 {props.percent}% discount on all {props.category} ❗</span>
        </div>
    );
}

export default Sale;
