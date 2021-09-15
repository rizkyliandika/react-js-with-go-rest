import { useState } from "react"
import CounterComponent from "./CounterComponent";

const CounterContainer = () => {
    const [number, setNumber] = useState(0);

    const handleIncrementNumber = () => {
        setNumber(number + 1);
    }

    const handleDecrementNumber = () => {
        setNumber(number - 1);
    }

    return (
        <>
            <CounterComponent number={number} increment={handleIncrementNumber} decrement={handleDecrementNumber} />
        </>
    )


}

export default CounterContainer;