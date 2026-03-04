import React,{useEffect, useState} from 'react';
import { Content } from '../components/Content';
import { Link } from 'react-router-dom'
import { CookieIcon, HamburgerIcon, Pizza } from 'lucide-react';

import {motion} from 'motion/react';
import { productStore } from '../store/productStore';
import { authStore } from '../store/authStore';
import { BestSkeleton } from '../components/BestSkeleton';


export const HomePage = () => {
  const {
    getAllproducts,
    products,
    bests,
    bestRatings,
    updateRating,
    isLoadingBest,
    isLoadingAllproducts
  } = productStore();
    const [ratings,setRatings] = useState({});
     const [hoverd,setHoverd] = useState({});
       const {socket} = authStore();
   let stars = 5;
   

  useEffect(()=>{
    let category
    getAllproducts({category});
  },[getAllproducts])

  useEffect(()=>{
    bestRatings();
  },[bestRatings])

  useEffect(()=>{
    
    
    socket.on("newRatings",(newRatings)=>{
       productStore.setState({
        bests:newRatings
       })
    })

    return () => {
      socket.off("newRatings");
    }

  },[socket])

  

  
  const handleUpdate = (id,value)=>{
    if(!value) return;
    updateRating(id,value);
  }



  if(isLoadingBest || isLoadingAllproducts){
    return <BestSkeleton />
  }

  return (
    <div className='relative top-[80px]'>
         <Content>
          <motion.div
          initial={{opacity:0}}
          animate={{opacity:1}}
          >
            <div className='flex flex-col items-center justify-center p-5'>
             <h3 className='text-xl font-semibold font-mono mb-3'>Most Populares</h3>
             {/* {products.totalFound && <h3 className='font-normal label-text text-sm mb-3'>Were found <b>{products.totalFound}</b> 
              {products.totalFound <= 1 ? " Result" : " Results"}</h3>
              } */}
             <Pizza className='size-7 text-orange-400' />
         </div>
        
            <div className='grid md:grid-cols-3 gap-3'>
              {bests.length === 0 && (
                <div className='col-span-3'>
                   <div className=' flex gap-3 border bg-base-300 border-[#cccc] h-[150px]'>
                     <div className='w-[20%] flex items-center justify-center h-full border-r border-[#ccc]'>
                        <HamburgerIcon className='size-20 text-orange-400' />
                     </div>
                     <div className='w-[80%] p-3'>
                        <h2 className='text-lg font-semibold font-mono leading-normal'>You're food not found</h2>
                        <p className='text-sm  label-text'>please searhing again</p>
                     </div>
                  </div>
                </div>
              )}
              {Array.isArray(bests) && bests.map((best) => (
                <Link key={best._id} to={`/product/${best._id}`} className='col-span-1 bg-base-300 shadow-xl rounded-xl border border-[#ccc] 
              transition delay-150 duration-300 ease-in-out hover:-translate-y-1 md:hover:scale-110 
              '>
                <div className='w-full h-[300px] md:h-[170px]  rounded-tl-xl rounded-tr-xl '>
                 <img src={best.image} 
                 className='w-full h-full rounded-tl-xl rounded-tr-xl'                 
                 />
                </div>

                <div className='p-2 flex flex-col items-center justify-center'>
                   <h2 className='text-lg font-semibold font-mono'>{best.name}</h2>        
                   <h4 className='text-sm font-bold'>R$ {best.price}</h4>  
                   <div className="rating">
                    
                   
                   {[...Array(Number(best.rating))].map((_,index)=> {

                    return(
                      <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                    )
                   })}
                  
                </div>
                </div>
              </Link>

              ))}

            </div>
          </motion.div>
        </Content>

       {/*downContent  */}
        <div className='w-full p-7 bg-base-200'>
          <div className='flex flex-col mb-3 items-center justify-center'>
           <h3 className='text-xl font-semibold font-mono'>All products</h3>
           <CookieIcon className='text-orange-400' />
          </div>
          <div className='grid md:grid-cols-4 gap-3'>

              {products.products?.map((product) => (
                 <Link key={product._id} to={`/product/${product._id}`} className='col-span-1 bg-base-300 shadow-xl rounded-xl border border-[#ccc] 
              transition delay-150 duration-300 ease-in-out hover:-translate-y-1 md:hover:scale-110 
              '>
                <div className='w-full h-[300px] md:h-[170px] rounded-tl-xl rounded-tr-xl '>
                 <img src={product.image} 
                 className='w-full h-full rounded-tl-xl rounded-tr-xl'                 
                 />
                </div>

                <div className='p-2 flex flex-col items-center justify-center'>
                   <h2 className='text-lg font-semibold font-mono'>{product.name}</h2>        
                   <h4 className='text-sm font-bold'>R$ {product.price}</h4> 

                   <div className='rating'>
                      {[...Array(stars)].map((_,index)=> {
                        let star = index+1;

                        return(
                          <input type="radio" 
                          name={`rating-${product._id}`} 
                          className={`mask mask-star-2 
                            ${(hoverd[product._id] || ratings[product._id]
                              || product.rating
                            ) >= star 
                              ? "bg-orange-400" : "bg-gray-300"
                             }
                            `} 
                            onClick={(e)=> {
                              e.stopPropagation();
                              e.preventDefault();
                              
                                setRatings(prev => ({
                                ...prev,
                                [product._id]: star
                              }
                            ))
                             handleUpdate(product._id,star)
                            }}
                            onMouseEnter={()=> {
                              setHoverd(prev => ({
                              ...prev,
                              [product._id]: star
                            }))
                            }}
                            onMouseOut={()=> {
                              setHoverd(prev => ({
                              ...prev,
                              [product._id]: 0
                            }))
                            }}
                          />
                        )
                      })}
                   </div>
                </div>
                </Link>
              ))}    
               
          </div>
          
          <div className="join w-full my-4 flex items-center justify-center">
               {[...Array(products.totalPages)].map((_, index) => {
                  const pageNumber = index + 1;

                  return (
                    <div className="join">
                      <input
                        key={pageNumber}
                        className="join-item btn btn-square"
                        type="radio"
                        name="options"
                        aria-label={pageNumber}
                        checked={products.currentPage === pageNumber || pageNumber == 1}
                        onClick={()=> getAllproducts(_,pageNumber)}
                        readOnly
                        />
                        </div>
                  );
                })}

            </div> 
        </div>
      <footer className='p-3 flex items-center justify-center bg-base-300'>
        <p>&copy; Todos os direitos reservados - 2026</p>
      </footer>
    </div>

  )
}
