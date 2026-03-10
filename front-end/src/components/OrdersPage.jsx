import React from "react";
import { ArrowLeft, Package, User, Calendar, CircleDollarSign } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export const OrdersPage = () => {
  const { id } = useParams();

  // dados mockados (depois você liga ao backend)
  const order = {
    _id: id,
    customer: "João Silva",
    status: "Preparing",
    total: 32.5,
    createdAt: "2026-03-09",
    items: [
      { name: "Pizza Margherita", quantity: 2, price: 10 },
      { name: "Hamburger", quantity: 1, price: 8 },
      { name: "Coca-Cola", quantity: 2, price: 2.25 },
    ],
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          to="/dashboard/orders"
          className="flex items-center gap-2 text-sm bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200"
        >
          <ArrowLeft size={16} />
          Back
        </Link>

        <h1 className="text-2xl font-bold">Order Details</h1>
      </div>

      {/* Order Info */}
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
            <p className="font-semibold">{order.customer}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Calendar className="text-green-500" />
          <div>
            <p className="text-sm text-gray-500">Date</p>
            <p className="font-semibold">{order.createdAt}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <CircleDollarSign className="text-purple-500" />
          <div>
            <p className="text-sm text-gray-500">Total</p>
            <p className="font-semibold">${order.total}</p>
          </div>
        </div>
      </div>

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
                ${(item.price * item.quantity).toFixed(2)}
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
    </div>
  );
};