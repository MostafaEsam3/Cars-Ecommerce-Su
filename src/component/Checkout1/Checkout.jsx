import React, { useEffect, useState } from "react";
import bshkash from "./../../assets/Bkash.svg";
import visa from "./../../assets/Visa.svg";
import master from "./../../assets/Mastercard.svg";
import nagad from "./../../assets/Nagad.svg";
import { useSelector, useDispatch } from "react-redux";
import { REMOVE_FROM_CART, UPDATE_CART_ITEM } from "../../redux/Types/types";



const Checkout = () => {
  // const [invoiceData, setInvoiceData] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  // const [cartItems, setCartItems] = useState([]);

  // useEffect(() => {
  //   const storedInvoiceData = JSON.parse(localStorage.getItem("invoiceData"));
  //   if (storedInvoiceData) {
  //     setInvoiceData(storedInvoiceData);
  //     setCartItems(storedInvoiceData.cartItems || []);
  //   }
  // }, []);
  const cartItems = useSelector((state) => state.cart.cartArray);
  const dispatch = useDispatch();
  
  const subTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const vatValue = subTotal * 0.15;
  const totalWithVat = subTotal + vatValue;
  // التأكد من وجود البيانات
  // if (!invoiceData) {
  //   return <p>Loading...</p>;
  // }

  // const { subTotal, vatValue, totalWithVat } = invoiceData;

  // حساب القيمة المضافة
  const getPriceWithVAT = (price) => {
    const vatPercentage = 0.15; // 15% VAT
    return price * (1 + vatPercentage);
  };

  // تطبيق كوبون الخصم
  const applyCoupon = () => {
    if (couponCode === "DISCOUNT30" || couponCode === "0000") {
      setDiscount(totalWithVat * 0.3); // خصم 30%
    } else {
      alert("Invalid coupon code!");
      setDiscount(0);
    }
  };

  // حذف المنتج
  const handleRemoveItem = (index) => {
    dispatch({ type: REMOVE_FROM_CART, payload: index });
  };
  
  
  

  // تعديل الكمية
  const handleQuantityChange = (id, change) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + change) } // لا تسمح بالكمية < 1
        : item
    );
    dispatch({ type: "UPDATE_CART_ITEMS", payload: updatedCartItems }); // تحديث Redux
  };
  
  
  

  // حساب الإجمالي بعد التحديث
  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };
  

  // حساب الإجمالي النهائي
  const finalTotal = totalWithVat - discount;

  return (
    <div className="container my-5">
      <div className="row">
        {/* Billing Address */}
        <div className="col-md-6">
          <h4>Billing Address</h4>
          <div className="mb-3">
            <label>Full Name *</label>
            <input type="text" className="form-control" placeholder="Full Name"  />
          </div>
          <div className="mb-3">
            <label>Phone Number *</label>
            <input type="text" className="form-control" placeholder="Phone Number" />
          </div>
          <div className="mb-3">
            <label>Address *</label>
            <input type="text" className="form-control" placeholder="Address" />
          </div>
          <div className="row">
            <div className="col-md-6">
              <label>Country *</label>
              <input type="text" className="form-control" placeholder="Country" />
            </div>
            <div className="col-md-6">
              <label>State *</label>
              <input type="text" className="form-control" placeholder="State" />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-6">
              <label>City *</label>
              <input type="text" className="form-control" placeholder="City" />
            </div>
            <div className="col-md-6">
              <label>Zip / Postal Code *</label>
              <input type="text" className="form-control" placeholder="Zip Code" />
            </div>
          </div>
          <div className="mt-3 ">
            <label>Select the Delivery Address</label>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="deliveryAddress" />
              <label className="form-check-label">Home</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="deliveryAddress" />
              <label className="form-check-label">Office (10AM to 5PM)</label>
            </div>
          </div>
        </div>


        {/* Your Order */}
        <div className="col-md-6">
          <h4>Your Order</h4>
          {cartItems.map((item, index) => {
            const priceWithVAT = getPriceWithVAT(item.totalPrice);
            return (
              <div className="card mb-5" key={index}>
                <div className="card-body d-flex justify-content-between align-items-center">
                  <img
                    src={item.group1Image || "https://via.placeholder.com/150"}
                    alt={item.group1Name}
                    style={{ width: 100, height: 100, borderRadius: "50%" }}
                  />
                  <div className="ms-3">
                    <h6 className="mb-1">{item.group1Name}</h6>
                    <p className="mb-0">Price (VAT Included): ر.س {priceWithVAT.toFixed(2)}</p>
                    <div className="d-flex align-items-center mt-1">
  الكميه:
  <button
    className="btn btn-sm btn-light"
    onClick={() => handleQuantityChange(item.id, -1)}
  >
    -
  </button>
  <span className="mx-2">{item.quantity}</span>
  <button
    className="btn btn-sm btn-light"
    onClick={() => handleQuantityChange(item.id, 1)}
  >
    +
  </button>
</div>

                  </div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemoveItem(index)}
                    style={{ borderRadius:"50%" }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })}

          {/* Coupon Code */}
          <div className="input-group my-3">
            <input
              type="text"
              className="form-control"
              placeholder="Coupon Code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button className="btn btn-success" onClick={applyCoupon}>
              Apply Code
            </button>
          </div>

          {/* Summary */}
          <div className="d-flex justify-content-between">
            <span>Subtotal:</span>
            <span>ر.س {subTotal.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>VAT (15%):</span>
            <span>ر.س {vatValue.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="d-flex justify-content-between">
              <span>Discount:</span>
              <span>ر.س -{discount.toFixed(2)}</span>
            </div>
          )}
          <div className="d-flex justify-content-between fw-bold mt-2">
            <span>Total:</span>
            <span>ر.س {finalTotal.toFixed(2)}</span>
          </div>

          {/* Place Order Button */}
          <button className="btn btn-success w-100 mt-3">Place Order</button>
        </div>
      </div>
      {/* Payment Method */}
<div className="mt-2">
  <h4>Payment Method</h4>
  <div className="d-flex justify-content-start align-items-center mt-3">
    <div className="form-check me-4">
      <input
        className="form-check-input"
        type="radio"
        name="paymentMethod"
        id="visa"
      />
      <label className="form-check-label" htmlFor="visa">
        <img
          src={visa}
          alt="Visa"
          style={{ width: 40, height: 40 }}
        />
      </label>
    </div>
    <div className="form-check me-4">
      <input
        className="form-check-input"
        type="radio"
        name="paymentMethod"
        id="bshkash"
      />
      <label className="form-check-label" htmlFor="bshkash">
        <img
          src={bshkash}
          alt="Bkash"
          style={{ width: 40, height: 40 }}
        />
      </label>
    </div>
    <div className="form-check me-4">
      <input
        className="form-check-input"
        type="radio"
        name="paymentMethod"
        id="mastercard"
      />
      <label className="form-check-label" htmlFor="mastercard">
        <img
          src={master}
          alt="MasterCard"
          style={{ width: 40, height: 40 }}
        />
      </label>
    </div>
    <div className="form-check me-4">
      <input
        className="form-check-input"
        type="radio"
        name="paymentMethod"
        id="nagad"
      />
      <label className="form-check-label" htmlFor="nagad">
        <img
          src={nagad}
          alt="Nagad"
          style={{ width: 40, height: 40 }}
        />
      </label>
    </div>
  </div>
</div>
    </div>
  );
};

export default Checkout;
