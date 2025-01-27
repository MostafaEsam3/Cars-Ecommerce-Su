import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./LuxuryCover.css"; // ملف التنسيقات الخاص بالصفحة
import { Pagination, Navigation } from "swiper/modules";

const LuxuryColors = () => {
  const colors = [
    {
      id: 1,
      name: "رصاصي مطرز رصاصي",
      image: "https://www.bleco.sa/wp-content/uploads/2024/07/%D8%A7%D9%84%D9%84%D9%8A%D8%B2%D8%B1-1.jpg", // استبدل هذا الرابط بالصورة الحقيقية
      videoLink: "#",
    },
    {
      id: 2,
      name: "أسود مطرز أبيض",
      image: "https://www.bleco.sa/wp-content/uploads/2024/07/%D8%A7%D9%84%D9%84%D9%8A%D8%B2%D8%B1-3.jpg", // استبدل هذا الرابط بالصورة الحقيقية
      videoLink: "#",
    },
    {
      id: 3,
      name: "بيج مطرز بيج",
      image: "https://www.bleco.sa/wp-content/uploads/2024/07/%D8%A7%D9%84%D9%84%D9%8A%D8%B2%D8%B1-4.jpg", // استبدل هذا الرابط بالصورة الحقيقية
      videoLink: "#",
    },
  ];

  return (
    <div className="container py-5">
      <h2 className="text-center text-primary mb-4">تعرف على الألوان المتاحة</h2>
      <p className="text-center text-secondary">
        نسعد بثقتكم ولا نرضى بغير رضاكم.
      </p>

      {/* Swiper */}
      <Swiper
        modules={[Pagination, Navigation]}
        slidesPerView={1}
        spaceBetween={30}
        pagination={{ clickable: true }}
        navigation
        loop={true}
        className="mySwiper"
      >
        {colors.map((color) => (
          <SwiperSlide key={color.id}>
            <div className="card">
              <img src={color.image} alt={color.name} className="card-img-top" />
              <div className="card-body text-center">
                <h5 className="card-title">{color.name}</h5>
                <a href={color.videoLink} className="btn btn-link text-primary">
                  اضغط هنا لمشاهدة فيديو عن اللون
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LuxuryColors;
