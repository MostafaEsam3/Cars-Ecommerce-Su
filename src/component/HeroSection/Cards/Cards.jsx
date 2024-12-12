import React, { useContext, useEffect, useState } from 'react';
import "./Cards.css"
import productImage from "./../../../assets/g92-2-500x500 1.svg";
import CardTemplate from './CardTemplate';
import Withcomp from '../../WithComp/WithComp';
import { scrollerContext } from '../../context/context';
import WithComp from '../../HighOrderComp/HighOrderComp';

const Cards = ({ Scroll, changeScroll }) => {
    // const { Scroll, changeScroll } = useContext(scrollerContext);

    return (
        <>
<div className={Scroll?'wraber row justify-content-between':' row justify-content-between flex-wrap'}>
 <CardTemplate  img={"https://www.bleco.sa/wp-content/uploads/2024/07/Talbesa_03-8.webp"}/>
 <CardTemplate/>
 <CardTemplate img={"https://www.bleco.sa/wp-content/uploads/2024/07/Talbesa_02-8.webp"}/>
 <CardTemplate img={"https://www.bleco.sa/wp-content/uploads/2024/07/Talbesa_01-8.webp"} />
 <CardTemplate />
 <CardTemplate />
</div>
<div className='m-auto mt-4'>
    <button className='btn btn-warning 'style={{display:"block",margin:"auto"}} onClick={()=>changeScroll()}>{Scroll ?"عرض كل المنتجات":"عرض أقل"}</button>
</div>
<div className='line bg-secondary mt-4'style={{width:"100%",borderBottom:"1px solid #000000" }}></div>
        
        </>
    );
}

export default WithComp(Cards);
