import React, { useEffect, useState } from 'react';
import "./Cards.css"
import productImage from "./../../../assets/g92-2-500x500 1.svg";
import CardTemplate from './CardTemplate';
import Withcomp from '../../WithComp/WithComp';

const Cards = ({}) => {
    const [Scroll , setScroll]=useState(true)
    const changeScroll = () => {
        setScroll((prev) => !prev); // إعادة القيمة الجديدة
    }

    return (
        <>
<div className={Scroll?'wraber row justify-content-between':' row justify-content-between flex-wrap'}>
 <CardTemplate name={"mostafa"}/>
 <CardTemplate/>
 <CardTemplate/>
 <CardTemplate name={"moodu"}/>
 <CardTemplate name={"ahmed"}/>
 <CardTemplate name={"kandeel"}/>
</div>
<div className='m-auto '>
    <button className='btn btn-danger 'style={{display:"block",margin:"auto"}} onClick={()=>changeScroll()}>{Scroll ?"View More Product":"Show less"}</button>
</div>
<div className='line bg-secondary mt-4'style={{width:"100%",borderBottom:"1px solid #000000" }}></div>
        
        </>
    );
}

export default (Cards);
