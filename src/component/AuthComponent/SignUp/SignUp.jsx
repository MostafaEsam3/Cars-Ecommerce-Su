import React from 'react'
import sideImage from "./../../../assets/Side Image.svg"
import google from "./../../../assets/Icon-Google.svg"
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <>
    <div className='pt-4'>
  <div className='row p-0 m-0' style={{  }}>
    {/* القسم الأيسر للصورة */}
    <div className='col-12 col-md-6  p-0'>
        <div className='col-12 col-md-10' style={{}}>
        <img 
            src={sideImage} 
            alt="sign" 
            style={{
                width: "100%", 
                // height: "100%", 
                objectFit: "cover"
            }} 
        />
           </div>
    </div>

    {/* القسم الأيمن لتسجيل الدخول */}
    <div className='col-12 col-md-6 d-flex align-items-center justify-content-center m-0  gx-0 p-0  text-center text-md-start'>
        <form style={{ width: "80%" }}>
            <h2 className=''>Create an account</h2>
            <p className=''>Enter your details below</p>
            <div className='m'>
                <label htmlFor='email' className='form-label'></label>
                <input 
                    type='email' 
                    id='email' 
                    className='form-control' 
                    placeholder='email' 
                    style={{border:"none",width:"100%"}}
                />
            </div>
            <div style={{height:"px",width:"80%",borderBottom:"1px solid grey"}}>
            </div>
            <div className=''>
                <label htmlFor='email' className='form-label'></label>
                <input 
                    type='Password' 
                    id='email' 
                    className='form-control' 
                    placeholder='Password' 
                    style={{border:"none",width:"100%"}}
                />
            </div>
            <div style={{height:"px",width:"80%",borderBottom:"1px solid grey"}}>
            </div>

            <div className=''>
                <label htmlFor='phone' className='form-label'></label>
                <input 
                    type='number' 
                    id='phone' 
                    className='form-control' 
                    placeholder='phone' 
                    style={{border:"none",width:"100%"}}
                />
            </div>
            <div style={{height:"px",width:"80%",borderBottom:"1px solid grey"}}>
            </div>
            <button type='submit' className='btn btn- mt-4 text-center'style={{width:"80%",backgroundColor:"#DB4444",color:"white"}}>Create Account</button>
            <button type='submit' className='btn btn- mt-4 text-center'style={{width:"80%",backgroundColor:"",color:"black",border:"1px solid black"}}> <span><img src={google} alt="" /></span> Sign up with Google</button>
            <p className='text-center mt-3'style={{width:"80%"}}>Already have account? <Link to={"/login"}style={{color:"#DB4444"}}>Login</Link></p>
        </form>
    </div>
</div>
</div>

    </>
  )
}
