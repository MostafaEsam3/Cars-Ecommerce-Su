import React from 'react';
import mobileImage from './../../../assets/Vector (2).svg'
import moket from './../../../assets/g27cq4-500x500 1.png'
import moket2 from './../../../assets/image 46.svg'
import { data } from 'autoprefixer';



const Category = ({Data,handleFilterAccCategory}) => {

    
    return (
        <>
  
            <div className='mt-5  row g-0 align-items-center dir-ar '>
                <div className='bord bg-danger' style={{ width: "20px", height: "20px", border: "2px solid red", borderRadius: '5px', }}>
                </div>
                <div className=' col-3 mx-3'>
                    <span className='text-danger' style={{ marginLeft: '10px' }}>الاقسام</span>
                </div>
            </div>

            <div className=' col-12 col-md-12   dir-ar '>
                <h1> تصفح الاقسام</h1>
            </div>

            <div className='wraber_category row g-0 justify-content-start  flex-wrap dir-ar mt-3 ' >

            
            {
            Data?.length > 0 ? 
            Data?.map((ele)=>{
                return   <div className='category d-flex flex-column align-items-center justify-content- p-4 col-6 col-md-2 mx-md-1 mt-1 mt-md-0  rounded-1 shadow'  style={{ border: "1px solid #dbdfe9", height: "auto" ,paddingBottom:"10px"}}>
                <div className='' style={{ height: "100%" }}>
                    <img src={ele?.image} alt="mobilePhone" className=' w-100' height={"100%"} onClick={()=>handleFilterAccCategory(ele.id)} />
                </div>
                <div className='mt-2'>
                    <span className='text-muted'>تلبيسه الدايموند</span>
                </div>
            </div>
            })
         
:""
            
        } 
                      
                 




                {/* <div className='category d-flex flex-column align-items-center justify-content-center p-4 col-6 col-md-2 mx-md-1 mt-1 mt-md-0  rounded-1 shadow'  style={{ border: "1px solid #dbdfe9", height: "30vh" }}>
                    <div className='' style={{ height: "100%" }}>
                        <img src="https://www.bleco.sa/wp-content/uploads/2024/07/Talbesa_04-8.webp" alt="mobilePhone" className=' w-100' height={"100%"} />
                    </div>
                    <div className='mt-2'>
                        <span className='text-muted'>تلبيسه المثلثات</span>
                    </div>
                </div>

                <div className='category d-flex flex-column align-items-center justify-content-center p-4 col-6 col-md-2 mx-md-1 mt-1 mt-md-0  rounded-1 shadow'  style={{ border: "1px solid #dbdfe9", height: "30vh" }}>
                    <div className='' style={{ height: "100%" }}>
                        <img src="https://www.bleco.sa/wp-content/uploads/2024/07/Talbesa_02-8.webp" alt="mobilePhone" className=' w-100' height={"100%"} />
                    </div>
                    <div className='mt-2'>
                        <span className='text-muted'>تلبيسه الفاخر</span>
                    </div>
                </div>

                <div className='category d-flex flex-column align-items-center justify-content-center p-4 col-6 col-md-2 mx-md-1 mt-1 mt-md-0  rounded-1 shadow ' style={{ border: "1px solid #dbdfe9", height: "30vh" }}>
                    <div className='' style={{ height: "100%" }}>
                        <img src="https://www.bleco.sa/wp-content/uploads/2024/07/Talbesa_01-8.webp" alt="mobilePhone" className=' w-100' height={"100%"} />
                    </div>
                    <div className='mt-2'>
                        <span className='text-muted'>تلبيسه الليزر</span>
                    </div>
                </div> */}
            </div>

            <div className='line bg-secondary mt-4' style={{ width: "100%", borderBottom: "1px solid #000000" }}></div>

        </>
    );
}

export default Category;
