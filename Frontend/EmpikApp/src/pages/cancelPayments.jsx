import {useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {Commet} from "react-loading-indicators";


function CancelPayment() {
    const navigate = useNavigate();

    useEffect( () => {
        navigate("/shopping_cart");
    }, []);


    return(
        <div>
            <Commet color="#32cd32" size="medium" text="" textColor=""/>
        </div>
    );
}

export default CancelPayment;
