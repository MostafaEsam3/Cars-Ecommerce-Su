import React, { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import imageSuccess from "./../../assets/images.png";
import imageFail from "./../../assets/images (1).png";
import ModalDelete, { Notify, NotifyError } from "./Alert";
import { useFetchData } from "../../hooks/useFetch";

export default function EditModels(props) {
  const imgInputRef = useRef(null);
  const [mod, setmod] = useState(false);
  const [modalMessage, setModalMessage] = useState(""); // لتخزين الرسالة المعروضة في المودال
  const [modalType, setModalType] = useState(""); // لتحديد إذا كانت الرسالة فشل أم نجاح
  const [inputUser, setInputUser] = useState({
    image_start_year: "",
    image_end_year: "",
  });
  const years = [];
  for (let year = 1990; year <= 2030; year++) {
    years.push(year);
  }

  const {
    Data: BrandData,
    setData: setBrandData,
    fetchData,
  } = useFetchData(
    "https://api.admin.kapitiano.com/dashboard/brands",
    "brandData"
  );

  const handleImageChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    if (file) {
      setInputUser((prev) => ({
        ...prev,
        [name]: file,
      }));
    }
  };
  const token = localStorage.getItem("authToken");

  const editModels = async (data) => {
    console.log(data);

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
        Notify("done");
        props.fetchBrand();
      })
      .catch((err) => {
        console.log(err);
        NotifyError(err.response.data.message);
      });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      image_start_year: null,
      image_end_year: null,
      status: 1,
      brand_id: "",
      startYear: "",
      endYear: "",
    },
    validationSchema: Yup.object({
      name: Yup.string(),
      image_start_year: Yup.mixed().test(
        "fileType",
        "يرجى رفع ملف صحيح",
        (value) => value != null
      ),
      image_end_year: Yup.mixed().test(
        "fileType",
        "يرجى رفع ملف صحيح",
        (value) => value != null
      ),
      startYear: Yup.string(),
      endYear: Yup.string(),
      brand_id: Yup.string(),
    }),
    onSubmit: (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("name", values.name);
      formData.append("status", values.status);
      formData.append("brand_id", values.brand_id);
      formData.append("startYear", values.startYear);
      formData.append("endYear", values.endYear);

      if (inputUser.image_end_year) {
        formData.append("image_end_year", inputUser.image_end_year);
      }
      if (inputUser.image_start_year) {
        formData.append("image_start_year", inputUser.image_start_year);
      }

      editModels(formData);
    },
  });
  

  useEffect(() => {
    fetchData(); // <-- جلب البراندات عند تحميل المكون

    if (props.i) {
      formik.setValues({
        name: props.i.name || "",
        image_start_year: props.i.image_start_year || null,
        image_end_year: props.i.image_end_year || null,
        status: props.i.status,
        brand_id: props.i.brand_id || "", 
        endYear: props.i.endYear,
        startYear: props.i.startYear,
      });
    }
  }, [props.i]);

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
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                هل تريد تأكيد الحذف
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h1 className="text-center">اضافه الموديلات</h1>
              <form onSubmit={formik.handleSubmit} className="mt-3">
                <div className="container-fluid dir-ar">
                  <div className="col-xs-11 text-center flex-column justify-content-center align-items-center">
                    <div className="form-group col-12 mb-3">
                      <label className="fw-bold">اسم القسم</label>
                      {/* {formik.values.name == "" ? 
                            (<span>kdjhgjhked</span>) : null} */}
                      <input
                        name="name"
                        type="text"
                        className="form-control"
                        required
                        {...formik.getFieldProps("name")}
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <div className="text-danger">{formik.errors.name}</div>
                      ) : null}
                    </div>
                    <div className="form-group col-12 mb-3">
                      <label className="fw-bold">اضافه صوره بدايه السنه </label>
                      <input
                        type="file"
                        className="form-control"
                        name="image_start_year"
                        onChange={handleImageChange}
                      />
                      {formik.touched.image_start_year &&
                      formik.errors.image_start_year ? (
                        <div className="text-danger">
                          {formik.errors.image_start_year}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group col-12 mb-3">
                      <label className="fw-bold">اضافه صوره نهايه السنه </label>
                      <input
                        type="file"
                        className="form-control"
                        name="image_end_year"
                        // ref={imageInputRef}
                        onChange={handleImageChange}
                      />
                      {formik.touched.image_end_year &&
                      formik.errors.image_end_year ? (
                        <div className="text-danger">
                          {formik.errors.image_end_year}
                        </div>
                      ) : null}
                    </div>
                  
                    <div className="col-12 mb-3"> 
                      <label htmlFor="" className="fw-bold">
                        {" "}
                        بدايه الاصدار{" "}
                      </label>
                      <select
                        id="startYearSelect"
                        className="form-select"
                        required
                        name="startYear"
                        value={formik.values.startYear}
                        onChange={formik.handleChange}
                      >
                        <option value="" disabled>
                          اختر بدايه الاصدار
                        </option>
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>

                      {formik.touched.startYear && formik.errors.startYear ? (
                        <div className="text-danger">
                          {formik.errors.startYear}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-12 mb-3"> 
                      <label className="fw-bold"> نهايه الاصدار</label>
                      <select
                        id="endYearSelect"
                        className="form-select"
                        required
                        name="endYear"
                        value={formik.values.endYear}
                        onChange={formik.handleChange}
                      >
                        <option value="" disabled>
                          اختر نهايه الاصدار
                        </option>
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>

                      {formik.touched.endYear && formik.errors.endYear ? (
                        <div className="text-danger">
                          {formik.errors.endYear}
                        </div>
                      ) : null}
                    </div>
                    <div className="mt-2 col-12 mb-3">
                      <label className="fw-bold">اختر البراند</label>
                      <select
                        id="dataSelect"
                        className="form-select"
                        name="brand_id"
                        required
                        // {...formik.getFieldProps("brand_id")}
                       value={formik.values.brand_id}
                        onChange={formik.handleChange}
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
                      {/* radio */}
                    <div className=" col-12 mb-3"> 
                      <label>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="status"
                          value="1"
                          checked={formik.values.status === 1}
                          onChange={() => formik.setFieldValue("status", 1)}
                        />
                        نشطة
                      </label>

                      <label className="mx-4">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="status"
                          value="0"
                          checked={formik.values.status === 0} // Switch to غير نشطة
                          onChange={() => formik.setFieldValue("status", 0)}
                        />
                        غير نشطة
                      </label>
                    </div>
                    {/* end radio */}
                  </div>
                  <div className="text-text-center ">
                    <button
                      type="submit"
                      className="btn btn-danger  text-center mt-3"
                      // data-bs-dismiss="modal"
                    >
                      تعديل
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
