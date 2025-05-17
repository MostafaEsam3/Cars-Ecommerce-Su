import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import imageSuccess from "./../../assets/images.png"
import imageFail from "./../../assets/images (1).png"
import ModalDelete, { Notify, NotifyError } from './Alert';

export default function EditModal(props) {
    const imgInputRef = useRef(null);
    const [mod, setmod] = useState(false);
    const [modalMessage, setModalMessage] = useState(""); // لتخزين الرسالة المعروضة في المودال
    const [modalType, setModalType] = useState(""); // لتحديد إذا كانت الرسالة فشل أم نجاح
    const [inputUser,setInputUser]=useState({
        image:""
})

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setInputUser({ ...inputUser, image: file });
        }
      }
    const editBrand = async (data) => {
        // try {
        //     const response = await axios.post(
        //         `http://127.0.0.1:8000/dashboard/brands/${props.i.id}`,
        //         data,
        //         {
        //             headers: {
        //                 'Accept': 'application/json, text/plain, */*',
        //             },
        //         }
        //     );
        //     console.log(response, "تم ارسال البيانات بنجاح");
        //     setModalType("success");
        //     setModalMessage("تم إرسال البيانات بنجاح!");
        //     setmod(true);
        //     props.fetchBrand()
        // } catch (error) {
        //     console.error(error);
        //             setModalType("failure");
        //     setModalMessage("حدث خطأ أثناء إرسال البيانات.");
        //     setmod(true);
        // }

        await axios.post(
            `http://127.0.0.1:8000/dashboard/${props.typeOf}/${props.i.id}`,
            data, // Payload for the POST request
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        ).then((response) => {
            console.log(response);
            Notify("done")
            props.fetchBrand()
        }).catch((err) => {
            console.log(err);
            NotifyError(err.response.data.message)
        });
    };

    const formik = useFormik({
        initialValues: {
            name: "", // تهيئة الحقول بشكل افتراضي
            image: null,
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required("يرجي ادخال قسم"),
            image: Yup.mixed()
                .required("يرجي ادخال صورة")
                .test('fileType', 'يرجى رفع ملف صحيح', (value) => value != null),
        }),
        onSubmit: (values, { resetForm }) => {
            const updatedValues = {
                name:values.name,
                _method: 'PUT', 
            };

            if (inputUser.image) {
                updatedValues.image = inputUser.image; // Add new image
            }    
            editBrand(updatedValues)
        }

    });

    useEffect(() => {
        if (props.i) {
            formik.setValues({
                name: props.i.name || "",
                image: props.i.image || null,
            });
        }
    }, [props.i]);
    const closeModal = () => {
      setmod(false);
    }

    return (
        <>
       < ModalDelete/>
            <div className="modal fade" id={props.idModal} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered  " >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">هل تريد التعديل</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h1 className='text-center'>اضافه التعديلات</h1>
                            <form onSubmit={formik.handleSubmit} className='mt-3'>
                                <div className="container-fluid dir-ar">
                                    <div className="col-xs-11 text-center row">
                                        <div className="form-group col-xs-12 col-sm-2 col-md-2 col-lg-12">
                                            <label className='fw-bold'>اسم البراند</label>
                                            <input
                                                name='name'
                                                type='text'
                                                className="form-control"
                                                {...formik.getFieldProps('name')}
                                            />
                                            {formik.touched.name && formik.errors.name ? (
                                                <div className='text-danger'>{formik.errors.name}</div>
                                            ) : null}
                                        </div>
                                        <div className="form-group col-xs-12 col-sm-2 col-md-2 col-lg-12">
                                            <label className='fw-bold'>اضافه صوره براند</label>
                                            <input
                                                type='file'
                                                accept=".jpg, .jpeg, .png" 
                                                className="form-control"
                                                name="image"
                                                ref={imgInputRef}
                                              onChange={handleImageChange}  
                                            />
                                            {formik.touched.image && formik.errors.image ? (
                                                <div className='text-danger'>{formik.errors.image}</div>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div className='text-center'>
                                        <button type='submit' className='btn btn-danger text-center mt-3' data-bs-dismiss="modal">ارسال</button>
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
