import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Invoice = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const VAT_RATE = 0.15;
  const navigate = useNavigate();

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedItems);
    calculateSubTotal(savedItems);
  }, []);

  const calculateSubTotal = (items) => {
    const total = items.reduce((acc, item) => acc + (item.totalPrice || 0), 0);
    setSubTotal(total);
  };

  const handleDeleteItem = (indexToDelete) => {
    const updatedItems = cartItems.filter((_, index) => index !== indexToDelete);
    setCartItems(updatedItems);
    calculateSubTotal(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  const vatValue = (subTotal * VAT_RATE).toFixed(2);
  const totalWithVat = (subTotal + parseFloat(vatValue)).toFixed(2);

  // التنقل إلى صفحة Checkout القديمة
  const handleProceedToCheckout = () => {
    localStorage.setItem(
      "invoiceData",
      JSON.stringify({ cartItems, subTotal, vatValue: parseFloat(vatValue), totalWithVat: parseFloat(totalWithVat) })
    );
    navigate("/checkout"); // التنقل إلى الصفحة القديمة
  };

  // التنقل إلى صفحة Checkout1 الجديدة
  const handleProceedToCheckout1 = () => {
    localStorage.setItem(
      "invoiceData",
      JSON.stringify({ cartItems, subTotal, vatValue: parseFloat(vatValue), totalWithVat: parseFloat(totalWithVat) })
    );
    navigate("/checkout1"); // التنقل إلى الصفحة الجديدة
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 text-primary">الفاتورة</h2>
      <div className="row">
        {/* الجزء الأيمن: بطاقات الفاتورة */}
        <div className="col-12 col-lg-8">
          {cartItems.length === 0 ? (
            <p className="text-center text-danger">لا توجد منتجات في السلة</p>
          ) : (
            <div className="row gy-4">
              {cartItems.map((item, index) => (
                <div key={index} className="col-12 col-md-6">
                  <div className="card shadow-sm h-100">
                    <button
                      className="btn-close position-absolute top-0 end-0 m-2"
                      onClick={() => handleDeleteItem(index)}
                      title="حذف العنصر"
                      style={{
                        zIndex: 2,
                      }}
                    ></button>
                    {item.group1Image && (
                      <div className="position-relative">
                        <img
                          src={item.group1Image}
                          alt={item.group1Name}
                          className="card-img-top"
                          style={{
                            height: "100%",
                            width: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <div className="position-absolute top-0 start-0 bg-dark bg-opacity-50 text-white px-2 py-1 rounded-end">
                          {item.group1Name}
                        </div>
                      </div>
                    )}
                    <div className="card-body">
                      <h5 className="card-title text-primary">تفاصيل المنتج</h5>
                      <p className="card-text mb-2">
                        <strong>الوصف:</strong> {item.name}
                      </p>
                      <p className="card-text mb-2">
                        <strong>السعر:</strong> {item.price} ر.س
                      </p>
                      <p className="card-text mb-2">
                        <strong>الكمية:</strong> {item.quantity}
                      </p>
                      <p className="card-text text-success">
                        <strong>الإجمالي:</strong> {item.totalPrice} ر.س
                      </p>
                    </div>
                    <div className="card-footer bg-light d-flex justify-content-around align-items-center">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="rounded-circle"
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                          }}
                        />
                      )}
                      {item.carImage && (
                        <img
                          src={item.carImage}
                          alt={item.carName}
                          className="rounded-circle"
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* الجزء الأيسر: المجموع والتقدم */}
        <div className="col-12 col-lg-4">
          <div className="card shadow-lg p-4">
            <h4 className="text-center text-primary mb-4">تفاصيل المجموع</h4>
            <p className="d-flex justify-content-between">
              <span>المجموع الفرعي:</span>
              <span>{subTotal.toFixed(2)} ر.س</span>
            </p>
            <p className="d-flex justify-content-between">
              <span>القيمة المضافة (15%):</span>
              <span>{vatValue} ر.س</span>
            </p>
            <p className="d-flex justify-content-between fw-bold">
              <span>الإجمالي الكلي:</span>
              <span>{totalWithVat} ر.س</span>
            </p>
            
            <button className="btn btn-success w-100 mt-3" onClick={handleProceedToCheckout}>
              التقدم لإتمام الطلب (Checkout)
            </button>
           
            <button className="btn btn-primary w-100 mt-3" onClick={handleProceedToCheckout1}>
              التقدم لإتمام الطلب (Checkout1)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
