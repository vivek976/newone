const express=require("express")
const cors=require("cors")
const app=express()
const corsoption={
    origin:"http://example.com",
    optionsSucessStatus:200
}
app.use(cors(corsoption))
app.get("/api/data",(req,res)=>{
    res.json({message:"this is some data from the server"})
})
app.listen(3000,()=>{
    console.log("server is connected")
})