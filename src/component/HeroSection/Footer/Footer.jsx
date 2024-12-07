import React from 'react'
// import "./Footer.css"

export default function Footer() {
  return (
    <>

<footer class="bg- text-light  mt-5 pt-5" style={{backgroundColor:"#030406"}}>
    <div class="container">
        <div class="row justify-content-between">
            <div class="col-md-3  mb-4">
                <h3>Exclusive</h3>
                <p>
                Subscribe              
                  </p>
                  <p>Get 10% off your first order</p>
            
                <div className='search-input' style={{ position: "relative", width: "18vw" }}>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" style={{ width: "18vw", height: "50px" }} />
                                    <button className='btn' style={{ position: 'absolute', top: '7px', left: "7px", backgroundColor: "#6E62E5", width: "7vw", height: "", color: "#ffffff", fontSize: "16px" }}>
                                        ابدأ الان
                                    </button>

                                </div>
            </div>

            <div class="col-md-3  mb-4 " style={{lineHeight:"37px"}}>
                <h4>Support</h4>
                <ul class="list-unstyled">
                    <li><a href="#" class="text-light">111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.</a></li>
                    <li><a href="#" class="text-light">exclusive@gmail.com</a></li>
                    <li><a href="#" class="text-light">+88015-88888-9999</a></li>
                    {/* <li><a href="#" class="text-light">باقاتنا</a></li>
                    <li><a href="#" class="text-light">تواصل معنا</a></li> */}
                </ul>
            </div>


           < div class="col-md-2  mb-4 " style={{lineHeight:"37px"}}>
                <h4>Account</h4>
                <ul class="list-unstyled">
                    <li><a href="#" class="text-light">MY Account</a></li>
                    <li><a href="#" class="text-light">Login / Register</a></li>
                    <li><a href="#" class="text-light">Cart</a></li>
                    <li><a href="#" class="text-light">Wishlist</a></li>
                    <li><a href="#" class="text-light"> Shop</a></li>
                </ul>
            </div>

            <div class="col-md-3">
                <h4>SBYP</h4>
                <p>
                    نظام SBYP هو الحل المتكامل للتجارة الإلكترونية، يقدم لك أدوات مشتركة لتحسين أداء متجرك، وزيادة المبيعات، وتسهيل إدارة العمليات بكل يسر وفعالية.
                </p>
                <p><i class="fas fa-envelope"></i> info@sbyb.com</p>
            </div>
        </div>

        {/* <div class="row mt-4">
            <div class="col text-center">
                <a href="#" class="text-light me-3"><i class="fab fa-instagram"></i></a>
                <a href="#" class="text-light me-3"><i class="fab fa-twitter"></i></a>
                <a href="#" class="text-light me-3"><i class="fab fa-linkedin"></i></a>
            </div>
        </div> */}

        <div class="row mt-3">
            <div class="col text-center">
                <p class="mb-0">© جميع الحقوق محفوظة. SBYP 2024</p>
            </div>
        </div>
    </div>
</footer>

    
    
    </>
  )
}
