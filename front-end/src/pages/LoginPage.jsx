import { Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { authStore } from '../store/authStore';
import { LoaderComponent } from '../components/LoaderComponent';

export const LoginPage = () => {
    const [showPassword,setShowPassword] = useState(false);
     const [email,setEmail] = useState("");
      const [password,setPassword] = useState("");
        const {login,isLogging} = authStore();

    const handlePassword = ()=>{
        setShowPassword((prev) => !prev);
    }

    const ResetForm = ()=>{
      setEmail("");
      setPassword("");
    }

    const handleSubmit = (e)=>{
       e.preventDefault();
       const newLogin = {
        email,
        password
       }
       login(newLogin);
       ResetForm("");
    }


  return (
    <div data-theme="dark" className='min-h-screen w-full'>
       <div className='p-2'>
         <div className='max-w-xl mx-auto bg-base-300 border p-3 border-[#ccc] rounded-xl relative top-40 '>
           <div className='flex items-center justify-center flex-col'>
               <div className='p-2'></div>
               {/* <h3 className='text-lg font-semibold leading-normal'>Login in to application</h3>
               <p>put your credentials there</p> */}
           </div>

           <form onSubmit={handleSubmit}>
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
               className='input input-bordered'
               onChange={(e)=> setPassword(e.target.value)}
               value={password || ""}
               />

               {showPassword ? <Eye onClick={handlePassword} className='absolute top-12 right-2 cursor-pointer' /> :
               <EyeOff onClick={handlePassword} className='absolute top-12 right-2 cursor-pointer' />
               }
             </div>

             <div className='form-control my-3'>
                <button className='btn btn-neutral' disabled={isLogging}>
                  {!isLogging ? "Login" : 
                   <LoaderComponent />
                  }
                </button>
             </div>

             <div className='flex flex-col justify-center items-center'>
                <h3>Dont have an account <Link to='/sign' className='underline text-blue-500'>Register</Link></h3>
             </div>

           </form>
         </div>
       </div>
    </div>  
  )
}
