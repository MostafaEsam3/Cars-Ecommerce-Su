import React from 'react'
import palystion from "./../../../assets/Frame 684.svg"
import womenImage from "./../../../assets/Frame 685.svg"


export default function NewArrival() {
  return (
   <>
    <div className='mt-5  row g-0 align-items-center '>
                <div className='bord bg-danger' style={{ width: "20px", height: "20px", border: "2px solid red", borderRadius: '5px', }}>
                </div>
                <div className=' col-3'>
                    <span className='text-danger' style={{ marginLeft: '10px' }}>Featured</span>
                </div>
            </div>
            <div className=' col-12 col-md-5 mx-auto mx-md-0 text-center text-md-start    '>
                <h1> New Arrival </h1>
            </div>
{/* 
            <div className='wraber_new_arrival_image row g-0 justify-content- bg-info '>

                <div className='col-12 col-md-6 bg-warning 'style={{height:"500px"}} >
                    <img src={palystion} alt="" className='h-100 w-100 'height={"100%"} style={{width:"100%",height:"100%",objectFit: "contain"}} />
                </div>
                <div className='col-12 col-md-5  d-flex flex-column mt-2 mt-md-0 ms- ms-md-2'>
                    <div className=''>
                        <img src={womenImage} alt="product" className='img-fluid' />
                    </div>


                    <div className='d-flex mt-4'>
                    <div className=''style={{width:"270px" ,height:'284px'}}>
                        <img src={womenImage} alt="product" className='img-fluid' />
                    </div>
                    <div className='mx-4' style={{width:"270px" ,height:'284px'}}>
                        <img src={womenImage} alt="product" className='img-fluid' />
                    </div>
                        
                    </div>

                    

                </div>

            </div> */}

<div className="row g-3">
      <div className="col-lg-6">
        <div className="card position-relative">
          <img src={palystion} alt="PlayStation 5"/>
          <div className="card-body">
            <h5 className="card-title">PlayStation 5</h5>
            <p className="card-text">Black and white version of the PS5 coming out on sale.</p>
            <a href="#" className="btn btn-primary btn-sm">Shop Now</a>
          </div>
        </div>
      </div>
      
      <div className="col-lg-6">
        <div className="row g-3">
          <div className="col-lg-12">
            <div className="card position-relative">
              <img src={womenImage} alt="Women's Collections"/>
              <div className="card-body">
                <h5 className="card-title">Women's Collections</h5>
                <p className="card-text">Featured women's collections that give you another vibe.</p>
                <a href="#" className="btn btn-primary btn-sm">Shop Now</a>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card position-relative">
              <img src={womenImage}  alt="Speakers"/>
              <div className="card-body">
                <h5 className="card-title">Speakers</h5>
                <p className="card-text">Amazon wireless speakers.</p>
                <a href="#" className="btn btn-primary btn-sm">Shop Now</a>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card position-relative">
              <img src={womenImage}  alt="Perfume"/>
              <div className="card-body">
                <h5 className="card-title">Perfume</h5>
                <p className="card-text">GUCCI INTENSE OUD EDP.</p>
                <a href="#" className="btn btn-primary btn-sm">Shop Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   
   </>
  )
}
