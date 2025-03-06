import React, { useEffect } from 'react';
import productImage from "./../../../assets/g92-2-500x500 1.svg";
import "./Cards.css"
import Withcomp from '../../WithComp/WithComp';
import withLoading from '../../WithComp/WithComp';
import { Link } from 'react-router-dom';
import Modal from "./../../Modals/Modal";
const CardTemplate = ({ name, description, calc, image,id }) => {

    let rate = 5;
    return (
        <>

            <div className=' wraber_all_card content col-12 col-md-3 mainFont' style={{ width: "", height: '', marginLeft: "10px" }}>

                <div class="bg mainFont"></div>
                <div class="blob"></div>
                <div className='grey_area pb-4' style={{ width: "", height: '', backgroundColor: "", paddingBottom: "100px" }} >
                    <div className='wraber_dicount_and_heart d-flex justify-content-between p-2' style={{ backgroundColor: "#F5F5F5" }} >
                        <div className='dic  text-center borde d-flex align-items-center ' style={{ height: "20px", borderRadius: "10px", paddingLeft: "10px", paddingRight: "10px", padding: "15px" }} >
                            -40%
                        </div>
                        <div className='heart  d-flex align-items-center justify-content-center text-center' style={{ width: "30px", height: "30px", borderRadius: "50%" }}>
                            <span>❤</span>
                        </div>
                    </div>
                    <Link to={"/cart"}>
                        <div className="wraber_image d-flex justify-content-between p-2  " style={{ marginBottom: "20px", backgroundColor: '#F5F5F5' }}>
                            <div
                                className="image  d-flex align-items-center justify-content-center text-center"
                                style={{ textAlign: "center", width: "100%" }}
                            >
                                <img src={image} alt="product" className="img-fluid" style={{ textAlign: "center", width: "172px", height: "152px" }} />
                            </div>
                            <div
                                className="heart bg-danger d-flex align-items-center justify-content-center text-center col-1"
                                style={{ width: "30px", height: "30px", borderRadius: "50%", color: "black" }}
                            >
                                <Link style={{ color: "black" }}><i className="fa fa-shopping-cart"></i></Link>
                            </div>
                        </div>
                    </Link>
                    <div className='wraber_details dir-ar'>
                        <p>{name}</p>
                        <p>{description}</p>

                        <div>
                            <span>$120</span>
                            <span className='' style={{ marginLeft: '7px' }}>$120</span>
                        </div>
                        <div className='rate'>
                            <span className={rate >= 1 ? "fa fa-star checked" : "fa fa-star"}  ></span>
                            <span className={rate >= 2 ? "fa fa-star checked" : "fa fa-star"}></span>
                            <span className={rate >= 3 ? "fa fa-star checked" : "fa fa-star"}></span>
                            <span className={rate >= 4 ? "fa fa-star checked" : "fa fa-star"}></span>
                            <span className={rate >= 5 ? "fa fa-star checked" : "fa fa-star"}></span>
                        </div>
                        <div class="text-slider">
                            <p class="text">شحن سريع </p>
                            <p class="text">صيانه دائمه</p>
                        </div>
                        <div className=' text-center d-flex justify-content-between'>
                        <Link to={`/cart/${id}`}><button className='btn btn-yellow '>أضف للسله </button></Link> 
                            <button className='btn btn-light ' data-bs-toggle="modal" data-bs-target="#exampleModal">اضغط لمشاهده الفيديدو</button>
                        </div>
                    </div>
                </div>

            </div>
            <Modal />

        </>

    );
}

export default CardTemplate;
