import { Loader } from 'lucide-react'
import React from 'react'

export const LoaderComponent = () => {
  return (
    <div className='flex items-center gap-3 justify-center'>
        Login
     <Loader className='size-5 animate-spin' />
    </div>
  )
}
