import { Bike, Box, Hamburger, Home, ListOrdered, MessageCircleMore, Motorbike, PizzaIcon, Trash, Users } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

export const AdminPage = () => {
  return (
    <div className=''>
      <div className='grid grid-cols-10'>
      <div className='col-span-2 h-screen  bg-base-300 z-20'>
          <Link to={'/'} className='flex flex-col py-5 items-center justify-center'>
            <Hamburger className='size-10 text-orange-400 leading-normal'/>
            Order Your're food
          </Link>

          <div className='px-4'>
            <Link className='w-full h-[50px] rounded-xl pl-4 hover:bg-gray-100 flex items-center gap-3' to={'/'}>
             <Home />
             Home
            </Link>

            <Link className='w-full h-[50px] rounded-xl pl-4 hover:bg-gray-100 flex items-center gap-3 my-2' to={'/'}>
             <PizzaIcon />
             Products
            </Link>

            <Link className='w-full h-[50px] rounded-xl pl-4 hover:bg-gray-100  flex items-center gap-3 my-2' to={'/'}>
             <MessageCircleMore />
             Messages
            </Link>
          </div>
      </div>

      <div className='col-span-8 h-screen p-5'>
        <div className='w-[100%] '>
            <div className='grid grid-cols-3 gap-3 my-5'>

              <div className='col-span-1 h-[200px] flex items-center border border-gray-300 justify-center bg-base-200  rounded-xl shadow-xl cursor-pointer transition hover:-translate-y-2'>
                  <div className='flex flex-col'>
                     <div className='flex items-center justify-center'>
                      <Users className='size-12' />
                     </div>

                     <div className='flex flex-col items-center justify-center'>
                       <h3 className='text-3xl font-bold leading-normal'>3</h3>
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
                       <h3 className='text-3xl font-bold leading-normal'>12</h3>
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

              

              
            </div>
        </div>

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
                {/* row 1 */}
                <tr>
                  <th>1</th>
                  <td>Alphonse Mwaka Lukombo</td>
                  <td>alphonse@gmail.com</td>
                  <td>Admin</td>
                  <td>
                    <button className='btn btn-md flex items-center justify-center bg-error hover:bg-red-500 hover:text-white'>
                      <Trash />
                    </button>
                  </td>
                </tr>

                 <tr>
                  <th>1</th>
                  <td>Eunice dos Anjos Vilanculos</td>
                  <td>eunice@gmail.com</td>
                  <td>Kitchen</td>
                  <td>
                    <button className='btn btn-md flex items-center justify-center bg-error hover:bg-red-500 hover:text-white'>
                      <Trash />
                    </button>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
