import React, { useEffect, useState } from 'react';
import productImage from "./../../assets/g92-2-500x500 1.svg";
import bshkash from "./../../assets/Bkash.svg";
import visa from "./../../assets/Visa.svg";
import master from "./../../assets/Mastercard.svg";
import nagad from "./../../assets/Nagad.svg";

const Checkout = () => {
  const [invoiceData, setInvoiceData] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [discountedTotal, setDiscountedTotal] = useState(null);

  useEffect(() => {
    const storedInvoiceData = JSON.parse(localStorage.getItem("invoiceData"));
    if (storedInvoiceData) {
      setInvoiceData(storedInvoiceData);
      setDiscountedTotal(storedInvoiceData.totalWithVat); // Initialize the discounted total with the original value
    }
  }, []);

  // التأكد من تحميل البيانات قبل عرضها
  if (!invoiceData) {
    return <p>Loading...</p>;
  }

  const { cartItems, subTotal, vatValue, totalWithVat } = invoiceData;

  // حساب القيمة المضافة (15%) لكل منتج
  const getPriceWithVAT = (price) => {
    const vatPercentage = 0.15;
    return price * (1 + vatPercentage); // 15% VAT added
  };

  // التعامل مع إدخال الكوبون
  const handleCouponApply = () => {
    if (couponCode === '0000') {
      // خصم 30% إذا كان الكوبون صحيحاً
      const discount = 0.30; 
      const discountedPrice = totalWithVat * (1 - discount);
      setDiscountedTotal(discountedPrice); // تحديث الإجمالي بعد الخصم
    } else {
      alert('Invalid coupon code!');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="fw-bold">Billing Details</h2>
      <div className="row g-1 p-0 m-0 justify-content-between">
        {/* تفاصيل الفاتورة - نموذج البيانات */}
        <div className="col-12 col-md-5">
          <div>
            <label>Email</label>
            <input type="text" className="form-control w-75 bg-secondary-subtle" />
          </div>
          <div className="mt-2">
            <label>Company Name</label>
            <input type="text" className="form-control w-75 bg-secondary-subtle" />
          </div>
          <div className="mt-2">
            <label>Street Address*</label>
            <input type="text" className="form-control w-75 bg-secondary-subtle" />
          </div>
          <div className="mt-2">
            <label>Apartment, floor, etc. (optional)</label>
            <input type="text" className="form-control w-75 bg-secondary-subtle" />
          </div>
          <div className="mt-2">
            <label>Town/City*</label>
            <input type="text" className="form-control w-75 bg-secondary-subtle" />
          </div>
          <div className="mt-2">
            <label>Phone Number*</label>
            <input type="text" className="form-control w-75 bg-secondary-subtle" />
          </div>
          <div className="mt-2">
            <label>Email Address*</label>
            <input type="text" className="form-control w-75 bg-secondary-subtle" />
          </div>

          <div className="mt-2 d-flex align-items-center">
            <input type="checkbox" className="form-check" />
            <p className="ms-2">Save this information for faster checkout next time</p>
          </div>
        </div>

        {/* تفاصيل الطلب والسعر */}
        <div className="col-12 col-md-4 mt-4 mt-md-0">
          {/* عرض المنتجات في السلة */}
          {cartItems.map((item, index) => {
            const priceWithVAT = getPriceWithVAT(item.totalPrice);
            return (
              <div className="card mb-3" key={index}>
                <div className="d-flex justify-content-between align-items-center p-3">
                  <div className="d-flex align-items-center">
                    <img
                      src={item.group1Image || productImage} 
                      alt={item.group1Name} 
                      className="rounded-circle" 
                      width={50} 
                      height={50} 
                      style={{ marginRight: '10px' }} 
                    />
                    <span>{item.group1Name}</span>
                  </div>
                  <span>ر.س {priceWithVAT.toFixed(2)}</span> 
                </div>
              </div>
            );
          })}

          
          <div className="mt-4 rounded-0">
            <div>
              <div className="d-flex align-items-center justify-content-between">
                <span>Subtotal:</span>
                <span>ر.س{subTotal.toFixed(2)}</span>
              </div>
              <div className="border-bottom border-2 border-dark rounded-0 my-2"></div>
              <div className="d-flex align-items-center justify-content-between">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="border-bottom border-2 border-dark rounded-0 my-2"></div>
              <div className="d-flex align-items-center justify-content-between">
                <span>Total with VAT:</span>
                <span>ر.س{totalWithVat.toFixed(2)}</span>
              </div>
              <div className="border-bottom border-2 border-dark rounded-0 my-2"></div>
            </div>

            {/* عرض السعر بعد الخصم */}
            {discountedTotal && (
              <div className="d-flex align-items-center justify-content-between mt-3">
                <span>Discounted Total:</span>
                <span>ر.س{discountedTotal.toFixed(2)}</span>
              </div>
            )}

            {/* خيارات الدفع */}
            <div className="d-flex p-0 m-0 g-0 justify-content-between align-items-center">
              <div className="visa d-flex justify-content-between align-items-center flex-column col-6">
                <div>
                  <input type="radio" style={{ marginRight: "15px" }} />
                  <span>Bank</span>
                </div>
                <div className="mt-2">
                  <input type="radio" style={{ marginRight: "15px" }} />
                  <span>Cash on delivery</span>
                </div>
              </div>

              <div className="col-6">
                <span>
                  <img src={bshkash} alt="Bkash" style={{ width: 37, height: 37, marginRight: "17px" }} />
                </span>
                <span>
                  <img src={visa} alt="Visa" style={{ width: 37, height: 37, marginRight: "17px" }} />
                </span>
                <span>
                  <img src={master} alt="Mastercard" style={{ width: 37, height: 37, marginRight: "17px" }} />
                </span>
                <span>
                  <img src={nagad} alt="Nagad" style={{ width: 37, height: 37, marginRight: "17px" }} />
                </span>
              </div>
            </div>

            {/* إدخال الكوبون */}
            <div className="cupon row mt-4">
              <div className="col-6">
                <input 
                  type="text" 
                  className="form-control rounded-0" 
                  placeholder="Apply Coupon" 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)} 
                />
              </div>
              <div className="col-6">
                <button 
                  className="btn btn-danger w-100 rounded-0" 
                  onClick={handleCouponApply}
                >
                  Apply Coupon
                </button>
              </div>
            </div>

           
            <div className="mt-4">
              <button className="btn btn-danger text-center">Proceed to Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
