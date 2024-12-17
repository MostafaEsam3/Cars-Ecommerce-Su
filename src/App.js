import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import Dashboard from './Dashboard/DashboardLayout/DashboardLayout';
import Hero from './component/HeroSection/Hero/Hero';
import SignUp from './component/AuthComponent/SignUp/SignUp';
import Login from './component/AuthComponent/Login/Login';
import Cart from './component/Cart/Cart';
import Checkout from './component/CheckOut/Checkout';
import Checkout1 from './component/Checkout1/Checkout.jsx';
import About from './component/About/About';
import Invoice from './component/Invoice/Invoice';
import { Context } from './component/context/context'; // استيراد الـ Context
import Slide from './component/HeroSection/SliderAnimation/Slider';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Layout with Nested Routes */}
        <Route path="/" element={<Layout />}>
           {/* Main Layout with Nested Routes */}
          <Route index element={<Hero />} />
          <Route path="sign" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="checkout1" element={<Checkout1 />} />
          <Route path="about" element={<About />} />
          <Route path="invoice" element={<Invoice />} />
        </Route>
        <Route path="/admin-dashboard/*" element={<Dashboard/>} /> {/* Ensure it is accessible under this route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
