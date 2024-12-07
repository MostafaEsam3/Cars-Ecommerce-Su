import React from 'react';
import productImage from "./../../assets/g92-2-500x500 1.svg";
import tv from "./../../assets/g27cq4-500x500 1.svg";
import bshkash from "./../../assets/Bkash.svg";
import visa from "./../../assets/Visa.svg";
import master from "./../../assets/Mastercard.svg";
import nagad from "./../../assets/Nagad.svg";




const Checkout = () => {
    return (
        <>

            <div className='container mt-5'>
                <h2 className='fw-bold'>
                    Billing Details
                </h2>
                <div className='row g-1 p-0 m-0 justify-content-'>
                    <div className='col-12 col-md-5'>
                        <div>
                            <label htmlFor="">email</label>
                            <input type="text" className='form-control w-75  bg-secondary-subtle' />
                        </div>
                        <div className='mt-2'>
                            <label htmlFor="">Company Name</label>
                            <input type="text" className='form-control w-75 bg-secondary-subtle' />
                        </div>
                        <div className='mt-2'>
                            <label htmlFor="">Street Address*</label>
                            <input type="text" className='form-control w-75  bg-secondary-subtle' />
                        </div> <div className='mt-2'>
                            <label htmlFor="">Apartment, floor, etc. (optional)</label>
                            <input type="text" className='form-control w-75  bg-secondary-subtle' />
                        </div> <div className='mt-2'>
                            <label htmlFor="">Town/City*</label>
                            <input type="text" className='form-control w-75  bg-secondary-subtle' />
                        </div> <div className='mt-2'>
                            <label htmlFor="">Phone Number*</label>
                            <input type="text" className='form-control w-75  bg-secondary-subtle' />
                        </div>
                        <div className='mt-2'>
                            <label htmlFor="">Email Address*</label>
                            <input type="text" className='form-control w-75  bg-secondary-subtle' />
                        </div>

                        <div className='mt-2 d-flex align-items-center'>
                            <input type="checkbox" className='form-check ' name="" id="" />
                            <p className='ms-2'>Save this information for faster check-out next time</p>
                        </div>


                    </div>

                    <div className='col-12 col-md-4 mt-4 mt-md-0 'style={{marginRight:"150px"}}>

                        <div className='d-flex justify-content-between align-items-center mb-2'>
                            <div className='d-flex align-items-center' >
                                <img src={productImage} alt="" width={38} height={38} style={{ marginRight: 10 }} />
                                LCD Monitor
                            </div>
                            $1999
                        </div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div className='d-flex align-items-center' >
                                <img src={tv} alt="" width={38} height={38} style={{ marginRight: 10, objectFit: "cover" }} />
                                LCD Monitor
                            </div>
                            $1999
                        </div>
                        <div className=" mt-4  rounded-0">
                            <div> {/* Add a unique key for each item */}
                                <div className="d-flex align-items-center justify-content-between">
                                    <span>Subtotal:</span>
                                    <span>1133$</span>
                                </div>
                                <div className="border-bottom border-2 border-dark rounded-0 my-2"></div> {/* Adds spacing between rows */}

                                <div className="d-flex align-items-center justify-content-between">
                                    <span>Shipping:</span>
                                    <span>1133$</span>
                                </div>
                                <div className="border-bottom border-2 border-dark rounded-0 my-2"></div> {/* Adds spacing between rows */}
                                <div className="d-flex align-items-center justify-content-between">
                                    <span>Total:</span>
                                    <span>1133$</span>
                                </div>
                                <div className="border-bottom border-2 border-dark rounded-0 my-2"></div> {/* Adds spacing between rows */}
                            </div>

                            <div className='d-flex p-0 m-0 g-0 justify-content-between align-items-center'>


                                <div className='visa d-flex justify-content-between align-align-items-center flex-column  col-6'>
                                    <div>
                                        <input type="radio" className='' style={{ marginRight: "15px" }} />
                                        <span>Bank</span>
                                    </div>
                                    <div className='mt-2'>
                                        <input type="radio" className='' style={{ marginRight: "15px" }} />
                                        <span>Cash on delivery</span>
                                    </div>
                                </div>

                                <div className='col-6'>
                                    <span>
                                        <img src={bshkash} alt="" style={{ width: 37, height: 37, marginRight: "17px" }} />
                                    </span>
                                    <span>
                                        <img src={visa} alt="" style={{ width: 37, height: 37, marginRight: "17px" }} />
                                    </span>
                                    <span>
                                        <img src={master} alt="" style={{ width: 37, height: 37, marginRight: "17px" }} />
                                    </span>
                                    <span>
                                        <img src={nagad} alt="" style={{ width: 37, height: 37, marginRight: "17px" }} />
                                    </span>
                                </div>
                            </div>

                            <div className='cupon row mt-4'>
                                <div className='col-6'>
                                    <input type="text" className='form-control rounded-0' name="" id="" placeholder="Apply Coupon   " />
                                </div>
                                <div className='col-6'>
                                    <button className='btn btn-danger w-100 rounded-0'>Apply Coupon</button>
                                </div>
                              </div>

                            <div className='mt-4'>
                                <button className='btn btn-danger text-center'>Procees to checkout</button>
                            </div>
                        </div>

                    </div>



                </div>

            </div>

        </>
    );
}

export default Checkout;
