import React, { useEffect, useState } from "react";
import "./Slider.css";
import { Helmet } from "react-helmet";

export default function Slide() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    fetch("https://api.admin.kapitiano.com/api/all-banners")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data) {
          setBanners(data.data);
        }
      })
      .catch((error) => {
        console.error("❌ Error fetching banners:", error);
      });
  }, []);

  useEffect(() => {
    // 🔥 Inject JS script after banners are loaded
    if (banners.length > 0) {
      const script = document.createElement("script");
      script.src = "/hello.js"; // مسار ملفك
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [banners]);

  return (
    <>
      <div className="carousel-h">
        <div className="list">
          {banners.length > 0 ? (
            banners.map((banner) => (
              <div className="item" key={banner.id}>
                <img
                  src={
                    banner.image.startsWith("http")
                      ? banner.image
                      : `https://api.admin.kapitiano.com${banner.image}`
                  }
                  alt={banner.title}
                />
                <div className="introduce">
                  <div className="topic">{banner.title}</div>
                  <div className="des">{banner.description}</div>
                </div>
                <div className="detail">
                  <div className="title">{banner.title}</div>
                  <div className="des">{banner.description}</div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">🚀 جاري تحميل البنرات...</p>
          )}
        </div>
      </div>

      {/* Helmet to inject hello.js (if needed) */}
      <Helmet>
        <script src="/hello.js" />
      </Helmet>
    </>
  );
}
