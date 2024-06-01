import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import PATH from "../paths.jsx";


export default function Profile() {

    useEffect( () => {

    }, [])



    return(
        <div>
            <button>Dane profilu</button>
            <Link to={PATH.ORDER_HISTORY}>
                <button>Historia zamówień</button>
            </Link>
        </div>
    );
}
