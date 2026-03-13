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
    type:Boolean,
    default:false
  },
  method:{
    type:String,
    enum:{
      values:['Visa Card','M-pesa','E-mola','M-kesh'],
      message:"Payment not supported"
    }
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
   price:String,
   quantity:Number,
   image:String
},{
  timestamps:true
})


const Order = mongoose.model("Order",orderSchema);
export const Cart = mongoose.model("Cart",cartSchema);

export default Order;







