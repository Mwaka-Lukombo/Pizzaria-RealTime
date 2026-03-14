import React, { useEffect, useState } from "react";
import { ArrowLeft, Package, User, Calendar, CircleDollarSign, DollarSign, Motorbike, X, CircleDollarSignIcon,LoaderIcon, LocateIcon, LocateFixedIcon } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { orderStore } from "../store/oderStore";

export const OrdersPage = () => {
  const { id } = useParams();
    const [showPaymentCard, setShowPaymentCard] = useState(false);
     const [orderToPaid,setOrderToPaid] = useState({});
     
        const [amount, setAmount] = useState("");
        const [method, setMethod] = useState("mpesa");
         const [numberMobile,setNumberMible] = useState("");
          const [numberCard,setNumberCard] = useState("");
           const [numberCCv, setCCV] = useState("");
            const [idProduct,setIdProduct] = useState("");
     

       const {
        getOrderSingle,
        Order,
        isPayment,
        paidOrder
       } = orderStore();

  const fee = amount ? (amount * 0.02).toFixed(2) : 0;
  const total = amount ? (parseFloat(amount) + parseFloat(fee)).toFixed(2) : 0;


  useEffect(()=>{
    getOrderSingle();
  },[getOrderSingle])



  const resetForm = ()=>{
    setAmount("");
    setMethod("mpesa");
    setNumberMible("");
  }
  
  const handlePayment = (e)=>{
    e.preventDefault();

    const data = {
      amount,
      method,
      numberMobile,
      numberCard:""
    }
    paidOrder(data,idProduct);
    resetForm();
    setShowPaymentCard(false);
  }

  return (
    <>

  {showPaymentCard && (
    <div className="w-full h-screen bg-black/85 fixed top-0 left-0 z-50">
       <div className="p-3">
         <div className="flex items-center justify-end">
           <button onClick={()=> setShowPaymentCard((prev) => !prev)} className="btn btn-md flex items-center justify-center">
             <X />
           </button>
         </div>
       </div>
       
       <div className=" flex items-center justify-center">
         <div className="bg-white shadow-xl rounded-2xl  w-[95%] max-w-4xl grid md:grid-cols-2 overflow-hidden">
        
        {/* Form Section */}
        <form onSubmit={handlePayment}>
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Pagamento
          </h2>

          {/* Amount */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Valor
            </label>
            <input
              type="number"
              placeholder="Digite o valor"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Payment Method */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Método de Pagamento
            </label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="mpesa">M-Pesa</option>
              <option value="emola">e-Mola</option>
              <option value="M-kesh">mKesh</option>
              <option value="card">Cartão</option>
            </select>
          </div>

          <div className="mb-4">
           {method !== "card" ? 
           <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Numero de celular
            </label>
           <input type="text" 
           className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
           placeholder="(87/84) 8892051"
           max={9}
           onChange={(e)=> setNumberMible(e.target.value)}
           value={numberMobile || ""}
           /> 
            </div>
            : 
            <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">
              Card Number
            </label>
              <input type="text" 
           className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
           placeholder="0000-4235-0950-3241"
           max={16}
           onChange={(e)=> setNumberCard(e.target)}
           value={numberCard || ""}
           /> 
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
              CCV
            </label>
              <input type="text" 
           className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
           placeholder="123"
           max={16}
           onChange={(e)=> setCCV(e.target.value)}
           value={numberCCv || ""}
           /> 
            </div>
            </>
          }
          </div>

          <button disabled={isPayment} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
            {!isPayment ? "Confirmar Pagamento" : 
            <div className="flex items-center justify-center gap-3">
                Aguarde... 
                <LoaderIcon className="size-5 animate-spin" />
            </div>
            }
          </button>
        </div>
        </form>

        {/* Summary Section */}
        <div className="bg-gray-50 p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Resumo da Conta
            </h3>

            <div className="space-y-3 text-gray-600">
              <div className="flex justify-between">
                <span>Valor</span>
                <span>{amount || 0} MZN</span>
              </div>

              <div className="flex justify-between">
                <span>Taxa (2%)</span>
                <span>{fee} MZN</span>
              </div>

              <div className="flex justify-between">
                 <span>Account</span>
                 <span>{orderToPaid.totalAmount} <b>MT</b></span>
              </div>

              <hr />

              <div className="flex justify-between text-lg font-bold text-gray-800">
                <span>Total</span>
                <span>{total} MZN</span>
              </div>
            </div>
          </div>
          
          <div>
            <span className="text-sm font-bold">Account details</span>
             <div className="w-full h-[100px] my-1 overflow-y-auto">
             
              {orderToPaid.items.map((item)=> (
                <div className="flex items-center justify-between">
                <div className="flex flex-col text-sm label-text">
                  <span className="leading-normal">{item.name} - {item.quantity}</span>
                  <span className="text-xs my-1">{item.price} <b>MZN</b></span>
                </div>
               <span className="text-sm label-text">{item.price * item.quantity} <b>MZN</b></span>
               </div>
              ))}

             </div>
          </div>

          <p className="text-sm text-gray-400 mt-6">
            Os pagamentos são processados de forma segura.
          </p>
        </div>

      </div>
       </div>
    </div>
  )}

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
      {Array.isArray(Order) && Order.map((order)=> (

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

      {/* Order Items */}
      <div className="bg-white shadow rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Products</h2>

        <div className="space-y-4">
         {order.items.map((item)=> (
          <div
              className="flex items-center justify-between border-b pb-3"
            >
              <div className="w-[70px] h-[70px] rounded-full">
               <img src={item.image} 
               className="w-full h-full rounded-full bg-cover"
               />
              </div>
              <div className="flex flex-col justify-center items-center">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
                <p className="text-sm text-gray-500">
                  Price: {(item.price).toFixed(2)} <b>MZN</b>
                </p>
              </div>

              <p className="text-sm font-semibold">
                Total: {(item.price * item.quantity).toFixed(2)} <b>MZN</b>
              </p>
            </div>
         ))}
        </div>
      </div>

      {/* Status */}
      <div className="bg-white shadow rounded-xl p-6 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">Status</p>
          <p className="font-semibold text-orange-600">{Order.status}</p>
          
          {order.payment === true && (
            <div className="flex items-center gap-5">
              <p className="flex gap-2 my-2 font-semibold text-green-600">
                <CircleDollarSignIcon />
                <span>Payd</span>
              </p>

              <div className="flex flex-col">
                {order.status !== "finish" && (
                  <h3 className="text-xs label-text font-semibold">If you'r order finish we send one delivery</h3>
                )}
                {/* delivred */}
              </div>
              </div>
          )}
          
        </div>

        <div className="flex gap-3">
        {order.status === "accepted" && (
            <button onClick={()=> {
              setOrderToPaid(order)
              setIdProduct(order._id)
              setShowPaymentCard((prev) => !prev)
            }} className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            <DollarSign className="size-4" />
            Payment
          </button>
        )}

        {order.status === "preparting" && (
          <>
            <button className=" flex items-center justify-center gap-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
            <p>Preparing</p>
            <div className="flex items-center gap-1">
              <span className="inline-block rounded-full w-[8px] h-[8px] bg-black animate-pulse"></span>
              <span className="inline-block rounded-full w-[8px] h-[8px] bg-black animate-pulse"></span>
              <span className="inline-block rounded-full w-[8px] h-[8px] bg-black animate-pulse"></span>
            
            </div>
          </button>
         </>
        )}
         {order.status === "delivered" && (
          <button className="flex items-center gap-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
             Delivering
             <Motorbike className="animate-pulse" />
          </button>
         )}
        </div>
      </div>
      </>
        ))}

    </div>
    </>
  );
};