import React from 'react'

export const PaymentSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-4xl grid md:grid-cols-2 overflow-hidden animate-pulse">
        
        {/* Left side skeleton (Form) */}
        <div className="p-8 space-y-6">
          
          {/* Title */}
          <div className="h-6 w-40 bg-gray-300 rounded"></div>

          {/* Amount input */}
          <div>
            <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
            <div className="h-12 w-full bg-gray-300 rounded-lg"></div>
          </div>

          {/* Payment method */}
          <div>
            <div className="h-4 w-40 bg-gray-300 rounded mb-2"></div>
            <div className="h-12 w-full bg-gray-300 rounded-lg"></div>
          </div>

          {/* Reference */}
          <div>
            <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
            <div className="h-12 w-full bg-gray-300 rounded-lg"></div>
          </div>

          {/* Button */}
          <div className="h-12 w-full bg-gray-300 rounded-lg"></div>

        </div>

        {/* Right side skeleton (Summary) */}
        <div className="bg-gray-50 p-8 flex flex-col justify-between">
          
          <div className="space-y-6">
            
            {/* Title */}
            <div className="h-6 w-40 bg-gray-300 rounded"></div>

            {/* Rows */}
            <div className="space-y-4">
              
              <div className="flex justify-between">
                <div className="h-4 w-20 bg-gray-300 rounded"></div>
                <div className="h-4 w-16 bg-gray-300 rounded"></div>
              </div>

              <div className="flex justify-between">
                <div className="h-4 w-24 bg-gray-300 rounded"></div>
                <div className="h-4 w-16 bg-gray-300 rounded"></div>
              </div>

              <hr />

              <div className="flex justify-between">
                <div className="h-5 w-20 bg-gray-300 rounded"></div>
                <div className="h-5 w-24 bg-gray-300 rounded"></div>
              </div>

            </div>

          </div>

          {/* Footer text */}
          <div className="h-3 w-48 bg-gray-300 rounded mt-6"></div>

        </div>

      </div>
    </div>

  )
}
