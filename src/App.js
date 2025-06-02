import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
// import Dashboard from './Dashboard/DashboardLayout/DashboardLayout';
import Hero from './component/HeroSection/Hero/Hero';
import SignUp from './component/AuthComponent/SignUp/SignUp';
import Login from './component/AuthComponent/Login/Login';
// import Cart from './component/Cart/Cart';
import Checkout from './component/CheckOut/Checkout';
import Checkout1 from './component/Checkout1/Checkout.jsx';
import About from './component/About/About';
import Invoice from './component/Invoice/Invoice';
import { Context } from './component/context/context'; // استيراد الـ Context
import Slide from './component/HeroSection/SliderAnimation/Slider';

import ContactForm from './component/onFinish/onFinish.jsx';
import PrivacyPolicy from './component/Product/PrivacyPolicy.jsx';
import RefundPolicy from './component/Product/RefundPolicy.jsx';
import ComplaintsSuggestions from './component/Product/ComplaintsSuggestions.jsx';
import TermsAndConditions from './component/Product/TermsAndConditions.jsx';
import JoinUs from './component/Product/JoinUs.jsx';
import LuxuryCover from './component/Product/Cover/LuxuryCover.jsx';
import { FaGlassMartini } from 'react-icons/fa';
import { setNestedObjectValues } from 'formik';
import AdminLogin from './component/AuthComponent-Dachboord/AdminLogin.jsx';
import ProtectedRoute from './component/AuthComponent-Dachboord/ProtectedRoute.jsx';
import NotFound from './component/NotFound/NotFound.jsx';
import Profile from './layout/header/Profile.jsx';
const DashboardLayout = React.lazy(() => import('./Dashboard/DashboardLayout/DashboardLayout'));
const Cart = React.lazy(() => import('./component/Cart/Cart'));


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/profile" element={<Profile />} />
        {/* Main Layout with Nested Routes */}
        <Route path="/" element={<Layout />}>
           {/* Main Layout with Nested Routes */}
          <Route index element={<Hero />} />
          <Route path="sign" element={<SignUp />} />
          <Route path="contactForm" element={<ContactForm />} />
          <Route path="login" element={<Login />} />
          {/* <Route path="cart" element={<Cart />} /> */}
          {/* <Route
            path="cart  "
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Cart />
              </Suspense>
            }
          /> */}
    <Route
  path="cart/:id"
  element={
    <Suspense fallback={<div>Loading...</div>}>
      <Cart />
    </Suspense>
  }
/>
<Route path="*" element={<NotFound />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="checkout1" element={<Checkout1 />} />
          <Route path="about" element={<About />} />
          <Route path="invoice" element={<Invoice />} />
        <Route path="policies/privacy" element={<PrivacyPolicy />} />
        <Route path="policies/refund" element={<RefundPolicy />} />
        <Route path="/policies/complaints" element={<ComplaintsSuggestions />} />
        <Route path="/policies/terms" element={<TermsAndConditions />} />
        <Route path="/services/join" element={<JoinUs />} />
        <Route path="/products/luxury" element={<LuxuryCover />} />
        </Route>

        
       
        <Route 
  path="/admin-dashboard/*" 
  element={
    <ProtectedRoute>
      <Suspense fallback={<div>Loading...</div>}>
        <DashboardLayout />
      </Suspense>
    </ProtectedRoute>
  }
/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;