import mongoose from 'mongoose';




const itemSchema = new mongoose.Schema({
   productId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"products"
   },
  name:{type:String,required:true},
  price:Number,
  quantity:Number,
  image:String
});


const orderSchema = new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId, ref:"users"},
  userName:String,
  items:[itemSchema],
  totalAmount:Number,
  status:{
    type:String,
    enum:["pending","accepted","preparing","sending","delivered"],
    default:"pending"
  },
  payment:{
    paid:Boolean,
    method:String
  },
  location:String
},{
  timestamps:true
})

const cartSchema = new mongoose.Schema({
   userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users'
   },
   productId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"products"
   },
   name:String,
   price:Number,
   quantity:Number,
   image:String
},{
  timestamps:true
})


const Order = mongoose.model("Order",orderSchema);
export const Cart = mongoose.model("Cart",cartSchema);

export default Order;







