import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import  Home  from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import SecondaryRegister from "./Components/SecondaryRegister";
import Profile from "./Components/Profile";
import EditProfile from "./Components/EditProfile";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./Components/Footer";
import QRGenerator from "./Components/QRGenerator";

function App() { 
  const location=useLocation();
  
  useEffect(()=>{
    window.scrollTo(0,0);
  }, [location])

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path= "/Login" element={<Login/>}/> 
        <Route path= "/Register" element={<Register/>}/> 
        <Route path= "/SecondaryRegister" element={<SecondaryRegister/>}/> 
        <Route path="/Profile" element={<Profile/> }/>
        <Route path="/EditProfile" element={<EditProfile/> }/>
        <Route path="/GenerateQR" element={<QRGenerator/> }/>
      </Routes>
      <Footer/>
      <ToastContainer/> 
    </div>
  );
}

export default App;