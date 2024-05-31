import axiosInstance from "../interceptors/axiosInstance.jsx";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import orderService from "../services/orderService.js";
import {useNavigate} from "react-router-dom";


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

    const navigate = useNavigate();



    useEffect(() => {
        if(isLoggedIn){
            const getUserInfo = async() => {        //Pobiera dane użytkownika żeby uzupełnić pola
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


    const handleBuyButton = async(payNow) => {
        const orderData = {
            basket: basket,
            email: email,
            name: name,
            surname: surname,
            deliveryAddress: `${street} ${buildingNumber} ${city} ${voivodeship} ${country}`
        }

        if(isLoggedIn){
            await orderService.sendCreateOrderRequest(orderData)
                .then(async(response) => {
                    if(payNow){
                        localStorage.setItem("placedOrderId", JSON.stringify(response.data.id));
                        const res = await
                            axiosInstance.post("/paypal/init", {}, {params: {sum: response.data.totalPrice}});

                        const approveUrl = res.data.redirectUrl;
                        console.log(approveUrl);
                        //navigate(approveUrl); //wyrzuca do logowania
                        window.location.href = approveUrl;
                    }
                    else {
                        navigate("/placed_order", {state: response.data});
                    }
                })
                .catch(error => {
                    console.log(error.message);
                    navigate("/placing_order_fail");
                })
        }
    }




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

            <button onClick={() => handleBuyButton(false)}>Place order and pay later</button>
            <button onClick={() => handleBuyButton(true)}>Place order and pay now</button>
        </div>

    )


}

export default CartShoppingInfo;
