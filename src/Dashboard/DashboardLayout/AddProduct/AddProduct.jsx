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
import { deleteConfirmation } from '../../../hooks/deleteConfirmation';
import Swal from 'sweetalert2';
import { toHaveAccessibleDescription } from '@testing-library/jest-dom/matchers';
import { genBaseStyle } from 'antd/es/alert/style';
import { useAsyncError } from 'react-router-dom';
import EditProduct from '../../../component/Modals/EditProduct';
import Loading from '../../../Shared/Loading/Loading';

export default function AddProduct() {
    const imageInputRef = useRef(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState(""); // لتخزين الرسالة المعروضة في المودال
    const [modalType, setModalType] = useState(""); // لتحديد إذا كانت الرسالة فشل أم نجاح
    const [obj, setobj] = useState({});
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const { Data:ProductData, setData: setProductData, fetchData:fetchProduct,loading } = useFetchData("http://127.0.0.1:8000/dashboard/panelings","panelingsData");
    const { Data: CategoryData, setData: setCategoryData, fetchData :fetchCategory } = useFetchData("http://127.0.0.1:8000/dashboard/categories","categoryData");



    const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    fetchProduct();
    fetchCategory()
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
    const addProduct = async (data) => {
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/dashboard/panelings',  // تأكد من المسار الصحيح
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
           fetchProduct()
        } catch (error) {
            console.log(error); 
            // setModalType("failure");
            // setModalVisible(true
            Swal.fire({
                icon: 'error',
                title: 'خطأ',
                text: error?.response?.data?.message ||  'خطأ في إرسال البيانات' ,
              });
        }
    };

    // fn validation input 
    const formik = useFormik({
        initialValues: {
            name: "",
            status: 1,
            image: null ,
            description:"",
            category_id:"",
            link:""
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required("يرجي ادخال منتج"),  
            image: Yup.mixed()
                .required("يرجي ادخال صورة")
                .test('fileType', 'يرجى رفع ملف صحيح', (value) => value != null) ,
            link: Yup.string()
                .required("يرجى إدخال الرابط") 
                .url("يجب إدخال رابط صحيح"), 
            description: Yup.string()
                .required("يرجى إدخال وصف صحيح"),
            category_id:Yup.string()
                .required("يرجى إدخال اسم للقسم"),
        }),
        onSubmit: (values, { resetForm }) => {
            const formData = new FormData();
            formData.append('name', values.name); 
            formData.append('image', values.image); 
            formData.append('status', values.status);
            formData.append('category_id', values.category_id);
            formData.append('link', values.link);
            formData.append('description', values.description);

            addProduct(formData);  
            resetForm();
            imageInputRef.current.value = ''; 
        },
    });

    // دالة لإغلاق المودال
    const closeModal = () => {
        setModalVisible(false);
    }

    const collectedDataToEdit=(id,obj)=>{
        setSelectedCategoryId(id)
           setobj(obj)
        }

        const removeModaleAfterSubmit = (idModal) => {
            document.getElementById(idModal).classList.remove("show", "d-block");
            document.querySelectorAll(".modal-backdrop")
                .forEach(el => el.classList.remove("modal-backdrop"));
        }
     
        const deleteProduct = async (id) => {
            try {
                const response = await axios.delete(
                    `http://127.0.0.1:8000/dashboard/panelings/${id}`,               {
                        headers: {
                           'Accept': 'application/json, text/plain, */*',
                        }
                    }
                );
                console.log(response, "تم ارسال البيانات بنجاح");
                fetchProduct()          
                Swal.fire("تم المسح بنجاح")
            } catch (error) {
                console.error(error);
             Swal.fire('خطأ!', 'حدث خطأ أثناء الحذف. يرجى المحاولة مرة أخرى', 'error');
        };
        }

       const columns = [
            {
                title: 'image',
                dataIndex: 'image',
                key: 'image',
                render: (image,{name}) => (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            src={`http://127.0.0.1:8000/placeholder_images/default.svg`}
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
              title: 'description',
              dataIndex: 'description',
              key: 'description',
          },
            {
                title: 'update',
                dataIndex: 'id',
                key: 'id',
                render: (id,{name,image,description,status,link,category_id}) => (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#editPanelings" onClick={() => collectedDataToEdit(id,
                        {
                          "name":name,
                        "image":image,
                         id:id,
                         "description":description,
                         "status":status,
                         "link":link,
                         "category_id":category_id

                    }
                            )
                            } >
                            <i className="fa fa-pencil"></i>
                        </button>
    
                            <button className="btn btn-danger mx-2"  onClick={() => deleteConfirmation(id,deleteProduct)}> 
                                <i className="fa fa-trash"></i>
                            </button>
                    </div>
                ),
    
            },
    
        ];
        if (loading) return <Loading />; // Show Loading spinner

    return (
        <>
        <h1 className='text-center mainFont'>اضافه المنتجات</h1>
            <form onSubmit={formik.handleSubmit} className='mt-4'>
                <div className="container-fluid dir-ar mainFont">
                    <div className="col-xs-11 text-center row">
                        <div className="form-group col-xs-12 col-sm-2 col-md-2 col-lg-3">
                            <label className='fw-bold'>اسم المنتج</label>
                            <input 
                                name='name' 
                                type='text' 
                                className="form-control" 
                                required 
                                {...formik.getFieldProps('name') } 
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <div className='text-danger'>{formik.errors.name}</div>
                            ) : null}
                        </div>
                        <div className="form-group col-xs-12 col-sm-2 col-md-2 col-lg-3">
                            <label className='fw-bold'>وصف المنتج</label>
                            <input 
                                name='description' 
                                type='text' 
                                className="form-control" 
                                required 
                                {...formik.getFieldProps('description') } 
                            />
                            {formik.touched.description && formik.errors.description ? (
                                <div className='text-danger'>{formik.errors.description}</div>
                            ) : null}
                        </div>
                        <div className="form-group col-xs-12 col-sm-2 col-md-2 col-lg-3">
                            <label className='fw-bold'>اضافه لينك المنتج</label>
                            <input 
                                name='link' 
                                type='text' 
                                className="form-control" 
                                required 
                                {...formik.getFieldProps('link') } 
                            />
                            {formik.touched.link && formik.errors.link ? (
                                <div className='text-danger'>{formik.errors.link}</div>
                            ) : null}
                        </div>
                        <div className="form-group col-xs-12 col-sm-2 col-md-2 col-lg-3">
                            <label className='fw-bold'>اضافه صوره المنتج  </label>
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
                        <div className='mt-2 col-xs-12 col-sm-2 col-md-2 col-lg-3 mt-2'>
                            <label className='fw-bold'>اختر القسم</label>
                            <select
                                id="dataSelect"
                                className="form-select"
                                name='category_id'
                                required
                                {...formik.getFieldProps('category_id')}
                            >
                                <option value="" disabled selected>اختر القسم</option>
                                {CategoryData.map((item, index) => (
                                    <option key={index} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                            {formik.touched.category_id && formik.errors.category_id ? (
                                <div className="text-danger">{formik.errors.category_id}</div>
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
                        {modalType   == "success" ? <div>
                        <img src={imageSuccess} style={{maxWidth:"220px"}} alt="" />
                        </div>:""}
                        <h4>{modalMessage}</h4>
                        <button onClick={closeModal}  className={modalType == "success"? "btn btn-success":"btn btn-danger"} >إغلاق</button>
                    </div>
                </div>
            )}

 <Filtr data={ProductData} filtrated={setProductData} nameOfSession={'panelingsData'}/>

            <div className="mt-3">
                {Array.isArray(ProductData) && (
                    <Table
                        pagination={ProductData.length > 5 ? { pageSize: 5 } : false}
                        dataSource={ProductData}
                        columns={columns}
                    />
                )}
            </div>
        <EditProduct i={obj}  typeOf={"panelings"} idModal={"editPanelings"} fetchBrand={fetchProduct}/>
        </>
    );
}
