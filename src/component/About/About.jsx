// import React from 'react';
// import sideStory from "./../../assets/Side Image (1).svg"
// import card1 from "./../../assets/Icon-Sale (1).svg"
// import cardman from "./../../assets/image 46.svg"



// const About = () => {
//     return (
//         <>
//             <div className=''>
//                 <div className='our_story row g-0 mt-4 align-items-center justify-content-between'>
//                     <div className='col-4 ' style={{ marginLeft: "180px" }}>
//                         <h1 className='mb-3 fw-bold'>Our Story</h1>
//                         <p className='mb-3'>Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region. </p>
//                         <p>Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.</p>
//                     </div>

//                     <div className='col-6  d-flex  justify-content-start ' style={{ direction: "rtl" }}>
//                         <img src={sideStory} alt="" width={'90%'} style={{ objectFit: "cover" }} />
//                     </div>
//                 </div>
//             </div>


//             <div className='container  p-0 mt-4'>

//                 <div className='row g-0 p-0 m-0 justify-content-between'>
//                     <div className='col-6 col-md-2 text-center p-4 border border-1 border-secondary-subtle '>
//                         <div >
//                             <div>
//                                 <img className='img-fluid ' src={card1} alt="mobilePhone" />
//                             </div>
//                             <div className='mt-2'>
//                                 <span className='fw-bold'>10.5k </span>
//                             </div>
//                             <div>
//                                 <span className='text-muted'>Sallers active our site</span>
//                             </div>
//                         </div>


//                     </div>
//                     <div className='col-6 col-md-2 text-center p-4 border border-1 border-secondary-subtle  '>
//                         <div >
//                             <div>
//                                 <img className='img-fluid ' src={card1} alt="mobilePhone" />
//                             </div>
//                             <div className='mt-2'>
//                                 <span className='fw-bold'>10.5k </span>
//                             </div>
//                             <div>
//                                 <span className='text-muted'>Sallers active our site</span>
//                             </div>
//                         </div>
//                     </div>


//                     <div className='col-6 col-md-2 text-center p-4 border border-1 border-secondary-subtle '>
//                         <div >
//                             <div>
//                                 <img className='img-fluid ' src={card1} alt="mobilePhone" />
//                             </div>
//                             <div className='mt-2'>
//                                 <span className='fw-bold'>10.5k </span>
//                             </div>
//                             <div>
//                                 <span className='text-muted'>Sallers active our site</span>
//                             </div>
//                         </div>


//                     </div>


//                     <div className='col-6 col-md-2 text-center p-4 border border-1 border-secondary-subtle '>
//                         <div >
//                             <div>
//                                 <img className='img-fluid ' src={card1} alt="mobilePhone" />
//                             </div>
//                             <div className='mt-2'>
//                                 <span className='fw-bold'>10.5k </span>
//                             </div>
//                             <div>
//                                 <span className='text-muted'>Sallers active our site</span>
//                             </div>
//                         </div>
//                     </div>

//                 </div>


//                 <div className='img-card p-3 bg-info text-center col-4'>
//                     <img src={cardman} alt="" width={236} height={391}style={{objectFit:"cover"}}/>
//                 </div>

//             </div>

//         </>
//     );
// }

// export default About;
import React, { useRef, useEffect, useState } from "react";
import { gsap, wrap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./About.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";


gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const boxRef = useRef(null);
  const wordsRefs = useRef([]);
  const textContainerRef = useRef(null);
  const sectionRef = useRef(null);
  const [alternateWord, setAlternateWord] = useState("أمان");
  const imageRef = useRef(null);

  useEffect(() => {
    if (!boxRef.current || !textContainerRef.current) return;
  
    const textWidth = textContainerRef.current.offsetWidth;
    const words = wordsRefs.current;
  
    // ضبط التعتيم الأولي للنصوص
    words.forEach((word) => {
      gsap.set(word, { opacity: 0 });
    });
  
    // تحريك المربع
    const tl = gsap.timeline();
    tl.to(boxRef.current, {
      x: textWidth,
      rotation: 360,
      duration: 2,
      ease: "power1.inOut",
    }).to(boxRef.current, {
      x: 0,
      rotation: 720,
      duration: 2,
      ease: "power1.inOut",
      onUpdate: () => {
        const boxX = gsap.getProperty(boxRef.current, "x");
        words.forEach((word) => {
          if (!word) return; // تحقق من وجود الكلمة
          const wordPosition = word.offsetLeft;
          if (boxX > wordPosition - 10 && boxX < wordPosition + 50) {
            gsap.to(word, { opacity: 1, duration: 0.5 });
          }
        });
      },
    });
  
    // تبديل الكلمات
    const wordInterval = setInterval(() => {
      setAlternateWord((prevWord) => (prevWord === "أمان" ? "نظافة" : "أمان"));
    }, 2000);
  
    // تحريك القسم
    const scrollAnimation = gsap.fromTo(
      sectionRef.current,
      { scale: 0.5, opacity: 0.3 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "top center",
          scrub: true,
        },
      }
    );
  
    // تنظيف عند الخروج
    return () => {
      clearInterval(wordInterval); // تنظيف الـ Interval
      scrollAnimation.kill(); // إزالة التحريك
    };
  }, []);
  
  useEffect(() => {
    const counters = [
      { id: "#counter-clients", endValue: 76259 },
      { id: "#counter-covers", endValue: 700 },
      { id: "#counter-deliveries", endValue: 34539 },
    ];
  
    const triggers = counters.map(({ id, endValue }) =>
      ScrollTrigger.create({
        trigger: "#counter-section",
        start: "top 75%",
        onEnter: () => {
          gsap.fromTo(
            id,
            { innerText: 0 },
            {
              innerText: endValue,
              duration: 3,
              ease: "power1.inOut",
              snap: { innerText: 1 },
              onUpdate: function () {
                const element = document.querySelector(id);
                if (element) {
                  element.innerText = Math.ceil(this.targets()[0].innerText);
                }
              },
            }
          );
        },
        onLeaveBack: () => {
          const element = document.querySelector(id);
          if (element) {
            element.innerText = "0";
          }
        },
      })
    );
  
    // تنظيف التريجرات عند إلغاء المكون
    return () => triggers.forEach((trigger) => trigger.kill());
  }, []);
  
  
  
  

  return (
    <div>
      {/* القسم الأول */}
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: "10px",
        }}
      >
        <div
          ref={textContainerRef}
          style={{
            position: "relative",
            width: "35%",
            textAlign: "center",
            direction: "rtl",
          }}
        >
          {/* الصورة */}
          <img
            ref={boxRef}
            src="/لوجو_السيارات-removebg-preview.png"
            alt="Animated Box"
            style={{
              width: "100px",
              height: "100px",
              position: "absolute",
              left: 0,
              top: "30%",
              transform: "translateY(-50%)",
              borderRadius: "10px",
              maxWidth: "100%",
            }}
          />

          {/* النص */}
          <h1
            style={{
              fontSize: "34px",
              fontWeight: "bold",
              color: "#333",
              margin: 0,
              position: "relative",
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            {["مع", "كابيتانو", "سيارتك", "في", alternateWord].map((word, index) => (
              <span
                key={index}
                ref={(el) => (wordsRefs.current[index] = el)}
                style={{
                  opacity: 0,
                  transition: "opacity 0.4s",
                  color: word === "أمان" || word === "نظافة" ? "#919e04" : "#333",
                }}
              >
                {word}
              </span>
            ))}
          </h1>
        </div>
      </div>

      {/* القسم الثاني */}
      <div ref={sectionRef}>
  <div className="section-container">
    {/* النصف الأيمن للنص */}
    <div className="text-section">
      <h2>لماذا مؤسسة كابيتانو للتجارة هي الأفضل في التلبيسات والأكثر مبيعًا في السوق السعودي؟</h2>
      <ul style={{padding:"120px",fontSize:"2vh",listStyle:"none"}}>
        <li>١.الجودة الفائقة في كل شيء هي قيمتنا العليا، ونعمل على ذلك طوال الوقت بدءًا من الخامات، ومرورًا بالتصنيع، وانتهاءً بالمنتج الأخير.</li>
        <li>٢.نستخدم جلود فاخرة وصديقة للبيئة، خضعت لاختبارات علمية دقيقة للوصل إلى منتجات بلاكو المميزة.</li>
        <li>٣.تنوع منتجات بلاكو من حيث الأشكال والألوان، بما يناسب جميع الأذواق مع نفس الجودة المعهودة في كل المنتجات.</li>
        <li>٤. التنفيذ المتقن...</li>
        <li>٥. نحترم وقت عملائنا...</li>
        <li>٦. بإمكاننا أن نصلك...</li>
      </ul>
    </div>

    {/* النصف الأيسر للصورة */}
    <div className="image-section">
      <img src="/About.png" alt="About" />
    </div>
  </div>
</div>
<div style={{ padding: "20px", backgroundColor: "#f9f9f9" }}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        style={{
          width: "80%", 
          height: "auto", 
          margin: "0 auto", 
        }}
      >
        <SwiperSlide>
          <img
            src="/logo.png"
            alt="Slide 1"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/الوان.png"
            alt="Slide 2"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/Swiper.png"
            alt="Slide 3"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/كابيتانو.png"
            alt="Slide 3"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </SwiperSlide>
      </Swiper>
    </div>
    <div
  id="counter-section"
  style={{
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: "20px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
  }}
>
  {/* العداد الأول */}
  <div style={{ textAlign: "center" }}>
    <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>عدد العملاء</h2>
    <h1
      id="counter-clients"
      style={{
        fontSize: "48px",
        color: "#919e04",
        fontWeight: "bold",
      }}
    >
      0
    </h1>
    <p style={{ fontSize: "16px", color: "#555" }}>76K</p>
  </div>

  {/* العداد الثاني */}
  <div style={{ textAlign: "center" }}>
    <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>عدد التلبيسات الأسبوعية</h2>
    <h1
      id="counter-covers"
      style={{
        fontSize: "48px",
        color: "#ff6347",
        fontWeight: "bold",
      }}
    >
      0
    </h1>
    <p style={{ fontSize: "16px", color: "#555" }}>+700</p>
  </div>

  {/* العداد الثالث */}
  <div style={{ textAlign: "center" }}>
    <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>عدد التوصيلات</h2>
    <h1
      id="counter-deliveries"
      style={{
        fontSize: "48px",
        color: "#1e90ff",
        fontWeight: "bold",
      }}
    >
      0
    </h1>
    <p style={{ fontSize: "16px", color: "#555" }}>34K</p>
  </div>
</div>

{/* شريط الإعلان مع صورة في بداية كل رسالة */}
<div className="announcement-ticker">
  <div className="ticker-text">
    <div className="ticker-item">
      <span style={{color:"#919e04"}}>تابعنا للحصول على أحدث العروض والمنتجات!</span>
    </div>
    <div className="ticker-item">
      {/* <img src="/logo.png" alt="Logo" className="ticker-logo" /> */}
      <span>منتجاتنا هي الأفضل للسوق السعودي - جلود فاخرة وصديقة للبيئة.</span>
    </div>
    <div className="ticker-item">
      <span>أهلاً وسهلاً بك مع كابيتانو - التميز هو شعارنا!</span>
      {/* <img src="/logo.png" alt="Logo" className="ticker-logo" /> */}
      <img src="/capitano_brandai_1_.pdf_-_Personal_-_Microsoft__Edge_12_12_2024_09_42_06_ص-removebg-preview.png" alt="Logo" className="ticker-logo" />
    </div>
  </div>
</div>



    </div>
  );
};

export default About;


