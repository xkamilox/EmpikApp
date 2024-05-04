import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom"
import PATH from './paths';
import './App.css';
import Login from './pages/Login/login';
import Registration from './pages/Registration/registration';
import Product from './pages/Product/product';
import Shopping_cart from './pages/Shopping_cart/shopping_cart';

function App() {
  return (
    <Routes>
      <Route index path={PATH.LOGIN} element={<Login/>}/>
      <Route path={PATH.REGISTRATION} element={<Registration/>}/>
      <Route path={PATH.PRODUCT} element={<Product/>}/>
      <Route path={PATH.SHOPPING_CART} element={<Shopping_cart/>}/>
      <Route path="*" element={<Navigate to={PATH.LOGIN} replace />} />
    </Routes>
  )
}

export default App;
