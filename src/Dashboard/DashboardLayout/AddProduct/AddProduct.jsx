import React from 'react'
export default function AddProduct() {
  return (
    <>
    {/* <div className="col-xs-12 text-center">
            <div className="container-fluid ">
              <div className="col-xs-12 text-center">
                <div className="container-fluid" style={{ textAlign: 'center', backgroundColor: '#001529', borderRadius: 0, height: 23 }}>
                  <strong style={{ fontSize: 14, color: '#fff' }}>إضافة بيانات موظف</strong>
                </div>
                <p />
              </div>
            </div>
          </div> */}
       {/* this first inputs */}
       <div className="container-fluid dir-ar" >
          <div className="col-xs-11 text-center row">
            <div className="form-group col-xs-12 col-sm-2 col-md-2 col-lg-3 ">
              <label className='fw-bold'>اسم المنتج</label>
              <input className="form-control" required />
            </div>
            <div className="form-group col-xs-12 col-sm-2 col-md-2 col-lg-3">
              <label className='fw-bold'>اسم القسم التابع له</label>
              <select className="form-control" required />
            </div>
            <div className="form-group col-xs-12 col-sm-2 col-md-2 col-lg-3">
              <label className='fw-bold'> اللون </label>
              <select className="form-control" required />
            </div>
            <div className="form-group col-xs-12 col-sm-4 col-md-4 col-lg-3">
              <label className='fw-bold'> السعر</label>
              <input type="text" className="form-control" required />
            </div>
            <div className="form-group col-xs-12 col-sm-2 col-md-2 col-lg-3 mt-3">
              <label className='fw-bold'>المقاس</label>
              <select className="form-control" required />
            </div>
            <div className="form-group col-xs-12 col-sm-3 col-md-3 col-lg-3 mt-3">
              <label className='fw-bold'> الشركه</label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group col-xs-12 col-sm-3 col-md-3 col-lg-3 mt-3">
              <label className='fw-bold'>رقم العقد</label>
              <input type="text" className="form-control" required />
            </div>
            <div className="form-group col-xs-12 col-sm-2 col-md-2 col-lg-3 mt-3">
              <label className='fw-bold'>المدينة</label>
              <select className="form-control" required />
            </div>
            <div className="form-group col-xs-12 col-sm-2 col-md-2 col-lg-6 mt-3">
              <label className='fw-bold'>تفاصيل المنتج</label>
              <select className="form-control" required />
            </div>
            <div className="form-group col-xs-12 col-sm-2 col-md-2 col-lg-3 mt-3">
              <label className='fw-bold'>اضافه صوره للمنتج </label>
              <input type="file" className="form-control" required />
            </div>
          </div>
        </div>
        <p />
        {/* second section  */}
       
    
    </>
  )
}
