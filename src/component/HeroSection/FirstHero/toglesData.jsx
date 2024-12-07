import React from 'react';

const ToglesData = () => {
    return (
       <>
          <div className='downn and up d-flex justify-content-between'>
                            <div className="=" id="categoryAccordion">
                                <div className="accordion-item" style={{ border: "none" }} >
                                    <li className="" id="headingOne">
                                        <li className=" collapsed " data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                            <span>womens Fashion</span>
                                        </li>
                                    </li>
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
                            </div>

                            <div className='sec_div_'>
                                <span  data-bs-toggle="collapse" data-bs-target="#collapseOne">  </span>
                            </div>

                        </div>
       
       </>
    );
}

export default ToglesData;
