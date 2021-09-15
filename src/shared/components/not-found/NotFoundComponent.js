import React from "react";
import { useLocation } from "react-router";

const NotFoundComponent = () => {
    const location = useLocation();
    return(
        <>
            <h1>Not Found {location.pathname}</h1>
        </>
    );
}

export default NotFoundComponent;