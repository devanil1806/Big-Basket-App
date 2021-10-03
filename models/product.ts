import mongoose from "mongoose";
// schema means rules for table 
const productSchema= new mongoose.Schema({
   name:{type:String,required:true,unique:true},
   image:{type:String,required:true},
   price:{type:Number,required:true},
   qty:{type:Number,required:true},
   info:{type:String,required:true},

},
{
    timestamps:true
}
);

const productTable =mongoose.model('product',productSchema)
export default productTable;