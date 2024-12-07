import React from 'react';
import { useTimer } from 'react-timer-hook';

const Timer = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 3 * 24 * 60 * 60); // عداد لمدة 3 أيام
  
    const { seconds, minutes, hours, days } = useTimer({
      expiryTimestamp: time, // تمرير وقت انتهاء صحيح
      onExpire: () => console.log("Timer expired"),
    });
    return (
        <>
        
<div className='row  justify-content-between col-12 col-md-11   align-items-center mt-2'>
    <div className=' col-12 col-md-3 mx-auto mx-md-0 text-center text-md-start  p-0'>
    <h1>
        Flash Sales
        </h1>
    </div>
       
        <div className='wrapper_ d-flex col-9 col-md-5 justify-content-between align-items-center'>
            <div className='month  text-center '><p>Month:</p><p><span>{days}</span></p></div>
            <div className='month  text-center  '><p>Hours:</p><p>{hours.toString().padStart(2, "0")}</p></div>
            <div className='month  text-center  '><p>Minutes:</p><p>{minutes.toString().padStart(2, "0")}</p></div>
            <div className='month  text-center  '><p>Seconds</p><p>{seconds.toString().padStart(2, "0")}</p></div>
        </div>

        <div className='col-2 col-md-1' >
            <span>mostafa</span>
        </div>
        </div>
        </>
    );
}

export default Timer;
