import UserService from "../services/user-service.js";
import {useEffect, useState} from "react";
import axiosInstance from "../services/axiosInstance.jsx";
import {Commet} from "react-loading-indicators";


export default function Profile() {
    //const user = JSON.parse(sessionStorage.getItem("user"));
    //const usern = UserService.getUser(user.id);
    const [user, setUser] = useState(null);

    useEffect( () => {
        getUser()
    }, [])

    let getUser = async() => {
        const usern = JSON.parse(localStorage.getItem("user"));
        let response = await axiosInstance.get(`users/${usern.id}`);
        if(response.data) {
            setUser(response.data);
            console.log(user.id);
        }
    }


    return(
         user ? (
        <div>
            <text>{user.id}</text>
        </div>
        ) : (
             <div>
                 <Commet color="#32cd32" size="medium" text="" textColor="" />
             </div>
        )
);
}
