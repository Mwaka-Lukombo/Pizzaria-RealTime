import mongoose from 'mongoose';




const productSchema = new mongoose.Schema({
  name:{type:String,required:true},
  category:{type:String,required:true},
  price:{type:String,required:true},
  rating:{type:String,default:""},
  image:{type:String,required:true},
  ingredients:[{type:String}]
},{
    timestamps:true
})


const Product = mongoose.model('Product', productSchema);

export default Product;





