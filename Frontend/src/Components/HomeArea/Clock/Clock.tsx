import { useEffect, useState } from "react";
import "./Clock.css";

function Clock(): JSX.Element {

    // State for time: 
    const [time, setTime] = useState<string>("");

    // Run code once: 
    useEffect(() => {
        
        // Create a one second timer: 
        window.setInterval(() => {

            // Set current time into state: 
            const now = new Date();
            const currentTime = now.toLocaleTimeString();
            setTime(currentTime);

        }, 1000);

    }, []); // [] --> run useEffect once

    return (
        <div className="Clock Box">
            <span>{time}</span>
        </div>
    );
}

export default Clock;
