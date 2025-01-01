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
export default function AddCategory() {
    const imgInputRef = useRef(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState(""); // لتخزين الرسالة المعروضة في المودال
    const [modalType, setModalType] = useState(""); // لتحديد إذا كانت الرسالة فشل أم نجاح
    const [CategoryData,setCategoryData]=useState([]);
    const [obj, setobj] = useState({});
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const fetchCategoryData=async()=>{
        axios.get("http://127.0.0.1:8000/dashboard/categories").then((response)=>{
            console.log(response);
            setCategoryData(response.data.data)
            sessionStorage.setItem('categoryData', JSON.stringify(response.data.data));
        }).catch((err)=>{
            console.log(err); 
        })
    }
    
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
            setModalType("success");
            setModalMessage("تم إرسال البيانات بنجاح!");
            setModalVisible(true);
            fetchCategoryData()
        } catch (error) {
            console.log(error); 
            setModalType("failure");
            setModalVisible(true);
        }
    };

    // fn validation input 
    const formik = useFormik({
        initialValues: {
            name: "",
            img: null // قيمة مبدئية null للصورة
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required("يرجي ادخال قسم"),  
            img: Yup.mixed()
                .required("يرجي ادخال صورة")
                .test('fileType', 'يرجى رفع ملف صحيح', (value) => value != null) // التأكد من وجود الملف
        }),
        onSubmit: (values, { resetForm }) => {
            const formData = new FormData();
            formData.append('name', values.name);  // إضافة النص (الاسم)
            formData.append('img', values.img);  // إضافة الصورة أو الملف
            addCategory(formData);  // إرسال FormData إلى الـ API
            // إعادة تعيين النموذج بعد الإرسال
            resetForm();
            // إزالة الصورة من input بعد الـ submit
            imgInputRef.current.value = '';  // إعادة تعيين حقل الصورة ليظهر فارغًا
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
     
        const deleteCategory = async () => {
            try {
                const response = await axios.delete(
                    `http://127.0.0.1:8000/dashboard/categories/${selectedCategoryId}`,               {
                        headers: {
                           'Accept': 'application/json, text/plain, */*',
                        }
                    }
                );
                console.log(response, "تم ارسال البيانات بنجاح");
                removeModaleAfterSubmit("deletemodalcategory")
                fetchCategoryData()
                Notify("تم المسح بنجاح")
            } catch (error) {
                console.error(error);
                NotifyError(error.response.data.message)
        };
        }
    useEffect(()=>{
        fetchCategoryData()
    },[])

       const columns = [
            {
                title: 'img',
                dataIndex: 'img',
                key: 'img',
                render: (img,{name}) => (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            src={ `http://127.0.0.1:8000/storage/Images/categories/${img}`}
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
                render: (id,{name,img}) => (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#editcategory" onClick={() => collectedDataToEdit(id,
                        {"name":name,
                        "image":img,
                         id:id
                    }
                            )
                            } >
                            <i className="fa fa-pencil"></i>
                        </button>
    
                            <button className="btn btn-danger ms-2" data-bs-toggle="modal" data-bs-target="#deletemodalcategory"  onClick={() => setSelectedCategoryId(id)}> 
                                <i className="fa fa-trash"></i>
                            </button>
                    </div>
                ),
    
            },
    
        ];
    return (
        <>
        <h1 className='text-center'>اضافه الاقسام</h1>
            <form onSubmit={formik.handleSubmit} className='mt-4'>
                <div className="container-fluid dir-ar">
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
                                {...formik.getFieldProps('name') } 
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
                                name='img' 
                                ref={imgInputRef} 
                                onChange={(event) => {
                                    formik.setFieldValue("img", event.target.files[0]);
                                }}
                            />
                            {formik.touched.img && formik.errors.img ? (
                                <div className='text-danger'>{formik.errors.img}</div>
                            ) : null}
                        </div>
                    </div>
                    <div className='text-text-center '>
                    <button type='submit' className='btn btn-danger text-center mt-3'>ارسال</button>
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

 <Filtr data={CategoryData} filtrated={setCategoryData} />

<div className='mt-3'>
 <Table  pagination={CategoryData?.length > 5 ? { pageSize: 5 } :false} dataSource={CategoryData} columns={columns} />
</div>

      <DeleteModal idModal={"deletemodalcategory"} deleteFn={deleteCategory} />
            <EditModal i={obj} flag={"category"} typeOf={"categories"} idModal={"editcategory"} fetchBrand={fetchCategoryData}/>
        </>
    );
}
