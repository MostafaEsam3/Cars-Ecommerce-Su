import React from 'react';
import { useTimer } from 'react-timer-hook';
import Timer from './Timer';
import Cards from '../Cards/Cards';

const SecondHero = ({expiryTimestamp}) => {
    return (
        <>
        <div className='mt-5  row align-items-center  g-0'style={{direction:"rtl"}}>
            <div className='bord bg-danger'style={{width:"20px",height:"20px",border:"2px solid red" ,borderRadius:'5px',}}>
           </div>
            <div className=' col-3 mx-2'>
            <span className='text-danger'>اليوم</span>
            </div>
        </div>
        <Timer/>
        <div>
</div>
        
        </>
       
    );
}

export default SecondHero;
