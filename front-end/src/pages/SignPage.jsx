import { Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { authStore } from '../store/authStore';
import {LoaderComponent} from '../components/LoaderComponent';


export const SignPage = () => {
    const [showPassword,setShowPassword] = useState(false);
     const [fullName,setFullName] = useState("");
      const [email,setEmail] = useState("");
       const [password,setPassword] = useState("");
        const {sign,isRegister} = authStore();

    const handlePassword = ()=>{
        setShowPassword((prev) => !prev);
    }

    const FormClear = ()=>{
      setFullName("");
      setEmail("");
      setPassword("");
    }

    const handleSubmit = (e)=>{
       e.preventDefault();
       const newUser = {
         fullName,
         email,
         password
       }
       sign(newUser);
       FormClear();
    }


  return (
    <div data-theme="dark" className='min-h-screen w-full'>
       <div className='p-2'>
         <div className='max-w-xl mx-auto bg-base-300 border p-3 border-[#ccc] rounded-xl relative top-32 '>
           <div className='flex items-center justify-center flex-col'>
               <div className='p-3'></div>
               {/* <h3 className='text-lg font-semibold leading-normal'>Register in to application</h3>
               <p>put your credentials there</p> */}
           </div>

           <form onSubmit={handleSubmit}>
            <div className='form-control'>
                <div className='label'>
                  <div className='label-text'>Full Name:</div>
                </div>
                <input type="text" 
                placeholder='Jhon Doe'
                className='input input-bordered'
                onChange={(e)=> setFullName(e.target.value)}
                value={fullName || ""}
                />
             </div>

             <div className='form-control'>
                <div className='label'>
                  <div className='label-text'>E-mail:</div>
                </div>
                <input type="text" 
                placeholder='JhonDoe@gmail.com'
                className='input input-bordered'
                onChange={(e)=> setEmail(e.target.value)}
                value={email || ""}
                />
             </div>

             <div className='form-control relative'>
              <div className='label'>
                 <div className='label-text'>Password:</div>
              </div>
              <input type={showPassword ? "text" : "password"} 
               placeholder='******'
               className='input input-border'
               onChange={(e)=> setPassword(e.target.value)}
               value={password || ""}
               />

               {showPassword ? <Eye onClick={handlePassword} className='absolute top-12 right-2 cursor-pointer' /> :
               <EyeOff onClick={handlePassword} className='absolute top-12 right-2 cursor-pointer' />
               }
             </div>

             <div className='form-control my-3'>
                <button className='btn btn-neutral' disabled={isRegister}>
                  {!isRegister ? "Register" : 
                  <LoaderComponent />
                  }
                </button>
             </div>

             <div className='flex flex-col justify-center items-center'>
                <h3>Have an account <Link to='/login' className='underline text-blue-500'>login</Link></h3>
             </div>

           </form>
         </div>
       </div>
    </div>  
  )
}
