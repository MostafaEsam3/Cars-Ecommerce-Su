// import React from 'react'
// import { Table } from 'antd'
import "./cart.css";
// import img from "./../../assets/g27cq4-500x500 1.png"
// import { Link } from 'react-router-dom';

// export default function Cart() {

//     const dataSource = [
//         {
//             key: '1',
//             Product: 'Mike',
//             age: 32,
//             address: '10 Downing Street',
//         },
//         {
//             key: '2',
//             Product: 'John',
//             age: 42,
//             address: '10 Downing Street',
//         },
//         {
//             key: '2',
//             Product: 'John',
//             age: 42,
//             address: '10 Downing Street',
//         },
//     ];

//     const columns = [
//         {
//             title: 'Product',
//             dataIndex: 'Product',
//             key: 'Product',
//             render: (Product) => (
//                 <div style={{ display: 'flex', alignItems: 'center' }}>
//                     <img
//                         src={img}
//                         alt="avatar"
//                         style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 10 }}
//                     />
//                     {Product}
//                 </div>
//             ),

//         },
//         {
//             title: 'Price',
//             dataIndex: 'age',
//             key: 'age',
//         },
//         {
//             title: 'Quantity',
//             dataIndex: 'address',
//             key: 'address',
//         },
//         {
//             title: 'Subtotal',
//             dataIndex: 'address',
//             key: 'address',
//         },
//         {
//             title: 'update',
//             dataIndex: 'address',
//             key: 'address',
//             render: (address) => (
//                 <div style={{ display: 'flex', alignItems: 'center' }}>
//                     {/* <img
//                         src={img}
//                         alt="avatar"
//                         style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 10 }}
//                     /> */}
//                     <button className="btn btn-success">
//                         <i className="fa fa-pencil"></i>
//                     </button>
//                     <Link to={`/sign/${address}`}>
//                         <button className="btn btn-danger ms-2">
//                             <i className="fa fa-trash"></i>
//                         </button>
//                     </Link>
//                 </div>
//             ),

//         },

//     ];
//     const rowClassName = (record, index) => {
//         // Alternate row background color
//         return index % 2 === 0 ? 'black-row' : 'green-row';
//     };
//     return (
//         <>
//             <div className='mt-3 container'>
//                 <Table dataSource={dataSource} columns={columns} rowClassName={rowClassName}
//                     components={{
//                         header: {
//                             cell: (props) => <th {...props} style={{}} />,
//                         },
//                     }}

//                 />
//                 <div className='d-flex justify-content-between align-items-center'>
//                     <button className='btn btn- border-black rounded-0'>Return</button>
//                     <button className='btn btn- border-black rounded-0'>Update</button>
//                 </div>
//                 <div className='mt-5  '>
//                     <div className='row p-0 m-0 g-0 justify-content-between'>
//                         <div className='col-12 col-md-5 d-flex mb-2 mb-md-0'>
//                             <div className='w-50'>
//                                 <input type="text" name="" className='form-control  border-black rounded-0 ' id="" placeholder='Coupon Code' />
//                             </div>
//                             <div>
//                                 <button className='btn btn- border-black rounded-0 ms-2'>Apply Cupon    </button>
//                             </div>
//                         </div>
//                         <div className="col-12 col-md-6 p-3 border border-dark rounded-0">
//                             <h5>Cart</h5>
//                             {
//                                 dataSource.map((item, index) => {
//                                     return (
//                                         <div key={index}> {/* Add a unique key for each item */}
//                                             <div className="d-flex align-items-center justify-content-between">
//                                                 {
//                                                     index == 0 ? <span>Subtotal:</span> : index == 1 ? <span>shipping:</span> : <span>total:</span>
//                                                 }
//                                                 <span>1133$</span>
//                                             </div>
//                                             <div className="border-bottom border-2 border-dark rounded-0 my-2"></div> {/* Adds spacing between rows */}
//                                         </div>
//                                     );
//                                 })
//                             }
//                             <div className='m-auto text-center'>
//                                 <button className='btn btn-danger text-center'>Procees to checkout</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//         </>
//     )
// }
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

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
    description: "مقعدين ",
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
      // حفظ بيانات المجموعة الأولى
      group1Image: image.src,
      group1Name: image.description,
    });
  };
  // دالة لإضافة المنتج إلى السلة
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
    };

    // حفظ العناصر الحالية أو إضافة الجديد
    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedCart = [...existingCart, newItem];
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    // التوجيه إلى الصفحة المطلوبة
    navigate("/invoice");
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
  const handleSelectCar = (carName) => {
    setSelectedCar(carName);
  };
  const handleSelectImageGroup2 = (image) => {
    setSelectedLargeImage(image);
    setQuantity(1);
  };
  return (
    <div className="container py-5">
      <h2 className="text-center mb-5">سلتي</h2>

      <div className="row">
        <div className="col-12 col-md-6">
          <h4>تلبيسة الليزر</h4>
          <p>اختر لون التلبيسة*</p>
          <div className="row row-cols-3 g-4">
            {imagesGroup1.map((image) => (
              <div key={image.id} className="col">
                <div className="position-relative image-container">
                  {/* تحويل الصورة إلى motion.div */}
                  <motion.img
                    src={image.src}
                    alt={image.title}
                    className={`img-fluid rounded border image-hover ${getBorderClass(
                      image,
                      1
                    )}`}
                    style={{
                      cursor: "pointer",
                      maxHeight: "200px",
                      width: "100%",
                    }}
                    onClick={() => handleSelectImageGroup1(image)}
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
                      src={image.src}
                      alt={image.title}
                      className="img-fluid rounded shadow"
                      style={{ maxHeight: "150px", width: "100%" }}
                    />
                    <button
                      className="btn position-absolute bottom-0 start-0 w-100 video-button video-button-green"
                      onClick={() => openVideoModal(image.videoSrc)}
                    >
                      اضغط هنا لمشاهدة الفيديو
                    </button>
                  </motion.div>

                  {/* تعديل موقع الأيقونة */}
                  <FaSearch
                    onClick={() => openModal(image)}
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
                <p className="text-center mt-2">{image.description}</p>
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
              {imagesGroup2.map((image) => (
                <div key={image.id} className="col">
                  <div className="position-relative image-container">
                    {/* الصورة الرئيسية */}
                    <motion.img
                      src={image.src}
                      alt={image.title}
                      className={`img-fluid rounded border image-hover ${getBorderClass(
                        image,
                        2
                      )}`}
                      style={{
                        cursor: "pointer",
                        maxHeight: "200px",
                        width: "100%",
                      }}
                      onClick={() => {
                        setSelectedSmallImage(image);
                        setSelectedLargeImage(image);
                      }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />

                    <motion.div
                      className="position-absolute hover-image"
                      initial={{
                        opacity: 0,
                        scale: 0.9,
                        rotate: -10,
                        visibility: "hidden",
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        rotate: 0,
                        visibility: "visible",
                      }}
                      whileHover={{ opacity: 1, scale: 1.2, rotate: 5 }}
                      transition={{
                        opacity: { duration: 0.4 },
                        scale: { duration: 0.5, ease: "easeOut" },
                        rotate: { duration: 0.5, ease: "easeOut" },
                      }}
                    >
                      <img
                        src={image.src}
                        alt={image.title}
                        className="img-fluid rounded shadow"
                        style={{ maxHeight: "150px", width: "100%" }}
                      />
                    </motion.div>

                    {/* زر البحث */}
                    <FaSearch
                      onClick={() => openModal(image)}
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

                  <p className="text-center mt-2">{image.description}</p>
                  <p className="text-center mt-2">ر.س{image.price}</p>
                </div>
              ))}
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
                  {/* عرض النتائج المصنفة */}
                  {cars.length > 0 ? (
                    cars
                      .filter((car) => car.visible !== false) // فقط السيارات التي تطابق النص المدخل
                      .map((car, index) => (
                        <li key={index}>
                          <a
                            className="dropdown-item d-flex align-items-center"
                            href="#"
                            onClick={() => handleSelectCar(car.name)}
                          >
                            <img
                              src={car.image.thumb}
                              alt={car.name}
                              style={{
                                width: "30px",
                                height: "30px",
                                marginRight: "10px",
                              }}
                            />
                            {car.name}
                          </a>
                        </li>
                      ))
                  ) : (
                    <li>
                      <a className="dropdown-item">لا توجد سيارات</a>
                    </li>
                  )}
                </ul>
              </div>

              {selectedCar && (
                <div className="mt-3">
                  <h5>السيارة المختارة: {selectedCar}</h5>
                  <img
                    src={
                      cars.find((car) => car.name === selectedCar)?.image.thumb
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
              <div className="mt-4">
                <label htmlFor="carModel">موديل {selectedCar}</label>
                <select
                  id="carModel"
                  className="form-select"
                  value={selectedCar ? `${selectedCar}` : ""}
                  disabled
                >
                  <option value="">
                    {selectedCar ? ` ${selectedCar}` : "اختر موديل"}
                  </option>
                </select>
              </div>
              <div className="mt-4">
                <label htmlFor="carModel">سنة التصنيع {selectedCar}</label>
                <select
                  id="carModel"
                  className="form-select"
                  value={selectedCar ? `${selectedCar}` : ""}
                  disabled
                >
                  <option value="">
                    {selectedCar ? ` ${selectedCar}` : "اختر موديل"}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-12 text-center">
              <h3>إجمالي السعر</h3>

              {/* عرض السعر */}
              <p>
                <strong>السعر: </strong>
                {selectedLargeImage && selectedLargeImage.price
                  ? (
                      parseFloat(
                        selectedLargeImage.price.replace("ر.س", "").trim()
                      ) * quantity
                    ).toFixed(2) + " ر.س"
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
                  ? (
                      parseFloat(
                        selectedLargeImage.price.replace("ر.س", "").trim()
                      ) * quantity
                    ).toFixed(2) + " ر.س"
                  : "لم يتم اختيار صورة"}
              </p>

              {/* زر إضافة إلى السلة */}
              <button className="btn btn-success" onClick={handleAddToCart}>
                أضف إلى السلة
              </button>
            </div>
          </div>
        </div>

        {/* القسم الأيمن: عرض الصورة الكبيرة */}
        <div className="col-12 col-md-6">
          {selectedSmallImage && (
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
                src={selectedSmallImage.src}
                alt={selectedSmallImage.title}
                className={`img-fluid rounded ${
                  selectedLargeImage?.id === selectedSmallImage.id
                    ? "border-primary"
                    : ""
                }`}
                style={{ maxHeight: "600px", width: "100%" }}
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
