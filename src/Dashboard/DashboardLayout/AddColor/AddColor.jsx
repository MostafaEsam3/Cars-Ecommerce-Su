import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState, useRef, useEffect } from 'react';
import * as Yup from 'yup';
import imageSuccess from "./../../../assets/images.png"
import imageFail from "./../../../assets/images (1).png"
import DeleteModal from '../../../component/Modals/deleteModal';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import EditModal from '../../../component/Modals/EditModal';
import Filtr from '../../../component/Filtration/Filtration';
import { Notify, NotifyError } from '../../../component/Modals/Alert';
import { useFetchData } from '../../../hooks/useFetch';
import Swal from 'sweetalert2';
import EditColor from '../../../component/Modals/EditColor';

export default function AddColor() {
    const imgInputRef = useRef(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState(""); // لتخزين الرسالة المعروضة في المودال
    const [modalType, setModalType] = useState(""); // لتحديد إذا كانت الرسالة فشل أم نجاح
    const [selectedBrandId, setSelectedBrandId] = useState(null);
    const [obj, setobj] = useState({});
    // const [ColorData, setBrandData] = useState([])
 const { Data: ColorData, setData: setColorData, fetchData } = useFetchData("http://127.0.0.1:8000/dashboard/colors","colorsData");
    useEffect(()=>{
       fetchData();
    },[])

    // function add category 
    const addColor = async (data) => {
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/dashboard/colors',  // تأكد من المسار الصحيح
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
            hexa: "" ,
            status:1
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required("يرجي ادخال اسم اللون"),
                hexa: Yup.string()
                .required("يرجي ادخال لون"),
                status: Yup.string()
                .required("يرجي ادخال حاله")          
        }),
        onSubmit: (values, { resetForm }) => {
            const formData = new FormData();
            console.log(values);
            formData.append('name', values.name);  
            formData.append('hexa', values.hexa);  
            formData.append('status', values.status);  
            addColor(formData); 
            resetForm();

        },
    });

    const closeModal = () => {
        setModalVisible(false);
    }
    const removeModaleAfterSubmit = () => {
        document.getElementById("deleteColor").classList.remove("show", "d-block");
        document.querySelectorAll(".modal-backdrop")
            .forEach(el => el.classList.remove("modal-backdrop"));
    }
 
    const deleteColors = async (id) => {
        try {
            const response = await axios.delete(
                `http://127.0.0.1:8000/dashboard/colors/${id}`,               {
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
            title: 'hexa',
            dataIndex: 'hexa',
            key: 'hexa',
            render: (id,{hexa}) => (
                
                        <div style={{width:"30px",height:"30px",backgroundColor:`${hexa}`,borderRadius:"10px"}}>
                        </div>
            )
        },
        
        {
            title: 'update',
            dataIndex: 'id',
            key: 'id',
            render: (id,{name,status,hexa}) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#editColor" onClick={() => collectedDataToEdit(id,
                    {"name":name,
                    "hexa":hexa,
                    "status":status,
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
                await deleteColors(id);  // استدعاء دالة الحذف التي تريدها
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
    return (
        <>
        {/* tost delete modala */}
        <DeleteModal/>
            <h1 className='text-center'>اضافه الالوان</h1>
            <form onSubmit={formik.handleSubmit} className='mt-3'>
                <div className="container-fluid dir-ar">
                    <div className="col-xs-11 text-center row align-items-lg-center">
                        <div className="form-group col-xs-12 col-sm-2 col-md-2 col-lg-3">
                            <label className='fw-bold'>اسم اللون</label>
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
                        <div className="form-group col-xs-12 col-sm-2 col-md-2 col-lg-1 ">
                            <label className='fw-bold'>اسم اللون</label>
                            <input
                                name='hexa'
                                type='color'
                                className="form-control "
                                required
                                {...formik.getFieldProps('hexa')}
                            />
                            {formik.touched.hexa && formik.errors.hexa ? (
                                <div className='text-danger'>{formik.errors.hexa}</div>
                            ) : null}
                        </div>
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
 <Filtr data={ColorData} filtrated={setColorData} orig={ColorData} nameOfSession={'colorsData'}/>
<div className='mt-3'>
 <Table  pagination={ColorData.length > 5 ? { pageSize: 5 } :false} dataSource={ColorData} columns={columns} />
</div>









            {/* <button className='btn btn-light' >اضغط لمشاهده الفيديدو</button> */}
            <DeleteModal idModal={"deleteColor"} deleteFn={deleteColors} />
            <EditColor i={obj} typeOf={"colors"} idModal={"editColor"} fetchBrand={fetchData} nameOfImage={"image"}/>
        </>
    );
}
