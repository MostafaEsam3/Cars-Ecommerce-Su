import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState, useRef } from 'react';
import * as Yup from 'yup';
import imageSuccess from "./../../../assets/images.png"
import { useEffect } from 'react';
import { Table } from 'antd';
import DeleteModal from '../../../component/Modals/deleteModal';
import EditModal from '../../../component/Modals/EditModal';
import { Notify, NotifyError } from '../../../component/Modals/Alert';
import Filtr from '../../../component/Filtration/Filtration';
import { useFetchData } from '../../../hooks/useFetch';
import Swal from 'sweetalert2';
import EditModels from '../../../component/Modals/EditModels';
import { deleteConfirmation } from '../../../hooks/deleteConfirmation';
import "./add.css"
import Loading from '../../../Shared/Loading/Loading';
export default function AddModel() {
    const imageInputRef = useRef(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState(""); // لتخزين الرسالة المعروضة في المودال
    const [modalType, setModalType] = useState(""); // لتحديد إذا كانت الرسالة فشل أم نجاح
    const [obj, setobj] = useState({});
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // const [CategoryData,setCategoryData]=useState([]);
    const { Data: ModelData, setData: setModelData, fetchData: fetchModels ,loading} = useFetchData("http://127.0.0.1:8000/dashboard/models", "modelData");

    const { Data: BrandData, setData: setBrandData, fetchData : fetchbrand } = useFetchData("http://127.0.0.1:8000/dashboard/brands", "brandData");

    const [isOnline, setIsOnline] = useState(true);
    useEffect(() => {
        fetchbrand()

        const fetchData = async () => {
            setIsLoading(true);
            await fetchModels();
            setIsLoading(false);
        };
        fetchData();     
           function handleOnline() {
            setIsOnline(true);
        }
        function handleOffline() {
            setIsOnline(false);
        }
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // function add category 
    const addModel = async (data) => {
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/dashboard/models',  // تأكد من المسار الصحيح
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
            Swal.fire("تم ارسال البيانات بنجاح")

            // fetchCategoryData()
            fetchModels();
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
            image_start_year: null,
            image_end_year: null,
            status: 1,
            brand_id: "",
            startYear: "",
            endYear: ""
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required("يرجي ادخال قسم"),
            image_start_year: Yup.mixed()
                .required("يرجي ادخال صورة")
                .test('fileType', 'يرجى رفع ملف صحيح', (value) => value != null),
            image_end_year: Yup.mixed()
                .required("يرجي ادخال صورة")
                .test('fileType', 'يرجى رفع ملف صحيح', (value) => value != null),
            startYear: Yup.string()
                .required("يرجي ادخال بدايه العام"),
            endYear: Yup.string()
                .required("يرجي ادخال نهايه العام"),
            brand_id: Yup.string()
                .required("يرجي ادخال براند")

        }),
        onSubmit: (values, { resetForm }) => {
            const formData = new FormData();
            formData.append('name', values.name);  // إضافة النص (الاسم)
            formData.append('image_start_year', values.image_start_year);
            formData.append('image_end_year', values.image_end_year);
            formData.append('brand_id', values.brand_id);
            formData.append('status', values.status);
            formData.append('startYear', values.startYear);
            formData.append('endYear', values.endYear);
            addModel(formData);
            resetForm();
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

    const deleteModel = async (id) => {
        try {
            const response = await axios.delete(
                `http://127.0.0.1:8000/dashboard/models/${id}`, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                }
            }
            );
            console.log(response, "تم ارسال البيانات بنجاح");
            removeModaleAfterSubmit("deletModel")
            Swal.fire("تم المسح بنجاح")
            fetchModels()
        } catch (error) {
            console.error(error);
             Swal.fire('خطأ!', 'حدث خطأ أثناء الحذف. يرجى المحاولة مرة أخرى', 'error');
        };
    }
  

    const columns = [
        {
            title: 'image_start_year',
            dataIndex: 'image_start_year',
            key: 'image_start_year',
            render: (image_start_year, { name }) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <image
                        src={`http://127.0.0.1:8000/storage/Images/Models/${image_start_year}`}
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
            title: 'startYear',
            dataIndex: 'startYear',
            key: 'startYear',
        },
        {
            title: 'endYear',
            dataIndex: 'endYear',
            key: 'endYear',
        },
        {
            title: 'status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'update',
            dataIndex: 'id',
            key: 'id',
            render: (id, { name,
                image_start_year,
                image_end_year,
                status,
                brand_id,
                startYear,
                endYear }) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#editModel" onClick={() => collectedDataToEdit(id,
                        {
                            "name": name,
                            "image_start_year": image_start_year,
                            "image_end_year": image_end_year,
                            "status": status,
                            "brand_id": brand_id,
                            "startYear": startYear,
                            "endYear": endYear,
                            "id": id
                        }
                    )
                    } >
                        <i className="fa fa-pencil"></i>
                    </button>

                    <button className="btn btn-danger mx-2"  onClick={() => deleteConfirmation(id,deleteModel)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </div>
            ),

        },

    ];
    if (loading) return <Loading />; // Show Loading spinner

    return (
        <>
         {/* Loading Layer */}
         {isLoading && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                    <p>جارِ تحميل البيانات...</p>
                </div>
            )}
            <DeleteModal />
            <h1 className='text-center mainFont'>اضافه الموديلات</h1>
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
                            <label className='fw-bold'>اضافه صوره بدايه السنه  </label>
                            <input
                                type='file'
                                className="form-control"
                                required
                                name='image_start_year'
                                onChange={(event) => {
                                    formik.setFieldValue("image_start_year", event.target.files[0]);
                                }}
                            />
                            {formik.touched.image_start_year && formik.errors.image_start_year ? (
                                <div className='text-danger'>{formik.errors.image_start_year}</div>
                            ) : null}
                        </div>
                        <div className="form-group col-xs-12 col-sm-2 col-md-2 col-lg-3">
                            <label className='fw-bold'>اضافه صوره نهايه السنه  </label>
                            <input
                                type='file'
                                className="form-control"
                                required
                                name='image_end_year'
                                // ref={imageInputRef} 
                                onChange={(event) => {
                                    formik.setFieldValue("image_end_year", event.target.files[0]);
                                }}
                            />
                            {formik.touched.image_end_year && formik.errors.image_end_year ? (
                                <div className='text-danger'>{formik.errors.image_end_year}</div>
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
                        <div className='col-xs-12 col-sm-2 col-md-2 col-lg-3 mt-2' >
                            <label htmlFor="" className='fw-bold'> بدايه الاصدار </label>
                            <select id="dataSelect"
                                className="form-select"
                                required
                                name='startYear'
                                {...formik.getFieldProps('startYear')}
                            >
                                <option value="" disabled selected>اختر  بدايه الاصدار</option>
                                <option value="2007"> 2007 </option>
                                <option value="2008">2008</option>
                            </select>
                            {formik.touched.startYear && formik.errors.startYear ? (
                                <div className="text-danger">{formik.errors.startYear}</div>
                            ) : null}
                        </div>
                        <div className='col-xs-12 col-sm-2 col-md-2 col-lg-3 mt-2 ' >
                            <label className='fw-bold'>  نهايه الاصدار</label>
                            <select id="dataSelect"
                                className="form-select"
                                required
                                name='endYear'
                                {...formik.getFieldProps('endYear')}
                            >
                                <option value="" disabled selected>اختر  نهايه الاصدار</option>
                                <option value="2007"> 2007 </option>
                                <option value="2008">2008</option>
                            </select>
                            {formik.touched.endYear && formik.errors.endYear ? (
                                <div className="text-danger">{formik.errors.endYear}</div>
                            ) : null}
                        </div>
                        <div className='mt-2 col-xs-12 col-sm-2 col-md-2 col-lg-3 mt-2'>
                            <label className='fw-bold'>اختر البراند</label>
                            <select
                                id="dataSelect"
                                className="form-select"
                                name='brand_id'
                                required
                                {...formik.getFieldProps('brand_id')}
                            >
                                <option value="" disabled selected>اختر البراند</option>
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
                    </div>
                    <div className='text-center '>
                        <button type='submit' className='btn btn- text-center mt-3 col-1'style={{background:"orange"}}>ارسال</button>
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

            <Filtr data={ModelData} filtrated={setModelData} nameOfSession={'modelData'} />

            <div className='mt-3'>
                {Array.isArray(ModelData) && (
                    <Table pagination={ModelData?.length > 5 ? { pageSize: 5 } : false} dataSource={ModelData} columns={columns} />
                )}
            </div>
            {/* modal to delete and edit  */}
            <DeleteModal idModal={"deletModel"} deleteFn={deleteModel} />
            <EditModels i={obj}  typeOf={"models"} idModal={"editModel"} fetchBrand={fetchModels}/>
        </>
    );
}



