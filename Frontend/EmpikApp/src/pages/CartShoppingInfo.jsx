import axiosInstance from "../interceptors/axiosInstance.jsx";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";

function CartShoppingInfo() {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const userid = JSON.parse(localStorage.getItem("auth"))?.userid;
    const basket = useSelector(state => state.basket);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [street, setStreet] = useState("");
    const [buildingNumber, setBuildingNumber] = useState("");
    const [city, setCity] = useState("");
    const [voivodeship, setVoivodeship] = useState("");
    const [country, setCountry] = useState("");


    useEffect(() => {
        if(isLoggedIn){
            const getUserInfo = async() => {
                await axiosInstance.get(`/users/${userid}`)
                    .then((response) => {
                        setEmail(response.data.email ? response.data.email : "");
                        setName(response.data.name ? response.data.name : "");
                        setSurname(response.data.surname ? response.data.surname : "");
                    })
            }

            getUserInfo();
        }
    }, [])



    return (
        <div>
            <p>{basket.price}</p>
            <input
                type="text"
                placeholder="Email"
                className="input_field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="text"
                placeholder="Name"
                className="input_field"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Surname"
                className="input_field"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
            />
            <input
                type="text"
                placeholder="Street"
                className="input_field"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
            />
            <input
                type="text"
                placeholder="Building number"
                className="input_field"
                value={buildingNumber}
                onChange={(e) => setBuildingNumber(e.target.value)}
            />
            <input
                type="text"
                placeholder="City"
                className="input_field"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <input
                type="text"
                placeholder="Voivodeship"
                className="input_field"
                value={voivodeship}
                onChange={(e) => setVoivodeship(e.target.value)}
            />
            <input
                type="text"
                placeholder="Country"
                className="input_field"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
            />

        </div>

    )


}

export default CartShoppingInfo;
