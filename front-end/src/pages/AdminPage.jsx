import { Bike, Box, Hamburger, Home, ListOrdered, MessageCircleMore, Motorbike, PizzaIcon, Trash, Users } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { adminStore } from '../store/adminStore';
import {authStore} from '../store/authStore';



export const AdminPage = () => {
  const [home,setHome] = useState(true);
   const [products,setProducts] = useState(false);
    const [messages,setMessages] = useState(false);

       const {
        getStats,
        totalUsers,
        totalProducts,
        getAllUsers,
        users,
        deleteUser
      } = adminStore();

      const {socket} = authStore();



       useEffect(()=>{
        getStats();
       },[getStats])

       useEffect(()=>{
         getAllUsers();
       },[getAllUsers]);


       useEffect(()=>{

        socket.on("totalUsers",(total)=>{
          adminStore.setState((state) => ({
            totalUsers:total
          }))

          console.log(total)
        })
        
        return ()=>{
          socket.off("totalUsers");
        }
       },[socket])


       const handleDelete = (id)=>{

        if(!confirm("Delete this user?")) return;
        deleteUser(id);
       }

  return (
    <div className=''>
      <div className='grid grid-cols-10'>
      <div className='col-span-2 w-[250px] h-screen fixed left-0 top-0  bg-base-300 z-20'>
        <div className='py-[50px]'>
          <Link to={'/'} className='flex flex-col py-5 items-center justify-center'>
            <Hamburger className='size-10 text-orange-400 leading-normal'/>
            Order Your're food
          </Link>

          <div className='px-4'>
            <Link onClick={(e)=> {
              e.stopPropagation();
              e.preventDefault();
              setHome(true);
              setProducts(false);
              setMessages(false);
            }} className={`w-full h-[50px] rounded-xl pl-4 ${home ? "bg-gray-300" : ""} hover:bg-gray-300 flex items-center gap-3`} to={'/'}>
             <Home />
             Home
            </Link>

            <Link onClick={(e)=> {
              e.stopPropagation();
              e.preventDefault();
              setHome(false);
              setMessages(false);
              setProducts(true);
            }} className={`w-full h-[50px] rounded-xl pl-4 ${products ? "bg-gray-300" : ""} hover:bg-gray-300 flex items-center gap-3 my-2`} to={'/'}>
             <PizzaIcon />
             Products
            </Link>

            <Link onClick={(e)=> {
              e.stopPropagation();
              e.preventDefault();
              setProducts(false);
              setHome(false);
              setMessages(true);
            }} className={`w-full h-[50px] rounded-xl pl-4 ${messages ? "bg-gray-300" : ""} hover:bg-gray-300  flex items-center gap-3 my-2`} to={'/'}>
             <MessageCircleMore />
             Messages
            </Link>
            </div>
          </div>
      </div>

      <div className='col-span-8 h-screen px-6 relative left-[250px]'>
        <div className='w-[100%] '>
            <div className='grid grid-cols-3 gap-3 my-5 items-center justify-center'>
              
              {home && (
              <>
              <div className='col-span-1 h-[200px] flex items-center border border-gray-300 justify-center bg-base-200  rounded-xl shadow-xl cursor-pointer transition hover:-translate-y-2'>
                  <div className='flex flex-col'>
                     <div className='flex items-center justify-center'>
                      <Users className='size-12' />
                     </div>

                     <div className='flex flex-col items-center justify-center'>
                       <h3 className='text-3xl font-bold leading-normal'>{totalUsers}</h3>
                       <p className='text-xl font-semibold'>Users</p>
                     </div>
                  </div>
              </div>

              <div className='col-span-1 h-[200px] flex items-center border border-gray-300 justify-center bg-base-200  rounded-xl shadow-xl cursor-pointer transition hover:-translate-y-2'>
                  <div className='flex flex-col'>
                     <div className='flex items-center justify-center'>
                      <Box className='size-12' />
                     </div>

                     <div className='flex flex-col items-center justify-center'>
                       <h3 className='text-3xl font-bold leading-normal'>{totalProducts}</h3>
                       <p className='text-xl font-semibold'>Products</p>
                     </div>
                  </div>
              </div>

              <div className='col-span-1 h-[200px] flex items-center border border-gray-300 justify-center bg-base-200  rounded-xl shadow-xl cursor-pointer transition hover:-translate-y-2'>
                  <div className='flex flex-col'>
                     <div className='flex items-center justify-center'>
                      <Motorbike className='size-12' />
                     </div>

                     <div className='flex flex-col items-center justify-center'>
                       <h3 className='text-3xl font-bold leading-normal'>100</h3>
                       <p className='text-xl font-semibold'>Orders</p>
                     </div>
                  </div>
              </div>
              </>
              )}

              

              
            </div>
        </div>

        {home && (

    
        <>
        {/* table section */}
        <div className='my-7'>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Job</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                
              {Array.isArray(users) && users.map((user,index) => (
                <tr>
                  <th>{index+=1}</th>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.email === "eunice@gmail.com" ? "Kitchen" :"Normal User"}
                  </td>
                  <td>
                    <button onClick={()=> handleDelete(user._id)} className='btn btn-md flex items-center justify-center bg-error hover:bg-red-500 hover:text-white'>
                      <Trash />
                    </button>
                  </td>
                </tr>
              ))}


              </tbody>
            </table>
          </div>
        </div>
        </>
        )}

        {products && (
          <>
           <div className='w-full  mx-auto '>
             <div className='max-w-[700px] px-5 w-[95%] rounded-xl  mx-auto bg-base-300 '>
               <div className='p-3'></div>
               <form>
                 <div className='flex gap-2'>
                   <div className='form-control w-[calc(100%/2)]'>
                   <div className='label'>
                    <div className="label-text">Name:</div>
                   </div>

                   <input type="text" 
                   className='input input-bordered flex-1'
                   placeholder='Pizza, Hamburguer'
                   /> 
                 </div>

                 <div className='form-control w-[calc(100%/2)]'>
                  <div className='label'>
                     <div className='label-text'>Category:</div> 
                  </div>
                  <select className='select select-bordered flex-1'>
                    <option value="">Select the category</option>
                    <option value="carne">Carne</option>
                    <option value="pizza">Pizza</option>
                    <option value="hamburguer">Hamburguer</option>
                    <option value="carne">Massa</option>
                  </select>
                 </div>
                 </div>

                 <div className='form-control'>
                  <div className='label'>
                     <div className='label-text'>Price:</div>
                  </div>
                  
                  <input type="number" 
                  className='input input-bordered pr-5'
                  placeholder='R$1300'
                  min={1}
                  />
                 </div>

                 <div className='form-control'>
                   <div className='label'>
                    <div className='label-text'>Image:</div>
                   </div>
                    <input type="text"
                    className='input input-bordered' 
                    placeholder='http://pizza.jpg'
                    />
                 </div>

                 <div className='form-control'>
                   <div className='label'>
                    <div className='label-text'>Ingredients:</div>
                   </div>

                   <input type="text" 
                   className='input input-bordered'
                   placeholder='Peperone,queijo,chiken'
                   />
                 </div>

                 <div className='my-3 mb-3'>
                   <button className="btn btn-neutral w-full mb-5">Create</button>
                 </div>
               </form>
             </div>

            <div className='my-5 px-3'>
                <div className="overflow-x-auto">
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* row 1 */}
                      <tr>
                        <th>1</th>
                        <td>Pizza Mexicana</td>
                        <td>Pizza</td>
                        <td>R$1300</td>
                        <td>
                          <button className="btn btn-md bg-error flex items-center justify-center">
                            <Trash />
                          </button>
                        </td>
                      </tr>
                     
                    </tbody>
                  </table>
                </div>
            </div>
           </div>
          </>
        )}

      </div>
      </div>
    </div>
  )
}
