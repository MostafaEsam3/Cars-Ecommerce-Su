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
import {
  Checkbox,
  ListItemText,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

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
    { name: "لا شئ ", id: 2 },
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
      brands: [],
      car_chairs: "",
      price: "",
      is_connect: "",
      bag_price: "",
      doors: [],
      roof_types: [],
    },

    validationSchema: Yup.object({
      paneling_id: Yup.string().required("يرجي ادخال اسم منتج"),
      model_id: Yup.string().required("يرجي ادخال موديل"),
      brands: Yup.array().required("يرجي ادخال براند"),
      car_chairs: Yup.string().required("يرجي ادخال عدد المقاعد"),
      price: Yup.string().required("يرجي ادخال السعر"),
      // is_connect: Yup.string().required("يرجي ادخال هل منفصل ولا متصل "),
    }),
    onSubmit: (values, { resetForm }) => {
      const payload = {
        paneling_id: values.paneling_id,
        brands: values.brands.map((brandId) => ({ id: brandId })),
        car_chairs: values.car_chairs,
        model_id: values.model_id,
        price: values.price,
        bag_price: values.bag_price,
      };
      // Log the is_connect value to debug
      console.log("is_connect value:", values.is_connect);
      console.log("is_connect type:", typeof values.is_connect);
      if (values.is_connect === "") {
        console.log("Case 1: is_connect is empty, not adding to payload");
      }
      // Case 2: Do not add is_connect if it is "2" (لا شئ)
      else if (values.is_connect == "2") {
        console.log("Case 2: is_connect is 'لا شئ', not adding to payload");
      }
      // Only add is_connect for other valid values (e.g., "0" or "1")
      else {
        console.log(
          "Adding is_connect to payload with value:",
          values.is_connect
        );
        payload.is_connect = values.is_connect;
      }
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
      title: " شعار السياره",
      dataIndex: "brand_name",
      key: "brand_name",
    },
    {
      title: "اسم المنتج",
      dataIndex: "paneling_name",
      key: "paneling_name",
    },
    {
      title: " نوع السياره",
      dataIndex: "model_name",
      key: "model_name",
    },
    {
      title: "  عدد الكراسي",
      dataIndex: "car_chairs",
      key: "car_chairs",
      render: (car_chairs) => {
        return (
          <span>
            {car_chairs == "2"
              ? "2 كرسي"
              : car_chairs == "3"
              ? "تلاث كراسي"
              : "خمس كراسي"}
          </span>
        );
      },
    },

    {
      title: "تحديث",
      dataIndex: "id",
      key: "id",
      render: (
        id,
        {
          paneling_id,
          is_connect,
          brands,
          model_id,
          price,
          car_chairs,
          bag_price,
          brand_id,
        }
      ) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#editSpecify"
            onClick={() =>
              collectedDataToEdit(id, {
                paneling_id: paneling_id,
                brand_id: brand_id, // Assuming you want to use the first brand ID
                id: id,
                model_id: model_id,
                price: price,
                is_connect: is_connect,
                car_chairs: car_chairs,
                bag_price: bag_price,
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
            {/* <div className="mt-2 col-xs-12 col-sm-2 col-md-2 col-lg-3 mt-2">
              <label className="fw-bold">اختر شعار السياره</label>
              <div className="dropdown">
             
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                  اختر البراند
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <li>
                    <div className="dropdown-item">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        id="select-all-brands"
                        onChange={(e) => {
                          if (e.target.checked) {
                            const allBrandIds = BrandData.map(brand => brand.id);
                            formik.setFieldValue("brands", allBrandIds);
                          } else {
                            formik.setFieldValue("brands", []);
                          }
                        }}
                        checked={formik.values.brands.length === BrandData.length}
                      />
                      <label className="form-check-label" htmlFor="select-all-brands">
                        تحديد الكل
                      </label>
                    </div>
                  </li>
                  {BrandData.map((item, index) => (
                    <li key={index}>
                      <div className="dropdown-item">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          value={item.id}
                          id={`brand-${item.id}`}
                          name="brands"
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (e.target.checked) {
                              formik.setFieldValue("brands", [...formik.values.brands, value]);
                            } else {
                              formik.setFieldValue("brands", formik.values.brands.filter(brandId => brandId !== value));
                            }
                          }}
                          checked={formik.values.brands.includes(item.id)}
                        />
                        <label className="form-check-label" htmlFor={`brand-${item.id}`}>
                          {item.name}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              {formik.touched.brands && formik.errors.brands ? (
                <div className="text-danger">{formik.errors.brands}</div>
              ) : null}
            </div> */}
            <div className="mt-2 col-xs-12 col-sm-2 col-md-2 col-lg-3 ">
              <label className="fw-bold"> اختر شعار السياره </label>

              <FormControl fullWidth>
                {/* <InputLabel id="brand-select-label" className="fw-bold">
                
                </InputLabel> */}
                <Select
                  labelId="brand-select-label"
                  multiple
                  value={formik.values.brands}
                  onChange={(event) => {
                    const value = event.target.value;

                    // Handle "Select All"
                    if (value.includes("all")) {
                      if (formik.values.brands.length === BrandData.length) {
                        formik.setFieldValue("brands", []);
                      } else {
                        formik.setFieldValue(
                          "brands",
                          BrandData.map((brand) => brand.id)
                        );
                      }
                    } else {
                      formik.setFieldValue("brands", value);
                    }
                  }}
                  renderValue={(selected) =>
                    BrandData.filter((brand) => selected.includes(brand.id))
                      .map((brand) => brand.name)
                      .join(", ")
                  }
                >
                  <MenuItem value="all">
                    <Checkbox
                      checked={formik.values.brands.length === BrandData.length}
                      indeterminate={
                        formik.values.brands.length > 0 &&
                        formik.values.brands.length < BrandData.length
                      }
                    />
                    <ListItemText primary="تحديد الكل" />
                  </MenuItem>
                  {BrandData.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <Checkbox
                        checked={formik.values.brands.includes(item.id)}
                      />
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.brands && formik.errors.brands ? (
                  <div className="text-danger">{formik.errors.brands}</div>
                ) : null}
              </FormControl>
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
              <label className="fw-bold">اختر نوع السياره</label>
              <select
                id="dataSelect"
                className="form-select"
                name="model_id"
                required
                {...formik.getFieldProps("model_id")}
              >
                <option value="" disabled selected>
                  اختر نوع السياره
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

            <div className="mt-2 col-xs-12 col-sm-2 col-md-2 col-lg-3">
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
                {...formik.getFieldProps("is_connect")}
              >
                <option value="" disabled selected>
                  متصل او منفصل
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
            {/* عدد الأبواب */}
            <div className="mt-2 col-xs-12 col-sm-2 col-md-2 col-lg-3">
              <label className="fw-bold">عدد الأبواب</label>
              <FormControl fullWidth>
                <Select
                  multiple
                  value={formik.values.doors}
                  onChange={(event) => {
                    formik.setFieldValue("doors", event.target.value);
                  }}
                  renderValue={(selected) => selected.join(", ")}
                >
                  <MenuItem value="بابين">
                    <Checkbox checked={formik.values.doors.includes("بابين")} />
                    <ListItemText primary="بابين" />
                  </MenuItem>
                  <MenuItem value="4 أبواب">
                    <Checkbox
                      checked={formik.values.doors.includes("4 أبواب")}
                    />
                    <ListItemText primary="4 أبواب" />
                  </MenuItem>
                  <MenuItem value="لا شيء">
                    <Checkbox
                      checked={formik.values.doors.includes("لا شيء")}
                    />
                    <ListItemText primary="لا شيء" />
                  </MenuItem>
                </Select>
              </FormControl>
            </div>

            {/* نوع السقف */}
            <div className="mt-2 col-xs-12 col-sm-2 col-md-2 col-lg-3">
              <label className="fw-bold">نوع السقف</label>
              <FormControl fullWidth>
                <Select
                  multiple
                  value={formik.values.roof_types}
                  onChange={(event) => {
                    formik.setFieldValue("roof_types", event.target.value);
                  }}
                  renderValue={(selected) => selected.join(", ")}
                >
                  <MenuItem value="ثابت">
                    <Checkbox
                      checked={formik.values.roof_types.includes("ثابت")}
                    />
                    <ListItemText primary="ثابت" />
                  </MenuItem>
                  <MenuItem value="متحرك">
                    <Checkbox
                      checked={formik.values.roof_types.includes("متحرك")}
                    />
                    <ListItemText primary="متحرك" />
                  </MenuItem>
                  <MenuItem value="لا شيء">
                    <Checkbox
                      checked={formik.values.roof_types.includes("لا شيء")}
                    />
                    <ListItemText primary="لا شيء" />
                  </MenuItem>
                </Select>
              </FormControl>
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
