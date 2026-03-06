import { 
  Bike, 
  Box, 
  Hamburger, 
  Home, 
  ListOrdered, 
  MessageCircleMore, 
  Motorbike, 
  PizzaIcon, 
  Trash, 
  Users 
} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { adminStore } from '../store/adminStore';
import {authStore} from '../store/authStore';


import {LoaderComponent} from '../components/LoaderComponent'
import {AdminSkeleton} from '../components/skeletons/AdminSkeleton';


export const AdminPage = () => {
  const [home,setHome] = useState(true);
   const [products,setProducts] = useState(false);
    const [messages,setMessages] = useState(false);
     const [nameProduct,setName] = useState("");
      const [category,setCategory] = useState("");
       const [price,setPrice] = useState("");
        const [image,setImage] = useState("");
         const [ingredients,setIngredients] = useState([]);

       const {
        isCreate,
        isGetingUsers,
        getStats,
        totalUsers,
        totalProducts,
        getAllUsers,
        users,
        deleteUser,
        productsAll,
        getAllProducts,
        createProduct,
        deleteProduct
      } = adminStore();

    

      const {socket} = authStore();



       useEffect(()=>{
        getStats();
       },[getStats])

       useEffect(()=>{
         getAllUsers(1);
       },[getAllUsers]);

       useEffect(()=>{
        getAllProducts();
       },[getAllProducts]);


       useEffect(()=>{

        socket.on("totalUsers",(total)=>{
          adminStore.setState((state) => ({
            totalUsers:total
          }))
        })

        socket.on("totalProducts",(totalProd)=>{
          adminStore.setState({
            totalProducts:totalProd
          })
        })
        
        return ()=>{
          socket.off("totalUsers");
        }
       },[socket])

              
       if(isGetingUsers){
        return <AdminSkeleton />
       }

       const handleDelete = (id)=>{

        if(!confirm("Delete this user?")) return;
        deleteUser(id);
       }

       const handleDeleteProduct = (id)=>{
          if(!confirm("Delete this product?")) return;
          deleteProduct(id);
       }

        const FormClean = ()=>{
          setName("");
          setPrice("");
          setImage("");
          setIngredients("");
        }
       const handleSubmit = (e)=>{
        e.preventDefault();

        const newProduct = {
          name:nameProduct,
          price,
          category,
          rating:"",
          image,
          ingredients
        }

        createProduct(newProduct);
        FormClean();
        

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

      <div className='col-span-8 min-h-screen px-6 relative left-[250px]'>
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
                
              {Array.isArray(users.users) && users.users.map((user,index) => (
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
            <div className='flex items-center justify-center my-3 mx-auto'>
                <div className="join">
                {[...Array(users.totalPages)].map((_,index)=> {
                  const numberPage = index+=1;
                  
                  return(
                    <input
                    className="join-item btn btn-square"
                    type="radio"
                    name="options"
                    aria-label={numberPage}
                    checked={numberPage === users.currentPage || numberPage == 1}
                    onClick={() => getAllUsers(numberPage)} 
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        </>
        )}

        {products && (
          <>
           <div className='w-full  mx-auto '>
             <div className='max-w-[700px] px-5 w-[95%] rounded-xl  mx-auto bg-base-300 '>
               <div className='p-3'></div>
               <form onSubmit={handleSubmit}>
                 <div className='flex gap-2'>
                   <div className='form-control w-[calc(100%/2)]'>
                   <div className='label'>
                    <div className="label-text">Name:</div>
                   </div>

                   <input type="text" 
                   className='input input-bordered flex-1'
                   placeholder='Pizza, Hamburguer'
                   onChange={(e) => setName(e.target.value)}
                   value={nameProduct}
                   /> 
                 </div>

                 <div className='form-control w-[calc(100%/2)]'>
                  <div className='label'>
                     <div className='label-text'>Category:</div> 
                  </div>
                  <select className='select select-bordered flex-1' onChange={(e)=> setCategory(e.target.value)} value={category}>
                    <option value="">Select the category</option>
                    <option value="carne">Carne</option>
                    <option value="pizza">Pizza</option>
                    <option value="hamburguer">Hamburguer</option>
                    <option value="carne">Massa</option>
                    <option value="pao">Pao</option>  
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
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  />
                 </div>

                 <div className='form-control'>
                   <div className='label'>
                    <div className='label-text'>Image:</div>
                   </div>
                    <input type="text"
                    className='input input-bordered' 
                    placeholder='http://pizza.jpg'
                    onChange={(e) => setImage(e.target.value)}
                    value={image}
                    />
                 </div>

                 <div className='form-control'>
                   <div className='label'>
                    <div className='label-text'>Ingredients:</div>
                   </div>

                   <input type="text" 
                   className='input input-bordered'
                   placeholder='Peperone,queijo,chiken'
                   onChange={(e) => setIngredients(e.target.value)}
                   value={ingredients}
                   />
                 </div>

                 <div className='my-3 mb-3'>
                   <button className="btn btn-neutral w-full mb-5" disabled={isCreate}>
                    {!isCreate ? "Create" : <LoaderComponent />}
                   </button>
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
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/*table */}

                      {Array.isArray(productsAll.products) && productsAll.products.map((product,index) => (
                        <>
                        <tr>
                        <th>{index+=1}</th>
                        <th>
                          <div className='w-[50px] h-[50px] border border-[#ccc] rounded-full'>
                            <img src={product.image}
                            alt={product.name}
                            className='w-full h-full bg-contain rounded-full bg-no-repeat'
                            onClick={<Navigate to={`${product.image}`} />}
                            />
                          </div>
                        </th>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>R$ {product.price}</td>
                        <td>
                          <button onClick={() => handleDeleteProduct(product._id)} className="btn btn-md bg-error flex items-center justify-center">
                            <Trash />
                          </button>
                        </td>
                      </tr>
                      </>
                      ))}
                      
                      
                     
                    </tbody>
                  </table>
                  
                  <div className='max-w-lg flex items-center justify-center mx-auto my-2'>
                      <div className="join">
                        {[...Array(productsAll.totalPages)].map((_,index)=> {
                          const numberPage = Number(index+=1);

                          return(
                            <input 
                            className="join-item btn btn-square" 
                            type="radio" 
                            name="options" 
                            aria-label={numberPage}
                            checked={numberPage == productsAll.currentPage || numberPage == 1}
                            onClick={()=> getAllProducts(numberPage)}
                            />
                        
                          )
                        })}
                      </div>
                  </div>
                
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
