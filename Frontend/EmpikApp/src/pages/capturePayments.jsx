import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axiosInstance from "../interceptors/axiosInstance.jsx";


function CapturePayment () {
    const location = useLocation();
    const navigate = useNavigate();
    const [status, setStatus] = useState("processing");
    //const placedOrder = useSelector(state => state.placedOrder);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");
        console.log(token);


        if (token) {
            const postData = async () => {
                try {
                    const placedOrderId = JSON.parse(localStorage.getItem("placedOrderId"));
                    localStorage.removeItem("placedOrderId");
                    const response = await axiosInstance.post('/paypal/capture', {}, { params: {token: token, placedOrderId: placedOrderId}});

                    if(response.data.status ==="success") {

                        setStatus("success");
                        const timer = setTimeout(() => {
                            //navigate('/placed_order', {state: placedOrder.placedOrder});
                            navigate("/placed_order", {state: response.data.orderToShow});
                        }, 3500);
                    }

                } catch (error) {
                    console.error('Error: ', error.message);
                    setStatus("failed");
                    const timer = setTimeout(() => {
                        navigate('/');
                    }, 3500);
                }
            };

            postData();
        }
    }, [location]);


    return (
        <div>
            { status === "processing" ? (
                <span>Przetwarzanie płatności...</span>
            ) : (
                status === "success" ? (
                    <span>Płatność się powiodła. Nie zamykaj okna przeglądarki...</span>
                  ) : (
                    <span>Płatność się nie powiodła. Przekierowywanie do strony głównej...</span>
                  )
            )
            }
        </div>
    )
}

export default CapturePayment
