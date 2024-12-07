import React from 'react';
import sideStory from "./../../assets/Side Image (1).svg"
import card1 from "./../../assets/Icon-Sale (1).svg"
import cardman from "./../../assets/image 46.svg"



const About = () => {
    return (
        <>
            <div className=''>
                <div className='our_story row g-0 mt-4 align-items-center justify-content-between'>
                    <div className='col-4 ' style={{ marginLeft: "180px" }}>
                        <h1 className='mb-3 fw-bold'>Our Story</h1>
                        <p className='mb-3'>Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region. </p>
                        <p>Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.</p>
                    </div>

                    <div className='col-6  d-flex  justify-content-start ' style={{ direction: "rtl" }}>
                        <img src={sideStory} alt="" width={'90%'} style={{ objectFit: "cover" }} />
                    </div>
                </div>
            </div>


            <div className='container  p-0 mt-4'>

                <div className='row g-0 p-0 m-0 justify-content-between'>
                    <div className='col-6 col-md-2 text-center p-4 border border-1 border-secondary-subtle '>
                        <div >
                            <div>
                                <img className='img-fluid ' src={card1} alt="mobilePhone" />
                            </div>
                            <div className='mt-2'>
                                <span className='fw-bold'>10.5k </span>
                            </div>
                            <div>
                                <span className='text-muted'>Sallers active our site</span>
                            </div>
                        </div>


                    </div>
                    <div className='col-6 col-md-2 text-center p-4 border border-1 border-secondary-subtle  '>
                        <div >
                            <div>
                                <img className='img-fluid ' src={card1} alt="mobilePhone" />
                            </div>
                            <div className='mt-2'>
                                <span className='fw-bold'>10.5k </span>
                            </div>
                            <div>
                                <span className='text-muted'>Sallers active our site</span>
                            </div>
                        </div>
                    </div>


                    <div className='col-6 col-md-2 text-center p-4 border border-1 border-secondary-subtle '>
                        <div >
                            <div>
                                <img className='img-fluid ' src={card1} alt="mobilePhone" />
                            </div>
                            <div className='mt-2'>
                                <span className='fw-bold'>10.5k </span>
                            </div>
                            <div>
                                <span className='text-muted'>Sallers active our site</span>
                            </div>
                        </div>


                    </div>


                    <div className='col-6 col-md-2 text-center p-4 border border-1 border-secondary-subtle '>
                        <div >
                            <div>
                                <img className='img-fluid ' src={card1} alt="mobilePhone" />
                            </div>
                            <div className='mt-2'>
                                <span className='fw-bold'>10.5k </span>
                            </div>
                            <div>
                                <span className='text-muted'>Sallers active our site</span>
                            </div>
                        </div>
                    </div>

                </div>


                <div className='img-card p-3 bg-info text-center col-4'>
                    <img src={cardman} alt="" width={236} height={391}style={{objectFit:"cover"}}/>
                </div>

            </div>

        </>
    );
}

export default About;
