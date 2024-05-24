const express = require('express')
const employeeModel = require('./model')
const cors =require('cors')




//initialize
const app=new express()


//middleware ||passing the parameter
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())



//api
app.post('/create',async(req,res)=>{
    var results = await new employeeModel(req.body)
    results.save()
    res.send("data added")
})

//api for viewing data
app.get('/view',async(req,res)=>{
    var data = await employeeModel.find()
    res.json(data)
    console.log(data)
})
//api for deleting data
app.delete('/delete/:id',async(req,res)=>{
    console.log(req.params)
    let id=req.params.id
    await employeeModel.findByIdAndDelete(id)
    res.send("deleted")
})
//api for  updating the data
app.put('/edit/:id',async(req,res)=>{
    let id = req.params.id
    await employeeModel.findByIdAndUpdate(id,req.body)
    res.send("data updated")

})


//port
app.listen(3005,()=>{
    console.log("port 3005 is running")
})