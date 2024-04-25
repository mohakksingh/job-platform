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
            },
            include: {
                candidateProfile: true // Include the candidate profile if it exists
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
                message: "Only candidates can update their profile"
            });
        }

        // Update the candidate profile (if exists) or create a new one
        let updatedUser;
        if (existingUser.candidateProfile) {
            // Update existing candidate profile
            updatedUser = await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    candidateProfile: {
                        update: {
                            name: req.body.name,
                            skills: req.body.skills,
                            preferences: req.body.preferences,
                            resume: req.body.resume
                        }
                    }
                },
                include: {
                    candidateProfile: true
                }
            });
        } else {
            // Create new candidate profile
            updatedUser = await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    candidateProfile: {
                        create: {
                            name: req.body.name,
                            skills: req.body.skills,
                            preferences: req.body.preferences,
                            resume: req.body.resume
                        }
                    }
                },
                include: {
                    candidateProfile: true
                }
            });
        }

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

router.get('/:id/interviews',jwtAuthMiddleware,async (req,res)=>{
    const prisma = new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const userId=req.params.id
        const user=await prisma.user.findUnique({
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
        const interviews=await prisma.interview.findMany({
            where:{
                candidate_id:userId
            },
            include:{
                interviewer:true
            }
        })
        console.log(interviews)
        res.status(200).json({
            interviews
        })

    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

router.post('/:id/interviews',jwtAuthMiddleware,async (req,res)=>{
    const prisma = new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const userId=req.params.id
        const user=await prisma.user.findUnique({
            where:{
                id:userId
            }
        })
        if(!user){
            return res.status(404).json({
                message:"user not found"
            })
        }
        if(user.role!=="candidate"){
            return res.status(403).json({
                message:"Only candidates can access this route"
            })
        }
        const interviewerId=req.body.interviewer_id
        const interviewer=await prisma.user.findUnique({
            where:{
                id:interviewerId
            }
        })
        if(!interviewer){
            return res.status(404).json({
                message:"Interviewer not found"
            })
        }
        if(interviewer.role !== 'interviewer'){
            return res.status(403).json({
                message:"Only interviewers are allowed to assign interviews"
            })
        }
        const interview=await prisma.interview.create({
            data:{
                candidate_id:userId,
                feedback:req.body.feedback,
                interviewer_id:interviewerId
            }
        })
        res.status(200).json({
            interview
        })


    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

router.delete('/:id/interviews/:interviewId',jwtAuthMiddleware,async (req,res)=>{
    try{
        const userId=req.params.id
        const user=await prisma.user.findUnique({
            where:{
                id:userId
            },
            include:{
                interview:true
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

        const interviewId=req.params.interviewId
        const existingInterview=await prisma.interview.findUnique(({
            where:{
                id:interviewId
            }
        }))
        if (!existingInterview){
            return res.status(404).json({
                message:"Interview not found"
            })
        }

        if(existingInterview.candidate_id !== userId){
            return res.status(403).json({
                message:"You are not allowed to delete this interview"
            })
        }

        const interview=await prisma.interview.delete({
            where:{
                id:interviewId,

            }
        })
        res.status(200).json({
            message:"Interview deleted successfully"
        })


    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

module.exports=router