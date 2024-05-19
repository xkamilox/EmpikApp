import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axiosInstance from "../interceptors/axiosInstance.jsx";


function CapturePayment () {
    const location = useLocation();
    const navigate = useNavigate();
    const [status, setStatus] = useState("processing");

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");
        console.log(token);


        if (token) {
            const postData = async () => {
                try {
                    const response = await axiosInstance.post('/paypal/capture', {}, { params: {token: token}});

                    if(response.data.status ==="success") {

                        setStatus("success");
                    }
                    else{
                        setStatus("failed");
                    }

                    const timer = setTimeout(() => {
                        navigate('/');
                    }, 3500);

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
                    <span>Płatność się powiodła. Przekierowywanie do strony głównej...</span>
                  ) : (
                    <span>Płatność się nie powiodła. Przekierowywanie do strony głównej...</span>
                  )
            )
            }
        </div>
    )
}

export default CapturePayment
