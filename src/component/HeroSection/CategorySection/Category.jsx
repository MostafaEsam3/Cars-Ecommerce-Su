import React from 'react';
import mobileImage from  './../../../assets/Vector (2).svg'

const Category = () => {
    return (
        <>
            <div className='mt-5  row g-0 align-items-center '>
                <div className='bord bg-danger' style={{ width: "20px", height: "20px", border: "2px solid red", borderRadius: '5px', }}>
                </div>
                <div className=' col-3'>
                    <span className='text-danger' style={{ marginLeft: '10px' }}>Categories</span>
                </div>
            </div>
            <div className=' col-12 col-md-5 mx-auto mx-md-0 text-center text-md-start    '>
                <h1> Browse By Category </h1>
            </div>

<div className='wraber_category row g-0 justify-content-betwean flex-wrap' >

            <div className='category d-flex flex-column align-items-center justify-content-center p-4 col-12 col-md-1 mx-md-1'style={{border:"2px solid grey"}}>
                <div>
                    <img className='img-fluid ' src={mobileImage} alt="mobilePhone" />
                </div>
                <div>
                    <span>Phones</span>
                </div>
            </div>

            <div className='category d-flex flex-column align-items-center justify-content-center p-4 col-12 col-md-1 mx-md-1 mt-1 mt-md-0  'style={{border:"2px solid grey"}}>
                <div>
                    <img src={mobileImage} alt="mobilePhone" />
                </div>
                <div>
                    <span>Phones</span>
                </div>
            </div>


            
            </div>

            <div className='line bg-secondary mt-4'style={{width:"100%",borderBottom:"1px solid #000000" }}></div>

        </>
    );
}

export default Category;
