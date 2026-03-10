import {
  Hamburger,
  Home,
  PizzaIcon,
  MessageCircleMore,
  TriangleAlertIcon,
  CircleDollarSign,
  Calendar,
  User,
  Package,
  ArrowLeft
} from "lucide-react";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { orderStore } from "../store/oderStore";
import {authStore} from '../store/authStore';
import { KitchenOrdersSkeleton } from "../components/skeletons/KitchenOrdersSkeleton";



export const KitchenPage = () => {

  const [page, setPage] = useState("home");

     const {getMenu,Menus,getOrders,Orders,isOrder} = orderStore();
       const {socket} = authStore();

     useEffect(()=>{
      getMenu();
     },[getMenu]);


     useEffect(()=>{
      getOrders(1);
     },[getOrders]);


     useEffect(()=>{

      socket.on("newOrder",(newOrder)=>{
        orderStore.setState((state)=> ({
           Orders:[...state.Orders,newOrder]
        }))
      })
      
      return ()=>{
        socket.off("newOrder")
      }
     },[socket])


     if(isOrder){
      return <KitchenOrdersSkeleton />
     }

     

     
    

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

              <button
                onClick={() => setPage("home")}
                className={`w-full h-[50px] rounded-xl pl-4 flex items-center gap-3 hover:bg-gray-300 ${page === "home" ? "bg-gray-300" : ""}`}
              >
                <Home />
                Dashboard
              </button>

              <button
                onClick={() => setPage("products")}
                className={`w-full h-[50px] rounded-xl pl-4 flex items-center gap-3 hover:bg-gray-300 my-2 ${page === "products" ? "bg-gray-300" : ""}`}
              >
                <PizzaIcon />
                Menu
              </button>

              <button
                onClick={() => setPage("messages")}
                className={`w-full h-[50px] rounded-xl pl-4 flex items-center gap-3 hover:bg-gray-300 my-2 ${page === "messages" ? "bg-gray-300" : ""}`}
              >
                <MessageCircleMore />
                Orders
              </button>

            </div>
          </div>

        </div>

        {/* Main */}
        <div className="col-span-8 min-h-screen px-6 relative left-[250px]">

          {/* Dashboard */}
          {page === "home" && (
            <div className="grid grid-cols-3 gap-4 my-6">

              <div className="h-[180px] bg-base-200 rounded-xl shadow flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-3xl font-bold">0</h2>
                  <p>Total Orders</p>
                </div>
              </div>

              <div className="h-[180px] bg-base-200 rounded-xl shadow flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-3xl font-bold">0</h2>
                  <p>Preparing</p>
                </div>
              </div>

              <div className="h-[180px] bg-base-200 rounded-xl shadow flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-3xl font-bold">0</h2>
                  <p>Delivered</p>
                </div>
              </div>

            </div>
          )}

          {/* Menu */}
          {page === "products" && (
            <div className="my-6">

              <h2 className="text-2xl font-bold mb-4">
                Kitchen Menu
              </h2>

              <div className="grid grid-cols-3 gap-4">

                {Array.isArray(Menus.products) && Menus.products.map((product) => (
                  <div className="bg-base-200 p-4 rounded-xl shadow">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="rounded-lg mb-2 w-full h-[150px]"
                  />
                  <h3 className="font-bold">{product.name}</h3>
                  <p className="text-sm">{product.ingredients.join(" , ")}</p>
                  <p className="font-bold mt-2">{product.price} MZN</p>
                </div>
                ))}

                

              </div>

            </div>
          )}

          {/* Orders */}
          {page === "messages" && (
            <div className="my-6">

              <h2 className="text-2xl font-bold mb-4">
                Kitchen Orders
              </h2>

              <div className="overflow-x-auto">

                {/* order there */}
                <div className="p-6 max-w-4xl mx-auto">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200"
        >
          <ArrowLeft size={16} />
          Back
        </Link>

        <h1 className="text-2xl font-bold">Order Details</h1>
      </div>

      {/* Order Info */}
      
      {Array.isArray(Orders.orders) && Orders.orders.map((order) => (
        <>
        <div className="bg-white shadow rounded-xl p-6 mb-6 grid md:grid-cols-2 gap-6">

        <div className="flex items-center gap-3">
          <Package className="text-orange-500" />
          <div>
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="font-semibold">{order._id}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <User className="text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Customer</p>
            <p className="font-semibold">{order.userName}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Calendar className="text-green-500" />
          <div>
            <p className="text-sm text-gray-500">Date</p>
            <p className="font-semibold">{order.createdAt.split("T")[0]}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <CircleDollarSign className="text-purple-500" />
          <div>
            <p className="text-sm text-gray-500">Total</p>
            <p className="font-semibold">${order.totalAmount} <b>MT</b></p>
          </div>
        </div>
      </div>
      {/* info */}

      {/* Order Items */}
      <div className="bg-white shadow rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Products</h2>

        <div className="space-y-4">
          {order.items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between border-b pb-3"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>

              <p className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)} <b>MT</b>
              </p>
            </div>
          ))}
          
        </div>
      </div>

      {/* Status */}
      <div className="bg-white shadow rounded-xl p-6 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">Status</p>
          <p className="font-semibold text-orange-600">{order.status}</p>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            Accept
          </button>

          <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
            Preparing
          </button>

          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Deliver
          </button>
        </div>
      </div>
      </>
      ))}

      {/* Final order */}
      <div className="flex items-center justify-center my-3">
        <div className="join">
          {[...Array(Orders.totalPages)].map((_,index)=> {
            const numberPage = index+1;

            return(
               <input
                className="join-item btn btn-square"
                type="radio"
                name="options"
                aria-label={numberPage}
                checked={numberPage === Orders.currentPage || numberPage == 1}
                onClick={()=> getOrders(numberPage)}
                />
            )
          })}
        </div>
      </div>
    </div>

              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};