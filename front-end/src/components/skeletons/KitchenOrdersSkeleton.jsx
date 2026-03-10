import React from "react";
import { Hamburger, Home, PizzaIcon, MessageCircleMore } from "lucide-react";
import { Link } from "react-router-dom";

export const KitchenOrdersSkeleton = () => {
  return (
    <div>
      <div className="grid grid-cols-10">

        {/* Sidebar */}
        <div className="col-span-2 w-[250px] h-screen fixed left-0 top-0 bg-base-300 z-20">

          <div className="py-[50px]">
            <Link to="/" className="flex flex-col py-5 items-center justify-center">
              <Hamburger className="size-10 text-orange-400" />
              Order Your Food
            </Link>

            <div className="px-4">

              <div className="w-full h-[50px] rounded-xl pl-4 flex items-center gap-3 bg-gray-200 mb-2 animate-pulse">
                <Home />
                Dashboard
              </div>

              <div className="w-full h-[50px] rounded-xl pl-4 flex items-center gap-3 bg-gray-200 mb-2 animate-pulse">
                <PizzaIcon />
                Menu
              </div>

              <div className="w-full h-[50px] rounded-xl pl-4 flex items-center gap-3 bg-gray-200 animate-pulse">
                <MessageCircleMore />
                Orders
              </div>

            </div>
          </div>

        </div>

        {/* Main Content */}
        <div className="col-span-8 min-h-screen px-6 relative left-[250px]">

          <div className="p-6 max-w-4xl mx-auto">

            {[...Array(3)].map((_, i) => (
              <div key={i} className="mb-10 animate-pulse">

                {/* Order Info */}
                <div className="bg-white shadow rounded-xl p-6 mb-6 grid md:grid-cols-2 gap-6">

                  {[...Array(4)].map((_, j) => (
                    <div key={j}>
                      <div className="h-3 bg-gray-300 rounded w-24 mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-40"></div>
                    </div>
                  ))}

                </div>

                {/* Items */}
                <div className="bg-white shadow rounded-xl p-6 mb-6">

                  <div className="h-5 bg-gray-300 rounded w-32 mb-4"></div>

                  {[...Array(3)].map((_, k) => (
                    <div key={k} className="flex justify-between border-b pb-3 mb-3">

                      <div>
                        <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                        <div className="h-3 bg-gray-300 rounded w-20"></div>
                      </div>

                      <div className="h-4 bg-gray-300 rounded w-16"></div>

                    </div>
                  ))}

                </div>

                {/* Status */}
                <div className="bg-white shadow rounded-xl p-6 flex justify-between items-center">

                  <div>
                    <div className="h-3 bg-gray-300 rounded w-20 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                  </div>

                  <div className="flex gap-3">
                    <div className="h-10 w-24 bg-gray-300 rounded-lg"></div>
                    <div className="h-10 w-24 bg-gray-300 rounded-lg"></div>
                    <div className="h-10 w-24 bg-gray-300 rounded-lg"></div>
                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>
      </div>
    </div>
  );
};