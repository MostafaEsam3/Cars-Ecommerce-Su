import React, { useState } from 'react'
import CardTemplate from '../Cards/CardTemplate'

export default function BestSelling() {
    const [Scroll, setScroll] = useState(true)
    const changeScroll = () => {
        setScroll((prev) => !prev); // إعادة القيمة الجديدة
    }
    return (
        <>
            <div className='mt-5  row g-0 align-items-center '>
                <div className='bord bg-danger' style={{ width: "20px", height: "20px", border: "2px solid red", borderRadius: '5px', }}>
                </div>
                <div className=' col-3'>
                    <span className='text-danger' style={{ marginLeft: '10px' }}>This Month</span>
                </div>
            </div>
            <div className=' col-12 col-md-5 mx-auto mx-md-0 text-center text-md-start    '>
                <h1> Best Selling Products </h1>
            </div>

            <div className={Scroll ? 'wraber row justify-content-between' : ' row justify-content-between flex-wrap'}>
                <CardTemplate />
                <CardTemplate />
                <CardTemplate />
                <CardTemplate />
                <CardTemplate />
            </div>

            <div className='m-auto '>
                <button className='btn btn-danger ' style={{ display: "block", margin: "auto" }} onClick={() => changeScroll()}>{Scroll ? "View More Product" : "Show less"}</button>
            </div>
            <div className='line bg-secondary mt-4' style={{ width: "100%", borderBottom: "1px solid #000000" }}></div>


        </>
    )
}
