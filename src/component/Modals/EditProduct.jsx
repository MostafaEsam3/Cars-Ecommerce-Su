import React, { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import imageSuccess from "./../../assets/images.png";
import imageFail from "./../../assets/images (1).png";
import ModalDelete, { Notify, NotifyError } from "./Alert";
import { useFetchData } from "../../hooks/useFetch";

export default function EditProduct(props) {
  const imgInputRef = useRef(null);
  const [mod, setmod] = useState(false);
  const [modalMessage, setModalMessage] = useState(""); // لتخزين الرسالة المعروضة في المودال
  const [modalType, setModalType] = useState(""); // لتحديد إذا كانت الرسالة فشل أم نجاح
  const [inputUser, setInputUser] = useState({
    image_start_year: "",
    image_end_year: "",
  });
  const {
    Data: CategoryData,
    setData: setCategoryData,
    fetchData,
  } = useFetchData(
    "https://api.admin.kapitiano.com/dashboard/categories",
    "categoryData"
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInputUser({ ...inputUser, image: file });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const token = localStorage.getItem("authToken");

  const editProduct = async (data) => {
    await axios
      .post(
        `https://api.admin.kapitiano.com/dashboard/${props.typeOf}/${props.i.id}`,
        data, // Payload for the POST request
        {
          headers: {
            Authorization: `Bearer ${token}`,

            "Content-Type": "multipart/form-data",
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
      image: null,
      description: "",
      status: 1,
      category_id: "",
      link: "",
    },
    validationSchema: Yup.object({
      name: Yup.string(),
      image: Yup.mixed().test(
        "fileType",
        "يرجى رفع ملف صحيح",
        (value) => value != null
      ),
      description: Yup.string(),
      category_id: Yup.string(),
      link: Yup.string(),
    }),
    onSubmit: (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("name", values.name);
      formData.append("status", values.status);
      formData.append("category_id", values.category_id);
      formData.append("description", values.description);
      formData.append("link", values.link);

      if (values.image instanceof File) {
        formData.append("image", values.image);
      }

      editProduct(formData);
    },
  });

  useEffect(() => {
    if (props.i) {
      formik.setValues({
        name: props.i.name || "",
        image: props.i.image || null,
        description: props.i.description || null,
        status: props.i.status,
        category_id: props.i.category_id,
        link: props.i.link,
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
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h1 className="text-center">تعديل المنتجات</h1>
              <form onSubmit={formik.handleSubmit} className="mt-3">
                <div className="container-fluid dir-ar">
                  <div className="col-xs-11 text-center row">
                    <div className="form-group col-xs-12 col-sm-2 col-md-2 col-lg-3">
                      <label className="fw-bold">اسم المنتج</label>
                      <input
                        name="name"
                        type="text"
                        className="form-control"
                        {...formik.getFieldProps("name")}
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <div className="text-danger">{formik.errors.name}</div>
                      ) : null}
                    </div>
                    <div className="form-group col-xs-12 col-sm-2 col-md-2 col-lg-3">
                      <label className="fw-bold">وصف المنتج</label>
                      <input
                        name="description"
                        type="text"
                        className="form-control"
                        {...formik.getFieldProps("description")}
                      />
                      {formik.touched.description &&
                      formik.errors.description ? (
                        <div className="text-danger">
                          {formik.errors.description}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group col-xs-12 col-sm-2 col-md-2 col-lg-3">
                      <label className="fw-bold">اضافه لينك المنتج</label>
                      <input
                        name="link"
                        type="text"
                        className="form-control"
                        {...formik.getFieldProps("link")}
                      />
                      {formik.touched.link && formik.errors.link ? (
                        <div className="text-danger">{formik.errors.link}</div>
                      ) : null}
                    </div>
                    <div className="form-group col-xs-12 col-sm-2 col-md-2 col-lg-3">
                      <label className="fw-bold">اضافه صوره المنتج </label>
                      <input
                        type="file"
                        className="form-control"
                        name="image"
                        onChange={(event) => {
                          const file = event.target.files[0];
                          formik.setFieldValue("image", file);
                        }}
                      />

                      {formik.touched.image && formik.errors.image ? (
                        <div className="text-danger">{formik.errors.image}</div>
                      ) : null}
                    </div>
                    {/* radio */}
                    <div className=" col-xs-12 col-sm-2 col-md-2 col-lg-3 d-flex align-items-center mt-4 ">
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
                    <div className="mt-2 col-xs-12 col-sm-2 col-md-2 col-lg-3 mt-2">
                      <label className="fw-bold">اختر القسم</label>
                      <select
                        id="dataSelect"
                        className="form-select"
                        name="category_id"
                        {...formik.getFieldProps("category_id")}
                      >
                        <option value="" disabled>
                          اختر القسم
                        </option>
                        {CategoryData.map((item, index) => (
                          <option key={index} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>

                      {formik.touched.category_id &&
                      formik.errors.category_id ? (
                        <div className="text-danger">
                          {formik.errors.category_id}
                        </div>
                      ) : null}
                    </div>

                    <div className="text-text-center ">
                      <button
                        type="submit"
                        className="btn btn-danger text-center mt-3"
                        data-bs-dismiss="modal"
                      >
                        تعديل
                      </button>
                    </div>
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
