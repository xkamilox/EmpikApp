import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import PATH from "../paths.jsx";
import axiosInstance from "../interceptors/axiosInstance.jsx";
import {Commet} from "react-loading-indicators";


export default function Profile() {
    const [favorites, setFavorites] = useState([]);
    const [isFavorites, setIsFavorites] = useState(false);

    useEffect( () => {
        const getFavorites = async() => {
            await axiosInstance.get("/favorites")
                .then(response => {
                    console.log(response.data);
                    setFavorites(response.data);
                }).catch(
                    console.log("error w pobeiraniuu ulubionych")
                )
        }
        getFavorites();
    }, [])



    return(
        <div>
            <button>Dane profilu</button>
            <Link to={PATH.ORDER_HISTORY}>
                <button>Historia zamówień</button>
            </Link>

            {
                favorites.length === 0 ? (
                    isFavorites ? (
                        <div>
                            Nie masz ulubionych
                        </div>
                    ) :
                    (
                        <div>
                             <Commet color="#32cd32" size="medium" text="" textColor=""/>
                        </div>
                    )
                ) :
                (
                   favorites.map(favorite => (
                       <div key={favorite.name}>
                        <span>{favorite.name}</span>
                       </div>
                   ))
                )
            }


        </div>
    );
}
