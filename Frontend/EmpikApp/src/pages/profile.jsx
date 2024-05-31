import {useEffect, useState} from "react";
import axiosInstance from "../interceptors/axiosInstance.jsx";
import {Commet} from "react-loading-indicators";
import {useSelector} from "react-redux";


export default function Profile() {
    //const [user, setUser] = useState(null);
    const user = useSelector(state => state.user);

    useEffect( () => {
        //getUser()
    }, [])

/*    let getUser = async() => {  //TODO Pobierać z reduxa nie z local storage albo wysyłać zapytanie żeby te dane pobrać
        //const usern = JSON.parse(localStorage.getItem("user"));

        let response = await axiosInstance.get(`users/${usern.id}`);
        if(response.data) {
            setUser(response.data);
            console.log(user.id);
        }
    }*/


    return(
         user ? (
        <div>
            <text>{user.user.id}</text>
        </div>
        ) : (
             <div>
                 <Commet color="#32cd32" size="medium" text="" textColor="" />
             </div>
        )
);
}
