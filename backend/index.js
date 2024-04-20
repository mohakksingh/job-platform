const { configDotenv } = require('dotenv');
const express= require('express');
const app=express()
configDotenv()
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('API is running')
})

app.listen(process.env.PORT || 3000,console.log("port is running"))

