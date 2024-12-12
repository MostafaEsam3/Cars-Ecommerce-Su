import React from 'react';
import ToglesData from './toglesData';
import image from "./../../../assets/Frame 560.png"
import image2 from "./../../../assets/Ywgr48fKBegXCgyvqz5nfhyzVAcSni3Ssve1aKGS.webp"


const FirstHero = () => {
    return (
        <>

            <div className='row '>
                <div className='col-12 col-md-12 mx-md-2' >

                    <div className='image_cursool'>
                        <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-inner">
                                <div class="carousel-item active " data-bs-interval="1000"style={{width:"100%"}}>
                                    <img src="https://www.bleco.sa/wp-content/uploads/2024/07/Talbesa_04-8.webp" class=" " style={{width:"100%",height:"60vh"}}/>
                                </div>
                                <div class="carousel-item  " data-bs-interval="1000"style={{width:"100%"}}>
                                    <img src="https://www.bleco.sa/wp-content/uploads/2024/07/Talbesa_02-8.webp" class=""style={{width:"100%",height:"60vh"}}/>
                                </div>
                              
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>

                    </div>

                </div>

            </div>
            {/* end of section */}


        </>
    );
}

export default FirstHero;
