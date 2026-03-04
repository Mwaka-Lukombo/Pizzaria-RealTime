import React from 'react'
import { Content } from './Content';
import { Link } from 'react-router-dom';
import { CookieIcon } from 'lucide-react';

export const BestSkeleton = () => {
    const cards = 6;
     const cards2 =  4;
  return (
    <>
    <Content>
    <div className='my-20'>
        <div className='grid md:grid-cols-3 gap-3'>
             
              {[...Array(cards)].map((_,index)=> {
                const cardNumber = index+=1;

                return(
                    <Link key={cardNumber}  to={'/'} className='col-span-1 bg-base-300 shadow-xl  
                 skeleton h-[250px]
              '>
                <div className='w-full h-[300px] md:h-[170px] p-4'>
                  <div className='w-full h-[300px] md:h-[170px]'></div>
                </div>

                <div className='flex flex-col items-center justify-center'>
                   <h2 className='text-lg font-semibold font-mono w-[250px] bg-black/5 h-3 skeleton'></h2>        
                   <h4 className='text-sm font-bold w-[200px] bg-black/5 h-3 skeleton my-2'></h4>  
                   <div className="rating">
                    
                   {[...Array(cards)].map((_,index )=> (
                      <input type="radio" name="rating-2" className="mask mask-star skeleton bg-gray-300" />
                    
                   ))}
                </div>
                </div>
              </Link>
                )
              })}
      </div>

      
    </div>
    </Content>
    {/*downContent  */}
        {/* <div className='w-full p-7 bg-base-200'>
          <div className='flex flex-col mb-3 items-center justify-center'>
           <h3 className='text-xl font-semibold font-mono w-[180px] h-3 skeleton mb-3'></h3>
           <div className='w-[35px] h-[35px] rounded-full skeleton'></div>
          </div>
          <div className='grid md:grid-cols-4 gap-3'>

              {[...Array(cards2)].map((_,index)=> {
                const cardNumber = index+=1;

                return(
                    <Link key={cardNumber}  to={'/'} className='col-span-1 bg-base-300 shadow-xl  
                 skeleton h-[250px]
              '>
                <div className='w-full h-[170px] p-4'>
                </div>

                <div className='flex flex-col items-center justify-center'>
                   <h2 className='text-lg font-semibold font-mono w-[250px] bg-black/5 h-3 skeleton'></h2>        
                   <h4 className='text-sm font-bold w-[200px] bg-black/5 h-3 skeleton my-2'></h4>  
                   <div className="rating">
                    
                   {[...Array(cards)].map((_,index )=> (
                      <input type="radio" name="rating-2" className="mask mask-star skeleton bg-gray-300" />
                    
                   ))}
                </div>
                </div>
              </Link>
                )
              })}
               
          </div>

        </div> */}
    </>
  )
}
