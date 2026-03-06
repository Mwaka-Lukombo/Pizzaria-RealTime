import React from 'react'

export const ProductsKeleton = () => {
  return (
    <div>
        
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
  )
}
