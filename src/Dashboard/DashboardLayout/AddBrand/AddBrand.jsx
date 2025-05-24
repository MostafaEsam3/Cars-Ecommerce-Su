import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState, useRef, useEffect } from 'react';
import * as Yup from 'yup';
import imageSuccess from "./../../../assets/images.png"
import imageFail from "./../../../assets/images (1).png"
import DeleteModal from '../../../component/Modals/deleteModal';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // Add this to use Bootstrap's JS features
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import EditModal from '../../../component/Modals/EditModal';
import Filtr from '../../../component/Filtration/Filtration';
import { Notify, NotifyError } from '../../../component/Modals/Alert';
import { useFetchData } from '../../../hooks/useFetch';
import Swal from 'sweetalert2';
import Loading from '../../../Shared/Loading/Loading';

export default function AddBrand() {
    const imgInputRef = useRef(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState(""); // لتخزين الرسالة المعروضة في المودال
    const [modalType, setModalType] = useState(""); // لتحديد إذا كانت الرسالة فشل أم نجاح
    const [selectedBrandId, setSelectedBrandId] = useState(null);
    const [obj, setobj] = useState({});
    // const [BrandData, setBrandData] = useState([])
 const { Data: BrandData, setData: setBrandData, fetchData,loading } = useFetchData("http://127.0.0.1:8000/dashboard/brands","brandData");
    useEffect(()=>{
       fetchData();
    },[])

    // function add category 
    const addBrand = async (data) => {
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/dashboard/brands',  // تأكد من المسار الصحيح
                data,  // البيانات التي تريد إرسالها
                {
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                    }
                }
            );
            Swal.fire("تم ارسال البيانات بنجاح")
            console.log(response, "تم ارسال البيانات بنجاح");
            // إذا كانت الاستجابة ناجحة، نعرض رسالة النجاح
            // setModalType("success");
            // setModalMessage("تم إرسال البيانات بنجاح!");
            // عرض المودال بعد الإرسال الناجح
            // setModalVisible(true);
           fetchData()

        } catch (error) {
            console.error(error);
            // إذا حصل خطأ، نعرض رسالة الفشل
            setModalType("failure");
            setModalMessage( error.response.data.message);
            // عرض المودال بعد الخطأ
            setModalVisible(true);
        }
    };

    // fn validation input 
    const formik = useFormik({
        initialValues: {
            name: "",
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

            addBrand(formData);  // إرسال FormData إلى الـ API

            // إعادة تعيين النموذج بعد الإرسال
            resetForm();

            // إزالة الصورة من input بعد الـ submit
            imgInputRef.current.value = '';  // إعادة تعيين حقل الصورة ليظهر فارغًا
        },
    });

    const closeModal = () => {
        setModalVisible(false);
    }
    const removeModaleAfterSubmit = () => {
        document.getElementById("deletemodalbrand").classList.remove("show", "d-block");
        document.querySelectorAll(".modal-backdrop")
            .forEach(el => el.classList.remove("modal-backdrop"));
    }
 
    const deleteBrand = async (id) => {
        console.log(selectedBrandId);
        
        try {
            const response = await axios.delete(
                `http://127.0.0.1:8000/dashboard/brands/${id}`,               {
                    headers: {
                       'Accept': 'application/json, text/plain, */*',
                    }
                }
            );
            console.log(response, "تم ارسال البيانات بنجاح");
            removeModaleAfterSubmit()
           fetchData()
            Notify("تم المسح بنجاح")
        } catch (error) {
            console.error(error);
            NotifyError(error.response.data.message)
    };
    }
    const collectedDataToEdit=(id,obj)=>{
    setSelectedBrandId(id)
       setobj(obj)
    }
      
    const columns = [
        {
            title: 'image',
            dataIndex: 'image',
            key: 'image',
            render: (image,{name}) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src={ `http://127.0.0.1:8000/storage/Images/Brands/${image}`}
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
            render: (id,{name,image}) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button  className="btn btn-success" data-bs-toggle="modal" data-bs-target="#editBrand" onClick={() => collectedDataToEdit(id,
                    {"name":name,
                    "image":image,
                     id:id
                }
                        )
                        } >
                        <i className="fa fa-pencil"></i>
                    </button>
                        <button className="btn btn-danger mx-2"  onClick={() => deleteCategoryWithConfirmation(id)}> 
                            <i className="fa fa-trash"></i>
                        </button>
                </div>
            ),

        },

    ];
      const deleteCategoryWithConfirmation = async (id) => {
            try {
              const result = await Swal.fire({
                title: 'هل أنت متأكد؟',
                text: "لن تتمكن من استرجاع هذا العنصر!",
                icon: 'warning',
                showCancelButton: true,  // عرض زر إلغاء
                confirmButtonText: 'نعم، احذف',
                cancelButtonText: 'لا، إلغاء',
                reverseButtons: true  // تغيير ترتيب الأزرار ليكون الـ "نعم" بعد "لا"
              });
              if (result.isConfirmed) {
                  setSelectedBrandId(id)
                // إذا وافق المستخدم على الحذف
                await deleteBrand(id);  // استدعاء دالة الحذف التي تريدها
                Swal.fire('تم الحذف!', 'تم حذف العنصر بنجاح', 'success');  // عرض رسالة النجاح بعد الحذف
              } else {
                // إذا تم إلغاء الحذف
                Swal.fire('تم الإلغاء', 'لم يتم حذف العنصر', 'info');
              }
            } catch (error) {
              // في حال حدوث خطأ أثناء الحذف
              Swal.fire('خطأ!', 'حدث خطأ أثناء الحذف. يرجى المحاولة مرة أخرى', 'error');
            }
          };
          if (loading) return <Loading />; // Show Loading spinner

    return (
        <>
        {/* tost delete modala */}
        <DeleteModal/>
            <h1 className='text-center mainFont'>اضافه البراندات</h1>
            <form onSubmit={formik.handleSubmit} className='mt-3 mainFont'>
                <div className="container-fluid dir-ar mainFont">
                    <div className="col-xs-11 text-center row">
                        <div className="form-group col-xs-12 col-sm-2 col-md-2 col-lg-3">
                            <label className='fw-bold'>اسم البراند</label>
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
                            <label className='fw-bold'>اضافه صوره براند</label>
                            <input
                                type='file'
                                className="form-control"
                                required
                                name='image'
                                ref={imgInputRef}  
                                onChange={(event) => {
                                    formik.setFieldValue("image", event.target.files[0]);
                                }}
                            />
                            {formik.touched.image && formik.errors.image ? (
                                <div className='text-danger'>{formik.errors.image}</div>
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
                        </div> : <div><img src={imageFail} style={{ maxWidth: "220px" }} alt="" />
                        </div>}
                        <h4>{modalMessage}</h4>
                        <button onClick={closeModal} className={modalType == "success" ? "btn btn-success" : "btn btn-danger"} >إغلاق</button>
                    </div>
                </div>
            )}
{/* component of filtration  */}
 <Filtr data={BrandData} filtrated={setBrandData} orig={BrandData} nameOfSession={'brandData'}/>
<div className='mt-3'>
 <Table  pagination={BrandData?.length > 5 ? { pageSize: 5 } :false} dataSource={BrandData} columns={columns} />
</div>

            {/* <button className='btn btn-light' >اضغط لمشاهده الفيديدو</button> */}
            <DeleteModal idModal={"deletemodalbrand"} deleteFn={deleteBrand} />
            <EditModal i={obj} typeOf={"brands"} idModal={"editBrand"} fetchBrand={fetchData} nameOfImage={"image"}/>
        </>
    );
}
