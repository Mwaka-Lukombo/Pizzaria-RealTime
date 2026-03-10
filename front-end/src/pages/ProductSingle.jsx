import { ArrowLeft, Motorbike, ShoppingBag, ShoppingCart } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { productStore } from '../store/productStore'
import { orderStore } from '../store/oderStore'
import toast from 'react-hot-toast'

export const ProductSingle = () => {

  const {getSingleProduct,product} = productStore();
   const [orderProduct,setOrderProduct] = useState({});
     const {id} = useParams();
      const [
        quantity,
        setQuantity
      ] = useState(0);
       const {
        createOrder,
        isLoading,
        createCart,
        isCart
      } = orderStore()


  useEffect(()=>{
    getSingleProduct(id);
    setOrderProduct(product);
  },[getSingleProduct,id]);

  const handleSubmit = (e)=>{
    e.preventDefault();
    
    const {_id:productId,name,price,image} = product

     const items = [
      {
       productId,
       name,
       price,
       image,
       quantity
      }
     ]

     if(!quantity) {
       return toast.error("Put the quantity!");
     }

    createCart(items)
    setQuantity("");
  }



  
  return (
    <div className='p-10 relative top-[80px]'>
        <div className='w-full'>
          <div className='grid md:grid-cols-5'>
            <div className='md:col-span-3  bg-red-base-200 py-7 min-h-[300px] '>
              
                <div className=' w-[70%] h-[250px] mx-auto rounded-xl'>
                  <div className='absolute left-5'>
                    <Link to={'/'} className='btn btn-md '>
                      <ArrowLeft />
                    </Link>
                  </div>
                  <img src={product.image}
                    alt='product_image'
                    className='w-full h-full rounded'
                  />
                  
                  <div className='flex items-center justify-center p-3'>
                    <div className='rating'>

                    
                   {product.rating && [...Array(Number(product.rating))].map((_,index)=> (
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                   ))}
                  </div>
                </div>
                  </div>
                <div className='p-5'>
                    <h2 className='text-lg font-mono font-bold leading-normal'>{product.name}</h2>
                    <h3 className='text-sm font-semibold leading-normal'>{product?.ingredients?.join(" , ")}</h3>
                    <p  className='text-sm font-bold leading-normal'>R$ {product.price}</p>
                </div>
            </div>

            {/* Right side */}
            <div className='md:col-span-2 border border-[#ccc] h-[200px] p-2'>

             <div className='flex flex-col items-center justify-center p-2'>
                <h2 className='text-xl font-mono font-semibold'>And in your cart ou order</h2>
                <p>Get one order and see in real time </p>
                <p>See your orders <Link to={'/orders'} className='underline text-blue-500'>click</Link></p>
                <form onSubmit={handleSubmit} className='my-1'>
                  <div className='form-control'>
                    <input type="number" 
                    className='input input-bordered w-[100px] h-[30px]'
                    min={1}
                    placeholder='Quantity'
                    onChange={(e) => setQuantity(e.target.value)}
                    value={quantity || ""}
                     />
                  </div>

                  <div className='my-2'>
                  <button className=" btn btn-neutral w-full" disabled={isLoading}>
                      {!isLoading ? 
                      <div>
                       
                      <ShoppingCart />
                      </div> : 
                      <div>
                        Seding...
                        <Motorbike className='size-6 animate-pulse' />
                      </div>
                      }
                  </button>
                
             </div>
                </form>
             </div>
            
             

            </div>
          </div>
        </div>
    </div>
  )
}
