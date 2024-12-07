import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import sideImage from "./../../../assets/Side Image.svg";
import google from "./../../../assets/Icon-Google.svg";
import { Link } from 'react-router-dom';

export default function Login() {
    // Formik setup
    const formik = useFormik({
        initialValues: {
            email: 'modtfaaaa',
            password: 'ahmeddd',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
        }),
        onSubmit: (values) => {
            console.log('Form Data', values);
        },
    });

    return (
        <>
        <div className=''>

     
            <div className='pt-4 '>
                <div className='row p-0 m-0'>
                    {/* Left Section with Image */}
                    <div className='col-12 col-md-6 p-0'>
                        <div className='col-12 col-md-10 ground'>
                            <img
                                src={sideImage}
                                alt="sign"
                                style={{
                                    width: "100%",
                                    objectFit: "cover"
                                }}
                            />
                        </div>
                    </div>

                    {/* Right Section for Login Form */}
                    <div className='col-12 col-md-6 d-flex align-items-center justify-content-center m-0 gx-0 p-0 text-center text-md-start bg-light-subtle border-1 rounded-2  '>
                        <form
                            onSubmit={formik.handleSubmit}
                            style={{ width: "70%" }}
                        >
                            <h2>تسجيل الدخول</h2>
                            <p>املا البيانات التاليه</p>
                            
                            {/* Email Field */}
                            <div className='mb-3'>
                                <input
                                    type='email'
                                    id='email'
                                    name="email" // Ensure this matches the property name in initialValues
                                    className='form-control'
                                    placeholder='Email'
                                    style={{ border: "none", width: "100%" }}
                                    {...formik.getFieldProps('email')}
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className='text-danger'>{formik.errors.email}</div>
                                ) : null}
                            </div>

                            <div style={{ height: "1px", width: "80%", borderBottom: "1px solid grey" }}></div>

                            {/* Password Field */}
                            <div className='mb-3'>
                                <input
                                    type='password'
                                    id='password'
                                    name="password" // Ensure this matches the property name in initialValues
                                    className='form-control'
                                    placeholder='Password'
                                    style={{ border: "none", width: "100%" }}
                                    {...formik.getFieldProps('password')}
                                />
                                {formik.touched.password && formik.errors.password ? (
                                    <div className='text-danger'>{formik.errors.password}</div>
                                ) : null}
                            </div>

                            <div style={{ height: "1px", width: "80%", borderBottom: "1px solid grey" }}></div>

                            {/* Submit and Forget Password */}
                            <div className='d-flex mt-4 justify-content-between align-items-center' style={{ width: "80%" }}>
                                <button
                                    type='submit'
                                    className='btn'
                                    style={{
                                        backgroundColor: "#DB4444",
                                        color: "white",
                                    }}
                                >
                                    Log In
                                </button>
                                <Link style={{ color: "#DB4444" }}>Forget Password?</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
}
