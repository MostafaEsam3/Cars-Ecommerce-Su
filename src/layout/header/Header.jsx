import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {


    return (
        <>

            {/* <div className='' style={{ backgroundColor: "#000000", width: '100%', height: "48px" }}> */}

                {/* <div className='' style={{margin:"auto", alignItems:"center",}}>
<div className='row -danger col-7'>

                    <div className='col-5'>
                        <p style={{margin:"0",padding:"0"}}>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</p>
                    </div>

                    <div className='language col-1 -warning'>
                        <select class="form-select" aria-label="Default select example">
                            <option selected>english</option>
                            <option value="1">arabic</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
    
</div>
                </div> */}
 <div className="bg-dark text-white py-2">
        <div className=" d-flex justify-content-around align-items-center text-center col-10 col-md-7 mx-auto">
          {/* Sale Announcement */}
          <div className='text-center'>
            <span>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! </span>
            <a href="#" className="text-warning fw-bold ms-1">ShopNow</a>
          </div>

          {/* English Button */}
          <div>
            <button className="btn btn-outline-light btn-sm">English</button>
          </div>
        </div>
      </div>


      {/* second nav  */}

       {/* <div className='container -warning '>

        <div className='row justify-content-between align-items-center'>
            <div className='-info col-3'>
                <span>Exclusive</span>
            </div>
            <div className=' col-3 col-4 -danger' >
                <ul className='nav justify-content-around'>
                    <li>home</li>
                    <li>Contact</li>
                    <li>About</li>
                    <li>Sign Up</li>


                </ul>

            </div>
            <div className='col-3    d-flex justify-content-between align-items-center' >
                <div className='search '  style={{width:"fit-content"}}>
                    <input className='input-group-text' type="" name="search" id="" style={{backgroundColor:"#F5F5F5"}}/>
                </div>
               
               <div>
                <span style={{marginRight:"2rem"}}>❤</span>
             
                <span>cart</span>
               
               </div>
               
               
               

            </div>

        </div>

      </div>  */}


<header className="container -warning py-1">

<div className="row justify-content-between align-items-center">
    {/* Left Section */}
    <div className="col-12 col-md-3 d-flex align-items-center py-2 justify-content-start">
      {/* Logo Section */}
      <img
        src="/capitano_brandai_1_.pdf_-_Personal_-_Microsoft__Edge_12_12_2024_09_42_06_ص-removebg-preview.png"
        alt="Brand Logo"
        style={{ width: "150px", height: "auto", cursor: "pointer" }}
      />
      {/* <span className="ms-2">Exclusive</span> */}
    </div>

    {/* Center Navigation */}
    <nav className="col-12 col-md-6 -danger">
      <div className="navbar navbar-expand-md navbar-light">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <Link className="nav-item" to={"/"}>
              <a className="nav-link text-dark" href="#">
                Home
              </a>
            </Link>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#">
                Contact
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#">
                About
              </a>
            </li>
            <Link className="nav-item" to={"/login"}>
              <a className="nav-link text-dark">
                Sign Up
              </a>
            </Link>
          </ul>
            </div>
          </div>
        </nav>

        {/* Right Section */}
        <div className="col-12 col-md-3 d-flex justify-content-between align-items-center py-2">
          <div className="search" style={{ flexGrow: 1, marginRight: "1rem" }}>
            <input
              className="form-control"
              type="text"
              placeholder="Search..."
              style={{ backgroundColor: "#F5F5F5" }}
            />
          </div>
          <div className="d-flex align-items-center">
            <span style={{ marginRight: "1rem", cursor: "pointer" }}>❤</span>
            <Link to={"/cart"} style={{color:"black"}}><i className="fa fa-shopping-cart"></i></Link>
            </div>
        </div>
      </div>
    </nav>

    {/* Right Section */}
    <div className="col-12 col-md-3 d-flex justify-content-between align-items-center py-2">
      <div className="search" style={{ flexGrow: 1, marginRight: "1rem" }}>
        <input
          className="form-control"
          type="text"
          placeholder="Search..."
          style={{ backgroundColor: "#F5F5F5" }}
        />
      </div>
      <div className="d-flex align-items-center">
        <span style={{ marginRight: "1rem", cursor: "pointer" }}>❤</span>
        <span style={{ cursor: "pointer" }}>Cart</span>
      </div>
    </div>
  </div>
</header>


    <div className='border-bottom' style={{marginTop:"0px"}} >
</div>



  {/* <div className="accordion" id="categoryAccordion">
    <div className="accordion-item" style={{border:"none"}} >
      <h2 className="accordion-header" id="headingOne">
        <button className="accordion-button collapsed category-header" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
          <span>Category 1</span>
        </button>
      </h2>
      <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#categoryAccordion">
        <div className="accordion-body">
          <ul className="">
            <li className="">Subcategory 1</li>
            <li className="">Subcategory 2</li>
            <li className="">Subcategory 3</li>
          </ul>
        </div>
      </div>
    </div>
</div> */}


            {/* </div> */}

        </>
    );
}

export default Header;
