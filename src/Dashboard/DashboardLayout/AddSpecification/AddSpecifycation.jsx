import axios from "axios";
import { useFormik } from "formik";
import React, { useState, useRef, useEffect, useMemo } from "react";
import * as Yup from "yup";
import imageSuccess from "./../../../assets/images.png";
import imageFail from "./../../../assets/images (1).png";
import DeleteModal from "../../../component/Modals/deleteModal";
import { Link } from "react-router-dom";
import { Table } from "antd";
import EditModal from "../../../component/Modals/EditModal";
import Filtr from "../../../component/Filtration/Filtration";
import { Notify, NotifyError } from "../../../component/Modals/Alert";
import { useFetchData } from "../../../hooks/useFetch";
import Swal from "sweetalert2";
import EditColor from "../../../component/Modals/EditColor";
import EditSpecification from "../../../component/Modals/EditSpecification";
import axiosInstance from "../../../util/interceptor";

export default function AddSpecification() {
  const imgInputRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState(""); // لتخزين الرسالة المعروضة في المودال
  const [modalType, setModalType] = useState(""); // لتحديد إذا كانت الرسالة فشل أم نجاح
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [obj, setobj] = useState({});
  // const [SpecifyData, setBrandData] = useState([])
  const {
    Data: SpecifyData,
    setData: setSpecifyData,
    fetchData: fetchSpecify,
  } = useFetchData("dashboard/specifications", "specificationsData");
  const {
    Data: ModelData,
    setData: setModelData,
    fetchData: fetchModels,
  } = useFetchData("dashboard/models", "modelData");
  const {
    Data: ProductData,
    setData: setProductData,
    fetchData: fetchProduct,
  } = useFetchData("dashboard/panelings", "panelingsData");
  const {
    Data: BrandData,
    setData: setBrandData,
    fetchData: fetchBrand,
  } = useFetchData("dashboard/brands", "brandData");

  const chairsNumber = [
    { name: "كرسيين", id: 2 },
    { name: "تلاث كراسي", id: 3 },
    { name: "خمس كراسي", id: 5 },
  ];
  const isConnect = [
    { name: "متصل", id: 1 },
    { name: " منفصل", id: 0 },
  ];

  useEffect(() => {
    fetchSpecify();
    fetchModels();
    fetchProduct();
    fetchBrand();
  }, []);

  // function add category
  const AddSpecify = async (data) => {
    try {
      const response = await axiosInstance.post(
        "dashboard/specifications", // تأكد من المسار الصحيح
        data, // البيانات التي تريد إرسالها
        {
          headers: {
            Accept: "application/json, text/plain, */*",
          },
        }
      );
      Swal.fire("تم ارسال البيانات بنجاح");
      console.log(response, "تم ارسال البيانات بنجاح");
      fetchSpecify();
    } catch (error) {
      console.error(error);
      // setModalType("failure");
      // setModalMessage(error.response.data.message);
      // setModalVisible(true);
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text: "خطأ في إرسال البيانات",
      });
    }
  };

  // fn validation input
  const formik = useFormik({
    initialValues: {
      paneling_id: "",
      model_id: "",
      brand_id: "",
      car_chairs: "",
      price: "",
      is_connect: "",
    },
    validationSchema: Yup.object({
      paneling_id: Yup.string().required("يرجي ادخال اسم منتج"),
      model_id: Yup.string().required("يرجي ادخال موديل"),
      brand_id: Yup.string().required("يرجي ادخال براند"),
      car_chairs: Yup.string().required("يرجي ادخال عدد المقاعد"),
      price: Yup.string().required("يرجي ادخال السعر"),
      is_connect: Yup.string().required("يرجي ادخال هل منفصل ولا متصل "),
    }),
    onSubmit: (values, { resetForm }) => {
      const payload = {
        paneling_id: values.paneling_id,
        brand_id: values.brand_id,
        car_chairs: values.car_chairs,
        is_connect: values.is_connect,
        model_id: values.model_id,
        price: values.price,
      };
      AddSpecify(payload);
      resetForm();
    },
  });

  const closeModal = () => {
    setModalVisible(false);
  };
  const removeModaleAfterSubmit = () => {
    document.getElementById("deleteColor").classList.remove("show", "d-block");
    document
      .querySelectorAll(".modal-backdrop")
      .forEach((el) => el.classList.remove("modal-backdrop"));
  };

  const deleteColors = async (id) => {
    try {
      const response = await axiosInstance.delete(
        `dashboard/specifications/${id}`,
        {
          headers: {
            Accept: "application/json, text/plain, */*",
          },
        }
      );
      console.log(response, "تم ارسال البيانات بنجاح");
      removeModaleAfterSubmit();
      fetchSpecify();
      Notify("تم المسح بنجاح");
    } catch (error) {
      console.error(error);
      NotifyError(error.response.data.message);
    }
  };
  const collectedDataToEdit = (id, obj) => {
    setSelectedBrandId(id);
    setobj(obj);
  };

  const columns = [
    {
      title: "الكود",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "اسم البراند",
      dataIndex: "brand_name",
      key: "brand_name",
    },
    {
      title: "اسم المنتج",
      dataIndex: "paneling_name",
      key: "paneling_name",
    },

    {
      title: "تحديث",
      dataIndex: "id",
      key: "id",
      render: (
        id,
        { paneling_id, is_connect, brand_id, model_id, price, car_chairs }
      ) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#editSpecify"
            onClick={() =>
              collectedDataToEdit(id, {
                paneling_id: paneling_id,
                brand_id: brand_id,
                id: id,
                model_id: model_id,
                price: price,
                is_connect: is_connect,
                car_chairs: car_chairs,
              })
            }
          >
            <i className="fa fa-pencil"></i>
          </button>
          <button
            className="btn btn-danger mx-2"
            onClick={() => deleteCategoryWithConfirmation(id)}
          >
            <i className="fa fa-trash"></i>
          </button>
        </div>
      ),
    },
  ];
  const memoizedColumns = useMemo(() => columns, []);
  const memoizedDataSource = useMemo(() => SpecifyData, [SpecifyData]);

  const deleteCategoryWithConfirmation = async (id) => {
    try {
      const result = await Swal.fire({
        title: "هل أنت متأكد؟",
        text: "لن تتمكن من استرجاع هذا العنصر!",
        icon: "warning",
        showCancelButton: true, // عرض زر إلغاء
        confirmButtonText: "نعم، احذف",
        cancelButtonText: "لا، إلغاء",
        reverseButtons: true, // تغيير ترتيب الأزرار ليكون الـ "نعم" بعد "لا"
      });
      if (result.isConfirmed) {
        setSelectedBrandId(id);
        // إذا وافق المستخدم على الحذف
        await deleteColors(id); // استدعاء دالة الحذف التي تريدها
        Swal.fire("تم الحذف!", "تم حذف العنصر بنجاح", "success"); // عرض رسالة النجاح بعد الحذف
      } else {
        // إذا تم إلغاء الحذف
        Swal.fire("تم الإلغاء", "لم يتم حذف العنصر", "info");
      }
    } catch (error) {
      // في حال حدوث خطأ أثناء الحذف
      Swal.fire("خطأ!", "حدث خطأ أثناء الحذف. يرجى المحاولة مرة أخرى", "error");
    }
  };
  return (
    <>
      {/* tost delete modala */}
      <DeleteModal />
      <h1 className="text-center mainFont">اضافه الالوان</h1>
      <form onSubmit={formik.handleSubmit} className="mt-3">
        <div className="container-fluid dir-ar mainFont">
          <div className="col-xs-11 text-center row align-items-lg-center">
            <div className="mt-2 col-xs-12 col-sm-2 col-md-2 col-lg-3 mt-2">
              <label className="fw-bold">اختر البراند</label>
              <select
                id="dataSelect"
                className="form-select"
                name="brand_id"
                required
                {...formik.getFieldProps("brand_id")}
              >
                <option value="" disabled selected>
                  اختر البراند
                </option>
                {BrandData.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              {formik.touched.brand_id && formik.errors.brand_id ? (
                <div className="text-danger">{formik.errors.brand_id}</div>
              ) : null}
            </div>

            {/* pannelling */}

            <div className="mt-2 col-xs-12 col-sm-2 col-md-2 col-lg-3 mt-2">
              <label className="fw-bold">اختر المنتج</label>
              <select
                id="dataSelect"
                className="form-select"
                name="paneling_id"
                required
                {...formik.getFieldProps("paneling_id")}
              >
                <option value="" disabled selected>
                  اختر المنتج
                </option>
                {ProductData?.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              {formik.touched.paneling_id && formik.errors.paneling_id ? (
                <div className="text-danger">{formik.errors.paneling_id}</div>
              ) : null}
            </div>

            {/* models  */}
            <div className="mt-2 col-xs-12 col-sm-2 col-md-2 col-lg-3 mt-2">
              <label className="fw-bold">اختر الموديل</label>
              <select
                id="dataSelect"
                className="form-select"
                name="model_id"
                required
                {...formik.getFieldProps("model_id")}
              >
                <option value="" disabled selected>
                  اختر الموديل
                </option>
                {ModelData?.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              {formik.touched.model_id && formik.errors.model_id ? (
                <div className="text-danger">{formik.errors.model_id}</div>
              ) : null}
            </div>
            {/*  */}

            <div className="mt-2 col-xs-12 col-sm-2 col-md-2 col-lg-3 mt-2">
              <label className="fw-bold">اختر عدد الكراسي </label>
              <select
                id="dataSelect"
                className="form-select"
                name="car_chairs"
                required
                {...formik.getFieldProps("car_chairs")}
              >
                <option value="" disabled selected>
                  اختر عدد الكراسي{" "}
                </option>
                {chairsNumber?.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              {formik.touched.car_chairs && formik.errors.car_chairs ? (
                <div className="text-danger">{formik.errors.car_chairs}</div>
              ) : null}
            </div>

            <div className="mt-2 col-xs-12 col-sm-2 col-md-2 col-lg-3 mt-2">
              <label className="fw-bold"> متصل او منفصل </label>
              <select
                id="dataSelect"
                className="form-select"
                name="is_connect"
                required
                {...formik.getFieldProps("is_connect")}
              >
                <option value="" disabled selected>
                  متصل او منفصل{" "}
                </option>
                {isConnect?.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              {formik.touched.is_connect && formik.errors.is_connect ? (
                <div className="text-danger">{formik.errors.is_connect}</div>
              ) : null}
            </div>

            <div className="form-group col-xs-12 col-sm-2 col-md-2 col-lg-3">
              <label className="fw-bold">السعر </label>
              <input
                name="price"
                type="text"
                className="form-control"
                required
                {...formik.getFieldProps("price")}
              />
              {formik.touched.price && formik.errors.price ? (
                <span className="text-danger">{formik.errors.price}</span>
              ) : null}
            </div>
            <div className="form-group col-xs-12 col-sm-2 col-md-2 col-lg-3">
              <label className="fw-bold">سعر الشنطة </label>
              <input
                name="bag_price"
                type="text"
                className="form-control"
                {...formik.getFieldProps("bag_price")}
              />
            </div>
          </div>
          <div className="text-center ">
            <button
              type="submit"
              className="btn btn- text-center mt-3 col-1"
              style={{ background: "orange" }}
            >
              ارسال
            </button>
          </div>
        </div>
      </form>

      {/* مودال عند نجاح أو فشل الإرسال */}
      {modalVisible && (
        <div className={`modal-container ${modalType}`}>
          <div className="modal-content">
            {modalType == "success" ? (
              <div>
                <img src={imageSuccess} style={{ maxWidth: "220px" }} alt="" />
              </div>
            ) : (
              <div>
                <img src={imageFail} style={{ maxWidth: "220px" }} alt="" />
              </div>
            )}
            <h4>{modalMessage}</h4>
            <button
              onClick={closeModal}
              className={
                modalType == "success" ? "btn btn-success" : "btn btn-danger"
              }
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
      {/* component of filtration  */}
      <Filtr
        data={SpecifyData}
        filtrated={setSpecifyData}
        orig={SpecifyData}
        nameOfSession={"specificationsData"}
      />
      <div className="mt-3" style={{ direction: "rtl" }}>
        {Array.isArray(memoizedDataSource) && (
          <Table
            pagination={
              memoizedDataSource?.length > 5 ? { pageSize: 5 } : false
            }
            dataSource={memoizedDataSource}
            columns={memoizedColumns}
          />
        )}
      </div>

      {/* <button className='btn btn-light' >اضغط لمشاهده الفيديدو</button> */}
      <DeleteModal idModal={"deleteColor"} deleteFn={deleteColors} />
      <EditSpecification
        i={obj}
        typeOf={"specifications"}
        idModal={"editSpecify"}
        fetchSpecify={fetchSpecify}
        nameOfImage={"image"}
      />
    </>
  );
}
