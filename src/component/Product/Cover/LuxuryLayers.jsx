import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./LuxuryLayers.css"; // ملف التنسيقات المخصص
import { Navigation } from "swiper/modules";

const LuxuryLayers = () => {
  const layers = [
    {
      id: 1,
      title: "جلد صناعي صديق للبيئة",
      description: [
        "جلد صديق للبيئة مقاوم للسـوائل.",
        "مقاوم للتقشير والتشقق.",
        "لديه خاصية ثبات اللون مع طول مدة الاستخدام.",
        "لا يسبب روائح داخل السيارة كأنواع الجلود الصناعية.",
      ],
      image: "https://www.bleco.sa/wp-content/uploads/slider13/layers_01-8-scaled.webp",
    },
    {
      id: 2,
      title: "الإسفنج",
      description: [
        "لإعطاء المرونة الكافية لطبقة الجلد ضد التشقق.",
        "تعطي الشكل والتطريز الخارجي منظرًا جمالياً.",
        "تجعل المنتج مريح عند الاستخدام.",
      ],
      image: "https://www.bleco.sa/wp-content/uploads/slider13/layers_01-8-scaled.webp",
    },
    {
      id: 3,
      title: "XPE طبقة بلاستيك قوية",
      description: [
        "لمزيد من الحماية من السوائل.",
        "لمنع تعرق المنتج، والذي قد يسبب روائح أو تسلخ لطبقات المنتج.",
        "مقاوم للتقشير والتشقق.",
        "لديه خاصية ثبات اللون مع طول مدة الاستخدام.",
      ],
      image: "https://www.bleco.sa/wp-content/uploads/slider13/layers_01-8-scaled.webp",
    },
  ];

  return (
    <div className="luxury-layers-container">
      <Swiper
        modules={[Navigation]}
        slidesPerView={1}
        navigation
        loop={true}
        className="luxury-layers-swiper"
      >
        {layers.map((layer) => (
          <SwiperSlide key={layer.id}>
            <div className="layer-card">
              {/* صورة الطبقة */}
              <div className="layer-image">
                <img src={layer.image} alt={layer.title} />
              </div>

              {/* المحتوى */}
              <div className="layer-content">
                <h3 className="layer-title">{layer.title}</h3>
                <ul className="layer-description">
                  {layer.description.map((desc, index) => (
                    <li key={index}>{desc}</li>
                  ))}
                </ul>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LuxuryLayers;
