import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Table from './component/table/table';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import Hero from './component/HeroSection/Hero/Hero';
import SignUp from './component/AuthComponent/SignUp/SignUp';
import Login from './component/AuthComponent/Login/Login';
import Cart from './component/Cart/Cart';
import Checkout from './component/CheckOut/Checkout';
import About from './component/About/About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Layout with Nested Routes */}
        <Route path="/" element={<Layout />}>
          {/* Default route rendered in Outlet */}
          <Route index element={<Hero />} />
          {/* Additional routes */}
          <Route path="sign" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="about" element={<About />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

