import connectDB from "../../../connectDB"
import Products from "../../../model/productModel"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

connectDB()

export default async (req, res) => {
  const {enteredTitle, enteredPrice, enteredOwner } = req.body
  //console.log(enteredTitle)

  // console.log(req.body)
  try {
    if (req.method === "POST") {
      const {enteredTitle, enteredPrice, enteredOwner } = req.body

      // console.log(email, password, firstName, lastName)

    
      const newProduct = await new Products({
        title: enteredTitle,
        owner: enteredOwner,
        price: enteredPrice,
      }).save()

    console.log(newProduct)
    res.status(201).json({message : 'product added succefully'})
    }
  } catch (error) {
    console.log(error)
  }


}
//hr@devsspace.com