import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "./../../Modals/Modal";
import productImage from "./../../../assets/g92-2-500x500 1.svg";

const CardTemplate = ({ name, description, image = productImage, id }) => {
  const [liked, setLiked] = useState(false);
  const [sliderTextIndex, setSliderTextIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const rate = 5;
  const sliderTexts = ["🚚 شحن سريع", "🛠 صيانة دائمة"];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setSliderTextIndex((prevIndex) => (prevIndex + 1) % sliderTexts.length);
        setFade(true);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const toggleLike = (e) => {
    e.stopPropagation();
    setLiked(!liked);
  };

  return (
    <>
      <div className="col-12 col-md-4 p-3">
        <div
          className="border rounded-4 shadow p-3 h-100"
          style={{ minHeight: "450px" }}
        >
          {/* رأس البطاقة */}
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span
              className="badge text-white p-2"
              style={{ backgroundColor: "#28a745" }}
            >
              -40%
            </span>
            <button
              onClick={toggleLike}
              className="btn border-0"
              style={{
                backgroundColor: "transparent",
                fontSize: "1.4rem",
                color: liked ? "red" : "rgba(0,0,0,0.3)",
              }}
            >
              ❤
            </button>
          </div>

          {/* صورة المنتج */}
          <Link to={`/cart/${id}`}>
            <div className="text-center mb-3">
              <img
                src={image}
                alt="product"
                style={{
                  width: "200px",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
            </div>
          </Link>

          {/* المحتوى الرئيسي مقسوم */}
          <div className="d-flex justify-content-between align-items-start px-2 mt-2">
            {/* القسم الأيسر */}
            <div className="text-start" style={{ flex: 1 }}>
              <h6 className="fw-bold">{name}</h6>
              <p style={{ fontSize: "0.9rem" }}>{description}</p>
              <p
                style={{
                  opacity: fade ? 1 : 0,
                  transition: "opacity 0.5s ease-in-out",
                  fontSize: "0.85rem",
                }}
              >
                {sliderTexts[sliderTextIndex]}
              </p>
            </div>

            {/* القسم الأيمن */}
            <div className="text-end" style={{ minWidth: "100px" }}>
              <div>
                <span className="fw-bold text-success d-block">$120</span>
                <span className="text-danger text-decoration-line-through small d-block">
                  $200
                </span>
              </div>
              <div className="text-warning mt-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <i
                    key={n}
                    className={`fa fa-star${rate >= n ? " checked" : ""}`}
                  ></i>
                ))}
              </div>
            </div>
          </div>

          {/* أزرار */}
          <div className="d-flex justify-content-between align-items-center mt-3 px-2">
            <Link to={`/cart/${id}`}>
              <button className="btn btn-primary btn-sm">أضف للسلة</button>
            </Link>
            <button
              className="btn btn-outline-secondary btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              مشاهدة الفيديو
            </button>
          </div>
        </div>
      </div>

      <Modal />
    </>
  );
};

export default CardTemplate;
