const CounterComponent = (props) => {
    return (
        <>
            <div style={{ backgroundColor: "grey", display: "flex", justifyContent: "center"}}>
                <h1>{props.number}</h1>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <button onClick={props.increment}>+</button>
                <button onClick={props.decrement}>-</button>
            </div>
        </>
    )
}

export default CounterComponent;