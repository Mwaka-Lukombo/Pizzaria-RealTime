import React, { useState } from 'react'
import { authStore } from '../store/authStore'

export const ProfilePage = () => {
    const {userAuth} = authStore();
     const [password,setPassword] = useState("");

  return (
    <div className='my-[150px]'>
        <div className='w-[95%] max-w-xl mx-auto rounded-xl min-h-[300px] bg-base-300 p-3'>
           <div className={`w-[80px] flex items-center justify-center h-[80px] border-2 bg-blue-950 rounded-full mx-auto `}>
                <h3 className='text-2xl text-white font-bold'>{userAuth.fullName[0]}</h3>
           </div>
           
           <form>
             <div className='form-control'>
                <div className='label'>
                    <div className='label-text'>FullName:</div>
                </div>
                <input type='text'
                value={userAuth.fullName} 
                className='input input-bordered'
                readOnly
                />
             </div>

                          <div className='form-control'>
                <div className='label'>
                    <div className='label-text'>Email:</div>
                </div>
                <input type='text'
                value={userAuth.email} 
                className='input input-bordered'
                readOnly
                />
             </div>

                          <div className='form-control'>
                <div className='label'>
                    <div className='label-text'>Password:</div>
                </div>
                <input type='password'
                value={password || ""} 
                className='input input-bordered'
                placeholder='******'
                onChange={(e) => setPassword(e.target.value)}
                />
             </div>

             <div className='my-4'>
               <button className="w-full btn btn-neutral">Update</button>
             </div>
           </form>
        </div>
    </div>
  )
}
