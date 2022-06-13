import connectDB from "../../../connectDB"
import Products from "../../../model/productModel"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
connectDB()

export default async (req, res) => {
  const {id,enteredTitle, enteredPrice, enteredOwner } = req.body
  console.log(id)
  console.log('5ced2388dbbbe124d8671067')
  console.log(typeof(id))
  var hex = /[0-9A-Fa-f]{6}/g;
const iddd = JSON.parse(id)
//var ObjectId = require('mongodb').ObjectID;

  //console.log(enteredTitle)

  // console.log(req.body)
  try {
    if (req.method === "PUT") {
     // const { token } = req.query

   
     var idd = mongoose.Types.ObjectId(iddd);
     console.log(idd)
      const user = await Products.findById(idd)

      if (user) {
      

        await user.delete()

        return res.status(200).json({ message: "success in updating user" })
      }
      else {
        console.log('user ni hai')

      }
    }
  } catch (error) {
    console.log(error)
  }


}
//hr@devsspace.com