const express=require('express')
const router=express.Router()

router.get('/api/resources',(req,res)=>{
    //Get a list of resources available for candidates.
    try{
        
    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

router.post('/api/feedback/',(req,res)=>{
    try{

    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

router.get('/api/matching/:id',(req,res)=>{
    try{

    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

router.get('/api/jobs',(req,res)=>{
    try{

    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

router.get('/api/jobs/:id',(req,res)=>{
    try{

    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

router.post('/api/jobs',(req,res)=>{
    try{

    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

router.put('/api/jobs/:id',(req,res)=>{
    try{

    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

router.delete('api/jobs/:id',(req,res)=>{
    try{

    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

router.post('/api/search',(req,res)=>{
    try{

    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

router.get('api/stats',(req,res)=>{
    try{

    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

router.post('/api/contact',(req,res)=>{
    try{

    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})