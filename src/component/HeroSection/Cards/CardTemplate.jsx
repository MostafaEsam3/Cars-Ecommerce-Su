import React, { useEffect } from 'react';
import productImage from "./../../../assets/g92-2-500x500 1.svg";
import "./Cards.css"
import Withcomp from '../../WithComp/WithComp';
import withLoading from '../../WithComp/WithComp';



const CardTemplate = ({name,loading,calc}) => {
    console.log("Current loading value:", loading);

    // Calling calc only once when component mounts
    useEffect(() => {
      console.log("useEffect executed");
      calc(10);  // Calling calc function only once when component mounts
    }, [calc]); 
    
    let rate = 3;
    return (
        <>
         <div className=' wraber_all_card content col-12 col-md-3' style={{ width: "", height: '350px', }}>
                <div className='grey_area pb-4' style={{ width: "", height: '220px', backgroundColor: "#F5F5F5", paddingBottom: "100px" }} >
                    <div className='wraber_dicount_and_heart d-flex justify-content-between p-2' >
                        <div className='dic  text-center borde d-flex align-items-center ' style={{ height: "20px", borderRadius: "10px", paddingLeft: "10px", paddingRight: "10px", padding: "15px" }} >
                            -40%
                        </div>
                        <div className='heart  d-flex align-items-center justify-content-center text-center' style={{ width: "30px", height: "30px", borderRadius: "50%" }}>
                            <span>❤</span>
                        </div>
                    </div>

                    <div className="wraber_image d-flex justify-content-between p-2  " style={{ marginBottom: "20px" }}>
                        <div
                            className="image  d-flex align-items-center justify-content-center text-center"
                            style={{ textAlign: "center", width: "100%" }}
                        >
                            <img src={productImage} alt="product" className="img-fluid" />
                        </div>
                        <div
                            className="heart bg-danger d-flex align-items-center justify-content-center text-center col-1"
                            style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                        >
                            <span>❤</span>
                        </div>
                    </div>
                    <div className='wraber_details'>
                        <p>HAVIT HV-G92</p>
                        <div>
                            <span>$120</span>
                            <span className='' style={{ marginLeft: '7px' }}>$120</span>
                        </div>
                        

                        <div className='rate'>
                            
                            <span  className={rate >= 1 ?"fa fa-star checked":"fa fa-star"}  ></span>
                            <span className={rate >= 2 ?"fa fa-star checked":"fa fa-star"}></span>
                            <span className={rate >= 3 ?"fa fa-star checked":"fa fa-star"}></span>
                            <span className={rate >= 4 ?"fa fa-star checked":"fa fa-star"}></span>
                            <span className={rate >= 5 ?"fa fa-star checked":"fa fa-star"}></span>

                            
                        </div>


                    </div>


                </div>
 </div>
        
        
        </>
        
    );
}

export default withLoading(CardTemplate);
