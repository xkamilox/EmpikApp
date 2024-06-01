import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom"
import PATH from './paths';
import './App.css';
import Login from './pages/Login/login';
import Registration from './pages/Registration/registration';
import Product from './pages/Product/product';
import Shopping_cart from './pages/Shopping_cart/shopping_cart';
import CartShoppingInfo from "./pages/CartShoppingInfo.jsx";
import AuthVerify from "./common/AuthVerify";
import {logout} from "./actions/auth.js";
import {useDispatch} from "react-redux";
import Profile from "./pages/profile.jsx";
import OrderHistory from "./pages/OrderHistory.jsx";
import CapturePayment from "./pages/capturePayments.jsx";
import CancelPayments from "./pages/cancelPayments.jsx";
import Placed_order from "./pages/placed_order.jsx";
import PlacingOrderFail from "./pages/PlacingOrderFail.jsx";



function App() {

    const dispatch = useDispatch();
    const logOut = () => {
        dispatch(logout());
    }

  return (
      <div>
    <Routes>
      <Route index path={PATH.PRODUCT} element={<Product/>}/>
      <Route  path={PATH.LOGIN} element={<Login/>}/>
      <Route path={PATH.REGISTRATION} element={<Registration/>}/>
      <Route path={PATH.SHOPPING_CART} element={<Shopping_cart/>}/>
      <Route path={PATH.SHOPPING_CART_INFO} element={<CartShoppingInfo/>} />
      <Route path={PATH.PLACED_ORDER} element={<Placed_order/>} />
      <Route path={PATH.PLACING_ORDER_FAIL} element={<PlacingOrderFail/>} />
      <Route path="*" element={<Navigate to={PATH.LOGIN} replace />} />
      <Route path={PATH.PROFILE} element={<Profile/>}/>
      <Route path={PATH.ORDER_HISTORY} element={<OrderHistory/>} />
      <Route path={PATH.CAPTURE_PAYMENT} element={<CapturePayment/>} />
      <Route path={PATH.CANCEL_PAYMENT} element={<CancelPayments/>}  />
    </Routes>
          <AuthVerify logOut={logOut}/> {/*przy każdej zmienie Route się odpala i sprawdza czy token wygasł jeśli tak to wylogowuje*/}
      </div>



)
}

export default App;
