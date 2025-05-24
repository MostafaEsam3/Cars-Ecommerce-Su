import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState, useRef } from 'react';
import * as Yup from 'yup';
import "./addCategory.css"
import imageSuccess from "./../../../assets/images.png"
import { useEffect } from 'react';
import { Table } from 'antd';
import DeleteModal from '../../../component/Modals/deleteModal';
import EditModal from '../../../component/Modals/EditModal';
import { Notify, NotifyError } from '../../../component/Modals/Alert';
import Filtr from '../../../component/Filtration/Filtration';
import { useFetchData } from '../../../hooks/useFetch';
import { deleteConfirmation } from '../../../hooks/deleteConfirmation';
import Swal from 'sweetalert2';
import Loading from '../../../Shared/Loading/Loading';
export default function AddCategory() {
    const imageInputRef = useRef(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState(""); // لتخزين الرسالة المعروضة في المودال
    const [modalType, setModalType] = useState(""); // لتحديد إذا كانت الرسالة فشل أم نجاح
    const [obj, setobj] = useState({});
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    // const [CategoryData,setCategoryData]=useState([]);
    const { Data: CategoryData, setData: setCategoryData, fetchData, loading } = useFetchData("http://127.0.0.1:8000/dashboard/categories", "categoryData");



    const [isOnline, setIsOnline] = useState(true);
    useEffect(() => {
        fetchData()
    }, []);

    // const fetchCategoryData=async()=>{
    //     axios.get("http://127.0.0.1:8000/dashboard/categories").then((response)=>{
    //         console.log(response);
    //         setCategoryData(response.data.data)
    //         sessionStorage.setItem('categoryData', JSON.stringify(response.data.data));
    //     }).catch((err)=>{
    //         console.log(err); 
    //     })
    // }

    // function add category 
    const addCategory = async (data) => {
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/dashboard/categories',  // تأكد من المسار الصحيح
                data,  // البيانات التي تريد إرسالها
                {
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                    }
                }
            );
            console.log(response, "تم ارسال البيانات بنجاح");
            // setModalType("success");
            // setModalMessage("تم إرسال البيانات بنجاح!");
            // setModalVisible(true);
            // fetchCategoryData()
            Swal.fire("تم ارسال البيانات بنجاح")

            fetchData();
        } catch (error) {
            console.log(error);
            // setModalType("failure");
            // setModalVisible(true);
            Swal.fire({
                icon: 'error',
                title: 'خطأ',
                text: 'خطأ في إرسال البيانات',
            });
        }
    };

    // fn validation input 
    const formik = useFormik({
        initialValues: {
            name: "",
            status: 1,
            image: null // قيمة مبدئية null للصورة
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required("يرجي ادخال قسم"),
            image: Yup.mixed()
                .required("يرجي ادخال صورة")
                .test('fileType', 'يرجى رفع ملف صحيح', (value) => value != null) // التأكد من وجود الملف
        }),
        onSubmit: (values, { resetForm }) => {
            const formData = new FormData();
            formData.append('name', values.name);  // إضافة النص (الاسم)
            formData.append('image', values.image);  // إضافة الصورة أو الملف
            formData.append('status', values.status);

            addCategory(formData);  // إرسال FormData إلى الـ API
            // إعادة تعيين النموذج بعد الإرسال
            resetForm();
            // إزالة الصورة من input بعد الـ submit
            imageInputRef.current.value = '';  // إعادة تعيين حقل الصورة ليظهر فارغًا
        },
    });

    // دالة لإغلاق المودال
    const closeModal = () => {
        setModalVisible(false);
    }

    const collectedDataToEdit = (id, obj) => {
        setSelectedCategoryId(id)
        setobj(obj)
    }

    const removeModaleAfterSubmit = (idModal) => {
        document.getElementById(idModal).classList.remove("show", "d-block");
        document.querySelectorAll(".modal-backdrop")
            .forEach(el => el.classList.remove("modal-backdrop"));
    }

    const deleteCategory = async (id) => {
        try {
            const response = await axios.delete(
                `http://127.0.0.1:8000/dashboard/categories/${id}`, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                }
            }
            );
            console.log(response, "تم ارسال البيانات بنجاح");
            fetchData()
            Swal.fire("تم المسح بنجاح")
        } catch (error) {
            console.error(error);
            Swal.fire('خطأ!', 'حدث خطأ أثناء الحذف. يرجى المحاولة مرة أخرى', 'error');
        };
    }
    useEffect(() => {
        // fetchCategoryData()
    }, [])

    const columns = [
        {
            title: 'image',
            dataIndex: 'image',
            key: 'image',
            render: (image, { name }) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src={`${image}`}
                        alt="avatar"
                        style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 10 }}
                    />
                    {name}
                </div>
            ),

        },
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name',
        },

        {
            title: 'update',
            dataIndex: 'id',
            key: 'id',
            render: (id, { name, image }) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#editcategory" onClick={() => collectedDataToEdit(id,
                        {
                            "name": name,
                            "image": image,
                            id: id
                        }
                    )
                    } >
                        <i className="fa fa-pencil"></i>
                    </button>

                    <button className="btn btn-danger mx-2" onClick={() => deleteConfirmation(id, deleteCategory)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </div>
            ),

        },

    ];
    if (loading) return <Loading />; // Show Loading spinner

    return (
        <>
            <h1 className='text-center mainFont'>اضافه الاقسام</h1>
            <form onSubmit={formik.handleSubmit} className='mt-4'>
                <div className="container-fluid dir-ar mainFont">
                    <div className="col-xs-11 text-center row">
                        <div className="form-group col-xs-12 col-sm-2 col-md-2 col-lg-3">
                            <label className='fw-bold'>اسم القسم</label>
                            {/* {formik.values.name == "" ? 
                            (<span>kdjhgjhked</span>) : null} */}
                            <input
                                name='name'
                                type='text'
                                className="form-control"
                                required
                                {...formik.getFieldProps('name')}
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <div className='text-danger'>{formik.errors.name}</div>
                            ) : null}
                        </div>
                        <div className="form-group col-xs-12 col-sm-2 col-md-2 col-lg-3">
                            <label className='fw-bold'>اضافه صوره القسم  </label>
                            <input
                                type='file'
                                className="form-control"
                                required
                                name='image'
                                ref={imageInputRef}
                                onChange={(event) => {
                                    formik.setFieldValue("image", event.target.files[0]);
                                }}
                            />
                            {formik.touched.image && formik.errors.image ? (
                                <div className='text-danger'>{formik.errors.image}</div>
                            ) : null}
                        </div>
                        {/* radio */}
                        <div className=' col-xs-12 col-sm-2 col-md-2 col-lg-3 d-flex align-items-center mt-4 '>
                            <label>
                                <input
                                    className='form-check-input'
                                    type="radio"
                                    name="status"
                                    value="1"
                                    checked={formik.values.status === 1}
                                    onChange={() => formik.setFieldValue("status", 1)}
                                />
                                نشطة
                            </label>

                            <label className='mx-4'>
                                <input
                                    className='form-check-input'
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
                    <div className='text-center '>
                        <button type='submit' className='btn btn- text-center mt-3 col-1' style={{ background: "orange" }}>ارسال</button>
                    </div>
                </div>
            </form>

            {/* مودال عند نجاح أو فشل الإرسال */}
            {modalVisible && (
                <div className={`modal-container ${modalType}`}>
                    <div className="modal-content">
                        {modalType == "success" ? <div>
                            <img src={imageSuccess} style={{ maxWidth: "220px" }} alt="" />
                        </div> : ""}
                        <h4>{modalMessage}</h4>
                        <button onClick={closeModal} className={modalType == "success" ? "btn btn-success" : "btn btn-danger"} >إغلاق</button>
                    </div>
                </div>
            )}

            <Filtr data={CategoryData} filtrated={setCategoryData} nameOfSession={'categoryData'} />

            <div className='mt-3'>
                {Array.isArray(CategoryData) && (
                    <Table pagination={CategoryData?.length > 5 ? { pageSize: 5 } : false} dataSource={CategoryData} columns={columns} />
                )}
            </div>

            <DeleteModal idModal={"deletemodalcategory"} deleteFn={deleteCategory} />
            <EditModal i={obj} flag={"category"} typeOf={"categories"} idModal={"editcategory"} fetchBrand={fetchData} />
        </>
    );
}

// how to approch 
//  الفرق عمره ما كان ف الكودينج ده كان مثلا انو يعدل علي سيستمز ويقسمها وكده 
// 