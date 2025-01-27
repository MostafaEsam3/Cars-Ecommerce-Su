import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import "./Header.css";

const Header = () => {
  const dispatch = useDispatch();

  
  const cartItems = useSelector((state) => state.cart.cartArray);

  
  const subTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  
  const handleCartClick = () => {
    setIsSidebarOpen(true);
  };

  return (
    <>
      <div className="bg-dark text-white py-2">
        <div className="d-flex justify-content-around align-items-center text-center col-10 col-md-7 mx-auto">
          {/* Sale Announcement */}
          <div className="text-center">
            <span>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! </span>
            <a href="#" className="text-warning fw-bold ms-1">
              ShopNow
            </a>
          </div>

          {/* English Button */}
          <div>
            <button className="btn btn-outline-light btn-sm">English</button>
          </div>
        </div>
      </div>

      <header className="container -warning py-1">
        <div className="row justify-content-between align-items-center">
          
          <div className="-info col-12 col-md-3 text-center py-2">
            <span>Exclusive</span>
          </div>

          {/* Center Navigation */}
          <nav className="col-12 col-md-6 -danger">
            <div className="navbar navbar-expand-md navbar-light">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                <ul className="navbar-nav">
                  <Link className="nav-item" to={"/"}>
                    <a className="nav-link text-dark" href="#">
                      Home
                    </a>
                  </Link>
                  <li className="nav-item">
                    <Link className="nav-link text-dark" to={"contactForm"}>
                      Contact
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-dark" to={"/about"}>
                      About
                    </Link>
                  </li>
                  <Link className="nav-item" to={"/login"}>
                    <a className="nav-link text-dark">Sign Up</a>
                  </Link>
                  <li className="nav-item dropdown">
  <span
    className="nav-link dropdown-toggle"
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    Products
  </span>
  <ul
    className="dropdown-menu p-3 w-100"
    style={{
      minWidth: "600px", 
    }}
  >
    <div className="row row-cols-1 row-cols-md-3 g-3">
      {/* العمود الأول */}
      <div className="col">
        <h6 className="section-title">التلبيسات</h6>
        <ul className="list-unstyled">
          <li>
            <Link className="dropdown-item" to="/products/luxury">
              تلبيسه الفاخر
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/products/diamond">
              تلبيسه الدايموند
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/products/laser">
              تلبيسه الليزر
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/products/triangles">
              تلبيسة المثلثات
            </Link>
          </li>
        </ul>
      </div>

      
      <div className="col">
        <h6 className="section-title">الطلبات</h6>
        <ul className="list-unstyled">
          <li>
            <Link className="dropdown-item" to="/cart">
              اطلب الفاخر
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/order/diamond">
              اطلب الدايموند
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/order/laser">
              اطلب الليزر
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/order/triangles">
              اطلب المثلثات
            </Link>
          </li>
        </ul>
      </div>

      
      <div className="col">
        <h6 className="section-title">الخدمات</h6>
        <ul className="list-unstyled">
          <li>
            <Link className="dropdown-item" to="/services/join">
              انضم إلينا
            </Link>
          </li>
        </ul>
        {/* <h6 className="section-title">السياسات</h6>
        <ul className="list-unstyled">
          <li>
            <Link className="dropdown-item" to="/policies/privacy">
              سياسة الخصوصية
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/policies/refund">
              سياسة الاسترجاع
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/policies/complaints">
              الشكاوي والاقتراحات
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/policies/terms">
              الشروط والأحكام
            </Link>
          </li>
        </ul> */}
      </div>
    </div>
  </ul>
</li>







                </ul>
              </div>
            </div>
          </nav>

          {/* Right Section */}
          <div className="col-12 col-md-3 d-flex justify-content-between align-items-center py-2">
            <div className="search" style={{ flexGrow: 1, marginRight: "1rem" }}>
              <input
                className="form-control"
                type="text"
                placeholder="Search..."
                style={{ backgroundColor: "#F5F5F5" }}
              />
            </div>
            <div className="d-flex align-items-center">
              <span style={{ marginRight: "1rem", cursor: "pointer" }}>❤</span>
              <span
                style={{ position: "relative", cursor: "pointer" }}
                onClick={handleCartClick}
              >
                <FaShoppingCart size={24} />
                {cartItems.length > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      backgroundColor: "red",
                      color: "white",
                      borderRadius: "50%",
                      padding: "2px 6px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {cartItems.length}
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="border-bottom" style={{ marginTop: "0px" }}></div>

      {/* القائمة الجانبية */}
      {isSidebarOpen && (
        <motion.div
          className="sidebar"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <button onClick={() => setIsSidebarOpen(false)} className="close-btn">
            &times;
          </button>
          <h3>سلتي</h3>
          {cartItems.length > 0 ? (
            <ul>
           {cartItems.map((item, index) => (
  <li key={index} className="cart-item">
    {item.group1Image && (
      <img
        src={item.group1Image}
        alt={item.group1Name || "Group Image"}
        className="group1-image"
      />
    )}
    <div className="item-details">
      <p>{item.name}</p>
      <p>Price: {item.price} ر.س</p>
      <p>Quantity: {item.quantity}</p>
    </div>
    <button
      className="delete-btn"
      onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: index })}

      style={{
        backgroundColor: "transparent",
        border: "none",
        color: "red",
        cursor: "pointer",
        fontSize: "18px",
        marginLeft: "10px",
      }}
    >
      &times;
    </button>
  </li>
))}

            </ul>
          ) : (
            <p>Your cart is empty.</p>
          )}
          <div className="subtotal">
            <h4>Subtotal: {subTotal.toFixed(2)} ر.س</h4>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Header;
