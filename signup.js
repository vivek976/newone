const express=require("express")
const mongoose=require("mongoose")
const app=express()
mongoose.connect('mongodb://127.0.0.1:27017/apple')
const schema=mongoose.Schema({
    username:String,
    password:String
})
const user=mongoose.model("collection",schema)
app.use(express.json())
app.post("/signup",async(req,res)=>{
    console.log("here it is working")
    const {username,password}=req.body;
    const user1=await user.findOne({username:username})
    if(user1==null){
        user.create({
            username:username,
            password:password
        })
        res.send("signup sucess")
    }
    else{
        res.send("username is already taken")
    }

})
app.listen(3000,()=>{
    console.log(`server is connected to port 3000`)
})
