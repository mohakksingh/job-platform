const { configDotenv } = require('dotenv');
const express= require('express');
const app=express()
configDotenv()
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('API is running')
})

const authRoutes=require('./routes/authRoute')

app.use('/api/user',authRoutes)

app.listen(process.env.PORT || 3000,console.log("port is running"))

