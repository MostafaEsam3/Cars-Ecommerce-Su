import React from 'react';
import { useTimer } from 'react-timer-hook';
import Timer from './Timer';
import Cards from '../Cards/Cards';

const SecondHero = ({ expiryTimestamp, returnAllProducts }) => {
    return (
        <>
            <div className='mt-5  row align-items-center  g-0 mainFont ' style={{ direction: "rtl",justifyContent:"space-between" }}>
               {<div className='col-6 d-flex'> 
                <div className='bord bg-danger d-flex' style={{ width: "20px", height: "20px", border: "2px solid red", borderRadius: '5px', }}>
                </div>
                    <span className='text-danger mx-2'>اليوم</span> 
                    </div>}
                <div className='col-2'>
                    <div className=''>
                        <button className='btn btn-warning '  onClick={returnAllProducts}>استرجاع عرض كل المنتجات</button>
                    </div>
                </div>
            </div>
            <Timer />
            <div>
            </div>

        </>

    );
}

export default SecondHero;
