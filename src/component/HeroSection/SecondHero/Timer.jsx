import React, { useContext, useState } from 'react';
import { useTimer } from 'react-timer-hook';
import Cards from '../Cards/Cards';
import { scrollerContext } from '../../context/context';

const Timer = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 3 * 24 * 60 * 60); // عداد لمدة 3 أيام

    const { seconds, minutes, hours, days } = useTimer({
        expiryTimestamp: time, // تمرير وقت انتهاء صحيح
        onExpire: () => console.log("Timer expired"),
    });
    // const { Scroll, changeScroll } = useContext(scrollerContext);


    return (
        <>
            <div className='row dir-ar  justify-content-between col-12 col-md-12  g-0 align-items-center mt-2  justify-content-between'>
                <div className=' col-12 col-md-5 mx-auto mx-md-0   p-0  g-0    '>
                    <h1>تعرف على الوان تلبيسات الليزر    </h1>
                </div>
                {/* <div className='col-3 bg-warning'style={{direction:'ltr'}}>
    <button className='btn btn-danger ' onClick={()=>changeScroll()}>{Scroll ?"عرض كل المنتجات":"عرض اقل"}</button>
                </div> */}
                <p className='text-muted mb-3 '>نقوم بإضافة المزيد لإرضائكم </p>

            </div>


        </>
    );
}

export default Timer;
