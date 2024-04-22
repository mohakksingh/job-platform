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
        if(!user){
            return res.status(404).json({
                message:"User not found"
            })
        }
        if(user.role !=='candidate'){
            return res.status(403).json({
                message:"Only candidates can access this route"
            })
        }
        console.log(user);
        res.status(200).json({user})
    }catch(e){
        console.log(e);
        res.status(500).json({
            e:"Internal server error"
        })
    }
})

/*name                String
  skills              String
  preferences         String
  other_profile_details String?*/

router.put('/:id',jwtAuthMiddleware,async(req,res)=>{
    const prisma = new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const userData = req.user;
        const userId = userData.id;

        // Retrieve the user's current data
        const existingUser = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!existingUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Check if the user has the correct role
        if (existingUser.role !== 'candidate') {
            return res.status(403).json({
                message: "Only candidates can access this route"
            });
        }

        // Update the user's profile data
        const updatedUser = await prisma.user.update({
            where: {
                id: userId
            },
            update: {
                name: req.body.name,
                skills: req.body.skills,
                preferences: req.body.preferences,
                other_profile_details: req.body.other_profile_details
            }
        });

        console.log("User profile updated:", updatedUser);
        res.status(200).json({
            message: "User profile updated successfully",
            user: updatedUser
        });
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