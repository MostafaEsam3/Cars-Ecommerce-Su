import React from 'react'
import Kaset from "./../../../assets/JBL_BOOMBOX_2_HERO_020_x1 (1) 1.svg"

export default function BeutyImage() {
    return (
        <>

            <div className=' m-auto mt-2 ' style={{ backgroundColor: "#000000" }}>
            <div className='g-0 row justify-content-around p-4 flex-column-reverse flex-md-row'>
            <div className='col-12 col-md-5 '>
                        <h5 style={{ color: "#00FF66" }}>category</h5>
                        <h1 style={{ color: "#FAFAFA", fontSize: "48px" }}>Enhance Your Music Experince </h1>
                        <div className='wraber_circle d-flex'>
                            <div className='heart  d-flex flex-column  align-items-center justify-content-center text-center bg-light' style={{ width: "70px", height: "70px", borderRadius: "50%", }}>
                                <span>Days</span>
                                <span>22</span>
                            </div>
                            <div className='heart  d-flex flex-column align-items-center justify-content-center text-center bg-light' style={{ width: "70px", height: "70px", borderRadius: "50%" }}>
                                <span>Hours</span>
                                <span>13</span>
                            </div>


                        </div>
                        <button className='btn btn-success text-center mt-3'> Buy Now!</button>
                    </div>

                    <div className='col-12 col-md-6  text-center '>
                        <img src={Kaset} alt="product" className='img-fluid' />
                    </div>
                </div>
            </div>

        </>
    )
}
