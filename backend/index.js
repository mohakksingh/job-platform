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
const candidateRoutes=require('./routes/candidateRoute')
const interviewerRoutes=require('./routes/interviewerRoute')
const generalRoutes=require('./routes/generalRoutes')

app.use('/api/user',authRoutes)
app.use('/api/candidate',candidateRoutes)
app.use('/api/interviewer',interviewerRoutes)
app.use('/api',generalRoutes)



app.listen(process.env.PORT || 3000,console.log("port is running"))

