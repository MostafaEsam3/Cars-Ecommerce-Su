
import "./cart.css";

import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ADD_TO_CART } from "../../redux/Types/types";
import { v4 as uuidv4 } from 'uuid';

const imagesGroup1 = [
  {
    id: 1,
    src: "https://www.bleco.sa/wp-content/uploads/2024/07/%D8%A7%D9%84%D9%84%D9%8A%D8%B2%D8%B1-3.jpg",
    title: "صورة 1",
    description: "أسود تطريز أسود",
    videoSrc: "/توضيح لون تلبيسة الفاخر لون جملي تطريز جملي.mp4",
  },
  {
    id: 2,
    src: "https://www.bleco.sa/wp-content/uploads/2024/07/%D8%A7%D9%84%D9%84%D9%8A%D8%B2%D8%B1-1.jpg",
    title: "صورة 2",
    description: "بني تطريز ليزر",
    videoSrc: "/توضيح لون تلبيسة الفاخر لون جملي تطريز جملي.mp4",
  },
  {
    id: 3,
    src: "https://www.bleco.sa/wp-content/uploads/2024/07/%D8%A7%D9%84%D9%84%D9%8A%D8%B2%D8%B1-4.jpg",
    title: "صورة 3",
    description: "رصاصي تطريز ليزر",
    videoSrc: "/توضيح لون تلبيسة الفاخر لون جملي تطريز جملي.mp4",
  },
];

const imagesGroup2 = [
  {
    id: 4,
    src: "https://www.bleco.sa/wp-content/uploads/2023/09/02-min.webp",
    title: "صورة 4",
    description: "3مقاعد ",
    price: "330.00",
  },
  {
    id: 5,
    src: "https://www.bleco.sa/wp-content/uploads/2023/09/05-min.webp",
    title: "صورة 5",
    description: "  خمس مقاعد",
    price: "630.00",
  },
  {
    id: 6,
    src: "https://www.bleco.sa/wp-content/uploads/2023/09/07-min.webp",
    title: "صورة 6",
    description: "سبع مقاعد",
    price: "500.00",
  },
];

const Cart = () => {
  const [selectedSmallImage, setSelectedSmallImage] = useState(null);
  const [selectedLargeImage, setSelectedLargeImage] = useState(null);
  const [savedGroup1Data, setSavedGroup1Data] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState("");
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const handleSelectImageGroup1 = (image) => {
    setSelectedSmallImage(image);
    setSavedGroup1Data({
      group1Image: image.src,
      group1Name: image.description,
    });
  };
  const [selectedCarId, setSelectedCarId] = useState(null); // حفظ ID السيارة المختارة

  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/order/12")
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data); // طباعة البيانات في الكونسول
        setApiData(data.data); // تخزين البيانات في state
  
        // استخراج أنواع المقاعد المتاحة من API
        const seatTypes = new Set();
        Object.values(data.data).forEach((item) => {
          if (item.car_type) {
            item.car_type.forEach((type) => seatTypes.add(type.type));
          }
        });
        setAvailableSeats([...seatTypes]); // حفظ أنواع المقاعد المتاحة
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  
  const [availableSeats, setAvailableSeats] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/order/12") // API لجلب البيانات
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);
        setApiData(data.data); // حفظ البيانات
  
        // استخراج أنواع السيارات المتاحة
        const carBrands = new Set();
        Object.values(data.data).forEach((item) => {
          if (item.brand) {
            carBrands.add({ name: item.brand, image: item.brand_image });
          }
        });
        setCars([...carBrands]); // تحديث السيارات
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  
  const [carModels, setCarModels] = useState([]);
  const [selectedCarModel, setSelectedCarModel] = useState(null);
  
  useEffect(() => {
    if (selectedCarId) {
      fetch(`http://127.0.0.1:8000/api/products/order/models/${selectedCarId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Car Models API Response:", data); // ✅ طباعة الاستجابة كاملة
          setCarModels(data.data); // حفظ بيانات الموديلات
  
          // ✅ التحقق مما إذا كانت الصور موجودة لكل موديل
          data.data.forEach((model) => {
            console.log(`Model ID: ${model.id}, Name: ${model.name}`);
            console.log("Start Year Image:", model.image_start_year || "🚨 لا يوجد صورة!");
            console.log("End Year Image:", model.image_end_year || "🚨 لا يوجد صورة!");
          });
        })
        .catch((error) => console.error("Error fetching models:", error));
    }
  }, [selectedCarId]); // استدعاء عند تغيير ID السيارة المختارة
  
  
  
  
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    const newItem = {
      // بيانات المجموعة الثانية
      id: selectedLargeImage?.id || null,
      name: selectedLargeImage?.description || "",
      image: selectedLargeImage?.src || "",
      price: selectedLargeImage?.price || 0,
      quantity: quantity,
      totalPrice: parseFloat(selectedLargeImage?.price || 0) * quantity,

      // بيانات المجموعة الأولى (المحفوظة)
      group1Image: savedGroup1Data?.group1Image || "",
      group1Name: savedGroup1Data?.group1Name || "",

      // بيانات السيارة
      carName: selectedCar || "",
      carImage: cars.find((car) => car.name === selectedCar)?.image.thumb || "", // صورة شعار السيارة
      uniqueId: uuidv4(),

    };
    dispatch({ type: ADD_TO_CART, payload: newItem });
    console.log("Adding to Cart:", newItem);
    // حفظ العناصر الحالية أو إضافة الجديد
    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedCart = [...existingCart, newItem];
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    // التوجيه إلى الصفحة المطلوبة
    navigate("/invoice");
  };

  const handleAddAnotherOrder = () => {
    const newItem = {
      // بيانات المجموعة الثانية
      id: selectedLargeImage?.id || null,
      name: selectedLargeImage?.description || "",
      image: selectedLargeImage?.src || "",
      price: selectedLargeImage?.price || 0,
      quantity: quantity,
      totalPrice: parseFloat(selectedLargeImage?.price || 0) * quantity,

      // بيانات المجموعة الأولى (المحفوظة)
      group1Image: savedGroup1Data?.group1Image || "",
      group1Name: savedGroup1Data?.group1Name || "",

      // بيانات السيارة
      carName: selectedCar || "",
      carImage: cars.find((car) => car.name === selectedCar)?.image.thumb || "", // صورة شعار السيارة
      uniqueId: uuidv4(),
    };

    dispatch({ type: ADD_TO_CART, payload: newItem });
    console.log("Adding another order to Cart:", newItem);

    // حفظ العناصر الحالية أو إضافة الجديد
    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedCart = [...existingCart, newItem];
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    // إعادة تعيين الخيارات
    removeSelection();
  };

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch((error) => console.error("Error loading data:", error));
  }, []);
  console.log(cars);

  const openModal = (image) => {
    setSelectedLargeImage(image);
    setIsModalVisible(true);
  };

  const openVideoModal = (videoUrl) => {
    setVideoSrc(videoUrl);
    setIsModalVisible(true);
  };

  // إغلاق الـ Modal
  const closeModal = () => {
    setIsModalVisible(false);
    setVideoSrc("");
  };

  const removeSelection = () => {
    setSelectedSmallImage(null);
    setSelectedLargeImage(null);
    setSavedGroup1Data(null);
  };

  const getBorderClass = (image, group) => {
    const selectedImage = group === 1 ? selectedSmallImage : selectedLargeImage;
    return selectedImage && selectedImage.id === image.id
      ? "border-primary"
      : "";
  };
  const handleSelectChange = (event) => {
    setSelectedCar(event.target.value);
  };
  const handleSelectCar = (carId, carName) => {
    setSelectedCar(carName); // حفظ اسم السيارة
    setSelectedCarId(carId); // حفظ معرف السيارة
  };
  
  const handleSelectImageGroup2 = (image) => {
    setSelectedLargeImage(image);
    setQuantity(1);
  };
  console.log(selectedSmallImage, selectedLargeImage)
  return (
    <div className="container py-5">
      <h2 className="text-center mb-5">سلتي</h2>

      <div className="row">
        <div className="col-12 col-md-6">
          <h4>تلبيسة الليزر</h4>
          <p>اختر لون التلبيسة*</p>
          <div className="row row-cols-3 g-4">
          {apiData &&
  Object.values(apiData).map((item) => (
    <div key={item.id} className="col">
      <div className="position-relative image-container">
        {/* تحويل الصورة إلى motion.div */}
        <motion.img
          src={item.image} // الصورة القادمة من API
          alt={item.description}
          className={`img-fluid rounded border image-hover ${getBorderClass(
            item,
            1
          )}`}
          style={{
            cursor: "pointer",
            height: "200px", // جعل الارتفاع ثابتًا
            width: "100%", // جعل العرض متجاوبًا مع الحاوية
            objectFit: "cover" // التأكد من أن الصورة مغطية بالكامل دون تشويه
          }}
          onClick={() => handleSelectImageGroup1(item)}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />

        <motion.div
          className="position-absolute hover-image"
          initial={{ opacity: 0, scale: 0.9, visibility: "hidden" }}
          animate={{ opacity: 1, scale: 1, visibility: "visible" }}
          whileHover={{ opacity: 1, scale: 1.1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <img
            src={item.image}
            alt={item.description}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "150px", width: "100%" }}
          />
          <button
            className="btn position-absolute bottom-0 start-0 w-100 video-button video-button-green"
            onClick={() => openVideoModal(item.videoSrc)}
          >
            اضغط هنا لمشاهدة الفيديو
          </button>
        </motion.div>

        {/* تعديل موقع الأيقونة */}
        <FaSearch
          onClick={() => openModal(item)}
          className="position-absolute bg-black text-white rounded-circle p-2"
          style={{
            cursor: "pointer",
            bottom: "10px",
            right: "10px",
            fontSize: "30px",
            color: "white",
          }}
        />
      </div>

      {/* النص تحت كل صورة */}
      <p className="text-center mt-2">{item.description}</p>
    </div>
  ))}

          </div>

          {/* عرض المجموعة الثانية من الصور */}
          <div className="mt-5">
            <div className="mt-4">
              <p>
                <strong>ما هو نوع السيارة؟*</strong>
              </p>
              <p>الخيارات الموجودة حسب المواصفات السعودية فقط</p>
            </div>
            <div className="row row-cols-3 g-4">
  {apiData &&
    Object.values(apiData).map((item) =>
      (item.car_type || []).map((carType) => {
        // البحث عن الصورة المطابقة لنوع المقاعد
        const matchedImage = imagesGroup2.find(
          (image) => image.description.includes(`${carType.type}`)
        );

        return (
          matchedImage && ( // التأكد من وجود تطابق وعرض العنصر فقط إذا وُجد
            <div key={`${item.id}-${carType.id}`} className="col">
              <div className="position-relative image-container">
                <motion.img
                  src={matchedImage.src} // الصورة من البيانات الثابتة
                  alt={matchedImage.description}
                  className="img-fluid rounded border image-hover"
                  style={{ cursor: "pointer", maxHeight: "200px", width: "100%" }}
                  onClick={() =>
                    setSelectedLargeImage({
                      id: carType.id,
                      description: matchedImage.description,
                      src: matchedImage.src,
                      price: carType.price, // السعر القادم من API
                    })
                  }
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-center mt-2">
                {matchedImage.description} - 
                <strong>{` السعر: ${carType.price} ر.س`}</strong>
              </p>
            </div>
          )
        );
      })
    )}
</div>



          </div>

          <div className="text-center mt-4">
            <button
              className="btn"
              style={{
                backgroundColor: "#0C4B57",
                color: "#fff",
                borderColor: "#0C4B57",
              }}
              onClick={removeSelection}
            >
              إزالة الخيارات
            </button>
          </div>

          <h2 className="text-center mb-5">اختر السيارة</h2>

          <div className="row">
  <div className="col-12">
    <label htmlFor="carSelect">اختر السيارة</label>

    <div className="dropdown">
      <button
        className="btn w-100 btn-outline-to-filled"
        type="button"
        id="carSelect"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {selectedCar ? selectedCar : "اختر سيارة"}
      </button>

      <ul
        className="dropdown-menu w-100"
        style={{
          maxHeight: "300px",
          overflowY: "auto",
        }}
      >
        {/* حقل البحث */}
        <li className="p-2">
          <input
            type="text"
            className="form-control"
            placeholder="ابحث عن السيارة..."
            onChange={(e) =>
              setCars(
                cars.map((car) => ({
                  ...car,
                  visible: car.name
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase()),
                }))
              )
            }
          />
        </li>

        {/* عرض البراندات من الـ API */}
        {apiData && apiData.brands && apiData.brands.length > 0 ? (
  apiData.brands.map((brand) => (
    <li key={brand.id}>
      <a
        className="dropdown-item"
        href="#"
        onClick={() => handleSelectCar(brand.id, brand.name)}
      >
        {brand.name}
      </a>
    </li>
  ))
) : (
  <li>
    <a className="dropdown-item">لا توجد براندات</a>
  </li>
)}

      </ul>
    </div>

    {selectedCar && (
      <div className="mt-3">
        <h5>السيارة المختارة: {selectedCar}</h5>
        <img
          src={
            apiData &&
            Object.values(apiData).find((item) => item.brand === selectedCar)
              ?.brand_image
          }
          alt={selectedCar}
          style={{
            width: "100px",
            height: "100px",
            display: "block",
          }}
        />
      </div>
    )}

    {/* عرض موديل وسنة التصنيع */}
   {/* اختيار موديل السيارة */}
{selectedCar && carModels.length > 0 && (
  <div className="mt-4">
    <label htmlFor="carModel">اختر موديل {selectedCar}</label>
    <select
      id="carModel"
      className="form-select"
      onChange={(e) => setSelectedCarModel(e.target.value)}
    >
      <option value="">اختر الموديل</option>
      {carModels.map((model) => (
        <option key={model.id} value={model.id}>
          {model.name}
        </option>
      ))}
    </select>
  </div>
)}

{/* اختيار سنة التصنيع */}
{/* اختيار سنة التصنيع */}
{/* اختيار سنة التصنيع */}
{selectedCarModel && (
  <div className="mt-4">
    <label htmlFor="carYear">اختر سنة التصنيع</label>
    <select
      id="carYear"
      className="form-select"
      onChange={(e) => setSelectedCarModel(e.target.value)}
    >
      {carModels
        .filter((model) => model.id === parseInt(selectedCarModel))
        .map((model) => {
          const years = [];

          // إضافة السنة الأولى
          years.push({ label: `${model.start_year} ❗`, value: model.start_year, type: "start" });

          // إضافة السنوات المتوسطة بشكل فترات
          for (let year = model.start_year; year < model.end_year; year++) {
            if (year + 1 !== model.end_year) {
              years.push({ label: `${year}-${year + 1}`, value: `${year}-${year + 1}`, type: "middle" });
            }
          }

          // إضافة السنة الأخيرة
          years.push({ label: `${model.end_year} ❗`, value: model.end_year, type: "end" });

          return (
            <React.Fragment key={model.id}>
              {years.map((year, index) => (
                <option key={index} value={year.value}>
                  {year.label}
                </option>
              ))}
            </React.Fragment>
          );
        })}
    </select>
  </div>
)}

{/* عرض الصور عند الضغط على علامة التعجب */}
{selectedCarModel && (
  <div className="mt-3 text-center">
    {carModels.map((model) =>
      model.start_year.toString() === selectedCarModel ? (
        <button
          key="startImage"
          className="btn btn-light"
          onClick={() => {
            setVideoSrc(model.image_start_year);
            setIsModalVisible(true);
          }}
        >
          <img
            src={model.image_start_year}
            alt="صورة الموديل البداية"
            className="img-fluid rounded"
            style={{ width: "150px", height: "100px", borderRadius: "8px", cursor: "pointer" }}
          />
        </button>
      ) : model.end_year.toString() === selectedCarModel ? (
        <button
          key="endImage"
          className="btn btn-light"
          onClick={() => {
            setVideoSrc(model.image_end_year);
            setIsModalVisible(true);
          }}
        >
          <img
            src={model.image_end_year}
            alt="صورة الموديل النهاية"
            className="img-fluid rounded"
            style={{ width: "150px", height: "100px", borderRadius: "8px", cursor: "pointer" }}
          />
        </button>
      ) : null
    )}
  </div>
)}

{/* مودال لعرض الصورة عند الضغط على السنة الأولى أو الأخيرة */}
<Modal show={isModalVisible} onHide={() => setIsModalVisible(false)} size="lg" centered>
  <Modal.Body>
    <img
      src={videoSrc}
      alt="صورة الموديل"
      className="w-100 img-fluid rounded"
    />
  </Modal.Body>
</Modal>





  </div>
</div>

          <div className="row mt-5">
            <div className="col-12 text-center">
              <h3>إجمالي السعر</h3>

              {/* عرض السعر */}
              <p>
  <strong>السعر: </strong>
  {selectedLargeImage && selectedLargeImage.price
    ? (() => {
        const priceValue = typeof selectedLargeImage.price === "string"
          ? parseFloat(selectedLargeImage.price.replace("ر.س", "").trim())
          : selectedLargeImage.price;

        return priceValue.toFixed(2) + " ر.س";
      })()
    : "لم يتم اختيار صورة"}
</p>


              <div className="mb-3">
                <label htmlFor="quantity" className="form-label">
                  العدد
                </label>
                <input
                  type="number"
                  id="quantity"
                  className="form-control"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>

              <p>
  <strong>إجمالي التكلفة: </strong>
  {selectedLargeImage && selectedLargeImage.price
    ? (() => {
        const priceValue = typeof selectedLargeImage.price === "string"
          ? parseFloat(selectedLargeImage.price.replace("ر.س", "").trim())
          : selectedLargeImage.price;

        return (priceValue * quantity).toFixed(2) + " ر.س";
      })()
    : "لم يتم اختيار صورة"}
</p>


              {/* زر إضافة إلى السلة */}
              <div className="text-center mt-4">
                <button
                  className="btn btn-success"
                  onClick={handleAddToCart}
                  disabled={
                    !selectedSmallImage || !selectedLargeImage || !selectedCar
                  }
                >
                  أضف إلى السلة
                </button>

                <button
                  className="btn btn-secondary ms-3"
                  onClick={handleAddAnotherOrder}
                  disabled={
                    !selectedSmallImage || !selectedLargeImage || !selectedCar
                  }
                >
                  إضافة طلب آخر
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* القسم الأيمن: عرض الصورة الكبيرة */}
        <div className="col-12 col-md-6">
  {/* عرض صورة التلبيسة */}
 {/* عرض صورة التلبيسة */}
{selectedSmallImage && selectedSmallImage.image && (
  <motion.div
    className="d-flex justify-content-center"
    initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
    animate={{ opacity: 1, scale: 1, rotate: 0 }}
    transition={{
      duration: 0.8,
      type: "spring",
      stiffness: 100,
      damping: 15,
    }}
  >
    <motion.img
      src={selectedSmallImage.image} // استخدام `image` بدلاً من `src`
      alt={selectedSmallImage.description || "التلبيسة المختارة"}
      className="img-fluid rounded"
      style={{ maxHeight: "300px", width: "100%" }}
      whileHover={{
        scale: 1.05,
        rotate: 3,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 10,
      }}
    />
  </motion.div>
)}


  {/* عرض صورة عدد المقاعد */}
  {selectedLargeImage && (
    <motion.div
      className="d-flex justify-content-center mt-4"
      initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
    >
      <motion.img
        src={selectedLargeImage.src}
        alt={selectedLargeImage.description}
        className="img-fluid rounded"
        style={{ maxHeight: "300px", width: "100%" }}
        whileHover={{
          scale: 1.05,
          rotate: 3,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 10,
        }}
      />
    </motion.div>
  )}
</div>

      </div>

      <Modal show={isModalVisible} onHide={closeModal} size="lg" centered>
        <Modal.Body>
          {videoSrc ? (
            <video width="100%" height="auto" controls>
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={selectedLargeImage ? selectedLargeImage.src : ""}
              alt={selectedLargeImage ? selectedLargeImage.title : ""}
              className="w-100 img-fluid rounded"
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Cart;
