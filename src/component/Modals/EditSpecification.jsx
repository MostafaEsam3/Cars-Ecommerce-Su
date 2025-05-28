import React, { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import imageSuccess from "./../../assets/images.png";
import imageFail from "./../../assets/images (1).png";
import ModalDelete, { Notify, NotifyError } from "./Alert";
import { useFetchData } from "../../hooks/useFetch";

export default function EditSpecification(props) {
  const imgInputRef = useRef(null);
  const [mod, setmod] = useState(false);
  const [modalMessage, setModalMessage] = useState(""); // لتخزين الرسالة المعروضة في المودال
  const [modalType, setModalType] = useState(""); // لتحديد إذا كانت الرسالة فشل أم نجاح
  const [inputUser, setInputUser] = useState({
    image: "",
  });
  const {
    Data: SpecifyData,
    setData: setSpecifyData,
    fetchData: fetchSpecify,
  } = useFetchData(
    "https://api.admin.kapitiano.com/dashboard/specifications",
    "specificationsData"
  );
  const {
    Data: ModelData,
    setData: setModelData,
    fetchData: fetchModels,
  } = useFetchData(
    "https://api.admin.kapitiano.com/dashboard/models",
    "modelData"
  );
  const {
    Data: ProductData,
    setData: setProductData,
    fetchData: fetchProduct,
  } = useFetchData(
    "https://api.admin.kapitiano.com/dashboard/panelings",
    "panelingsData"
  );
  const {
    Data: BrandData,
    setData: setBrandData,
    fetchData: fetchBrand,
  } = useFetchData(
    "https://api.admin.kapitiano.com/dashboard/brands",
    "brandData"
  );
  useEffect(() => {
    fetchBrand();
    fetchProduct();
    fetchModels();
  }, []);

  const chairsNumber = [
    { name: "كرسيين", id: 2 },
    { name: "تلاث كراسي", id: 3 },
    { name: "خمس كراسي", id: 5 },
  ];
  const isConnect = [
    { name: "متصل", id: 1 },
    { name: " منفصل", id: 0 },
  ];
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInputUser({ ...inputUser, image: file });
    }
  };

  const editSpecify = async (data) => {
    const token = localStorage.getItem("authToken");

    await axios
      .post(
        `https://api.admin.kapitiano.com/dashboard/${props.typeOf}/${props.i.id}`,
        data, // Payload for the POST request
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        Notify("تم التعديل بنجاح");
        props.fetchSpecify();
      })
      .catch((err) => {
        console.log(err);
        NotifyError(err.response?.data?.message || "حدث خطأ أثناء التعديل");
      });
  };

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
    onSubmit: (values, { resetForm, setSubmitting }) => {
      const formData = new FormData();
      formData.append("paneling_id", values.paneling_id);
      formData.append("brand_id", values.brand_id);
      formData.append("car_chairs", values.car_chairs);
      formData.append("is_connect", values.is_connect);
      formData.append("model_id", values.model_id);
      formData.append("price", values.price);
      formData.append("_method", "PUT");

      console.log("Submitting values:", values);

      editSpecify(formData).finally(() => {
        console.log("✅ Request finished, unlocking form");
        setSubmitting(false); // ← مهم جدًا لإعلام Formik أن الإرسال انتهى
      });
      console.log(
        "Sending brand_id →",
        values.brand_id,
        typeof values.brand_id
      );
    },
  });

  useEffect(() => {
    if (props.i) {
      formik.setValues({
        paneling_id: props.i.paneling_id,
        model_id: props.i.model_id,
        brand_id: props.i.brand_id,
        car_chairs: props.i.car_chairs,
        price: props.i.price,
        is_connect: props.i.is_connect,
      });
    }
  }, [props.i]);
  const closeModal = () => {
    setmod(false);
  };

  return (
    <>
      <ModalDelete />
      <div
        className="modal fade"
        id={props.idModal}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered  custom-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                هل تريد التعديل
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <h1 className="text-center">اضافه التعديلات</h1>
            <div className="modal-body">
              <form onSubmit={formik.handleSubmit} className="mt-3">
                <div className="container-fluid dir-ar">
                  <div className="col-xs-11 text-center row align-items-lg-center">
                    <div className="mt-2 col-xs-12 col-sm-2 col-md-2 col-lg-12 mt-2">
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
                        <div className="text-danger">
                          {formik.errors.brand_id}
                        </div>
                      ) : null}
                    </div>

                    {/* pannelling */}

                    <div className="mt-2 col-xs-12 col-sm-2 col-md-2 col-lg-12 mt-2">
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
                      {formik.touched.paneling_id &&
                      formik.errors.paneling_id ? (
                        <div className="text-danger">
                          {formik.errors.paneling_id}
                        </div>
                      ) : null}
                    </div>

                    {/* models  */}
                    <div className="mt-2 col-xs-12 col-sm-2 col-md-2 col-lg-12 mt-2">
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
                        <div className="text-danger">
                          {formik.errors.model_id}
                        </div>
                      ) : null}
                    </div>
                    {/*  */}

                    <div className="mt-2 col-xs-12 col-sm-2 col-md-2 col-lg-12 mt-2">
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
                        <div className="text-danger">
                          {formik.errors.car_chairs}
                        </div>
                      ) : null}
                    </div>

                    <div className="mt-2 col-xs-12 col-sm-2 col-md-2 col-lg-12 mt-2">
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
                        <div className="text-danger">
                          {formik.errors.is_connect}
                        </div>
                      ) : null}
                    </div>

                    <div className="form-group col-xs-12 col-sm-2 col-md-2 col-lg-12">
                      <label className="fw-bold">السعر </label>
                      <input
                        name="price"
                        type="text"
                        className="form-control"
                        required
                        {...formik.getFieldProps("price")}
                      />
                      {formik.touched.price && formik.errors.price ? (
                        <span className="text-danger">
                          {formik.errors.price}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="text-text-center ">
                    <button
                      type="submit"
                      className="btn btn-danger text-center mt-3"
                      onClick={() => console.log("✅ Submit button clicked")}
                      disabled={formik.isSubmitting}
                    >
                      ارسال
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
