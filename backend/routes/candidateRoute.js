const express=require('express')
const { jwtAuthMiddleware } = require('../jwt')
const { PrismaClient } = require('@prisma/client/edge')
const { withAccelerate } = require('@prisma/extension-accelerate')
const router=express.Router()

router.get('/:id',jwtAuthMiddleware,async(req,res)=>{
    const prisma = new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const userData=req.user

        const userId=userData.id
        const user= await prisma.user.findUnique({
            where:{
                id:userId
            }
        })
        console.log(userId);
    }catch(e){
        console.log(e);
        res.status(500).json({
            e:"Internal server error"
        })
    }
})

router.put('/:id',jwtAuthMiddleware,(req,res)=>{
    try{

    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

router.get('/:id/interviews',jwtAuthMiddleware,(req,res)=>{
    try{

    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

router.post('/:id/interviews',jwtAuthMiddleware,(req,res)=>{
    try{

    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

router.delete('/:id/interviews/:interviewId',jwtAuthMiddleware,(req,res)=>{
    try{

    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

module.exports=router