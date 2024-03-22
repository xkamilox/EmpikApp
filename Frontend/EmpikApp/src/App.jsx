import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom"
import PATH from './paths';
import Login from './pages/Login/login';
import Registration from './pages/Registration/registration';

function App() {
  return (
    <Routes>
      <Route index path={PATH.LOGIN} element={<Login/>}/>
      <Route path={PATH.REGISTRATION} element={<Registration/>}/>
      <Route path="*" element={<Navigate to={PATH.LOGIN} replace />} />
    </Routes>
  )
}

export default App;
