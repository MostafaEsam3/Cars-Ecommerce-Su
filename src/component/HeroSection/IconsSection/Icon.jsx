import React from 'react'
import carImage from "./../../../assets/icon-delivery.png"
import custumer from "./../../../assets/Icon-Customer service.svg"



export default function Icon() {
    return (
        <>
            <div className=' m-auto col-11 mt-3 row justify-content-evenly' style={{}}>
            <div className='col-md-4 text-center'>

                <div className='f-icon text-center d-flex justify-content-center align-items-center m-auto' style={{ width: "66px", height: "66px", borderRadius: "50%", backgroundColor: "#7D8184" }}>
                    <div className='f-icon d-flex justify-content-center align-items-center ' style={{ width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "black", padding: "10px" }}>
                        <div className=''>
                            <img src={carImage} alt="product" style={{ width: "", height: "", objectFit: "cover" }} />
                        </div>
                    </div>
                </div>
                <p className='mt-2'>MONEY BACK GUARANTEE</p>
                <p>We reurn money within 30 days</p>

     </div>


<div className='col-md-4 text-center'>

                <div className='f-icon text-center d-flex justify-content-center align-items-center m-auto' style={{ width: "66px", height: "66px", borderRadius: "50%", backgroundColor: "#7D8184" }}>
                    <div className='f-icon d-flex justify-content-center align-items-center ' style={{ width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "black", padding: "10px" }}>
                        <div className=''>
                            <img src={carImage} alt="product" style={{ width: "", height: "", objectFit: "cover" }} />
                        </div>
                    </div>
                </div>
                <p className='mt-2'>MONEY BACK GUARANTEE</p>
                <p>We reurn money within 30 days</p>
</div>


                <div className='col-md-4  text-center'>
                    <div className='f-icon text-center d-flex justify-content-center align-items-center  m-auto ' style={{ width: "66px", height: "66px", borderRadius: "50%", backgroundColor: "#7D8184" }}>
                        <div className='f-icon d-flex justify-content-center align-items-center ' style={{ width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "black", padding: "10px" }}>
                            <div className=''>
                                <img src={custumer} alt="product" style={{ width: "", height: "", objectFit: "cover" }} />
                            </div>
                        </div>
                    </div>
                    <p className='mt-2'>MONEY BACK GUARANTEE</p>
                    <p>We reurn money within 30 days</p>

                </div>
            </div>

        </>
    )
}
