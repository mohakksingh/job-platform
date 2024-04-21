const express=require('express')
const router=express.Router()

router.get('/api/interviewers/:id',(req,res)=>{
    try{

    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

router.put('/api/interviewers/:id',(req,res)=>{
    try{

    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

router.get('/api/interviewers/:id/interviews',(req,res)=>{
    try{

    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

router.post('/api/interviewers/:id/interviews',(req,res)=>{
    try{

    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

router.delete('/api/interviewers/:id/interviews/:interviewId',(req,res)=>{
    try{

    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})