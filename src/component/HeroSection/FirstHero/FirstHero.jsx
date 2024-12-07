import React from 'react';
import ToglesData from './toglesData';
import image from "./../../../assets/Frame 560.png"

const FirstHero = () => {
    return (
        <>

            <div className='row '>
                <div className='col-12 col-md-3  border-right' style={{borderRight:"1px solid grey"}} >
                    <ul className='' style={{ listStyle: "none", lineHeight: "30px",padding:"0" }}>
                        < ToglesData />
                        <li>Men’s Fashion</li>
                        <li>Electronics</li>
                        <li>Home & Lifestyle</li>
                        <li>Medicine</li>
                        <li>Sports & Outdoor</li>
                        <li>Baby’s & Toys</li>
                        <li>Groceries & Pets</li>
                        <li>Health & Beauty</li>
                    </ul>
                </div>

                <div className='col-12 col-md-8 mx-md-2' >

                    <div className='image_cursool'>
                        <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-inner">
                                <div class="carousel-item active" data-bs-interval="10000">
                                    <img src={image} class="d-block w-100" alt="..." />
                                </div>
                                <div class="carousel-item" data-bs-interval="2000">
                                    <img src={image} class="d-block w-100" alt="..." />
                                </div>
                                <div class="carousel-item">
                                    <img src={image} class="d-block w-100" alt="..." />
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
