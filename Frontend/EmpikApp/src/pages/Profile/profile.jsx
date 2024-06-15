import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import PATH from "../../paths.jsx";
import FavoriteService from "../../services/favoriteService.js";
import {Commet} from "react-loading-indicators";
import FavoriteProduct from "./FavoriteProduct.jsx";
import UserService from "../../services/user-service.js";


export default function Profile() {
    const [favorites, setFavorites] = useState([]);
    const [isFavorites, setIsFavorites] = useState(false);
    const [isChanged, setIsChanged] = useState(false);

    useEffect( () => {
        const getFavorites = async() => {
            const response = await FavoriteService.getUserFavorites();
            setFavorites(response);
        }
        getFavorites();
    }, [isChanged])


    const onChange = () => {
        setIsChanged(!isChanged);
    }

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
                   favorites.map(favoriteProduct => (
                       <FavoriteProduct key={favoriteProduct.id} favoriteProduct={favoriteProduct} onChange={onChange}/>
                   ))
                )
            }


        </div>
    );
}
