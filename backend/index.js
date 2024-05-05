const dotenv  = require('dotenv');
const express= require('express');
const app=express()
const PORT = process.env.PORT || 3000;
dotenv.config();
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('API is running')
})

const authRoutes=require('./routes/authRoute')

app.use('/api/user',authRoutes)


app.listen(process.env.PORT || 3000,console.log("port is running"))

