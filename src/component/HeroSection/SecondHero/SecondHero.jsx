import React from 'react';
import { useTimer } from 'react-timer-hook';
import Timer from './Timer';

const SecondHero = ({expiryTimestamp}) => {
    return (
        <>
        <div className='mt-5  row align-items-center '>
            <div className='bord bg-danger'style={{width:"20px",height:"20px",border:"2px solid red" ,borderRadius:'5px',}}>
            </div>
            <div className=' col-3'>
            <span className='text-danger'>Todays</span>
            </div>
        </div>
        <Timer/>

        
        </>
       
    );
}

export default SecondHero;
