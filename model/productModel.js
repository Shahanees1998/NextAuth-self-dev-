import mongoose from "mongoose"
import validator from "validator"

const userSchema = mongoose.Schema({
  title: {
    type: String,
  },
  owner : {
    type: String,
    required: true,
    unique: true,
  },

  price: {
    type: String,
    required: true,
    unique: true,
  },

  
})
//console.log('here', mongoose.models, mongoose.model);
export default mongoose.models ? mongoose.models.Product 
|| mongoose.model("Product", userSchema) 
: mongoose.model("Product", userSchema)
