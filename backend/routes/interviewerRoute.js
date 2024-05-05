const express=require('express')
const router=express.Router()
const { jwtAuthMiddleware } = require('../jwt')
const { PrismaClient } = require('@prisma/client/edge')
const { withAccelerate } = require('@prisma/extension-accelerate')


//TODO: Implement jwtAuthMiddleware
router.get('/:id',jwtAuthMiddleware,async(req,res)=>{
    const prisma = new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const userId=req.params.id
        const user = await prisma.user.findUnique({
            where:{
                id:userId
            }
        })
        if(!user){
            return res.status(404).json({
                message:"User not found"
            })
        }
        if(user.role !== 'interviewer'){
            return res.status(403).json({
                message:"User is not an interviewer"
            })
        }
        res.status(200).json({
            user
        })

    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiY2x2Ymduc3c0MDAwMm01cDM1bXQ1d2w3aiIsImVtYWlsIjoiaGVsbG8xMjM0NUBnbWFpbC5jb20iLCJwYXNzd29yZF9oYXNoIjoiJDJiJDEwJEtjSnVVZDRqUThLMDJTMTlGeWJWbS5nOVE2dXpEOU1RTmNMZjNsSGg2ZEpERWhXS3RnVVN1Iiwicm9sZSI6ImludGVydmlld2VyIn0sImlhdCI6MTcxMzkwMDMzMCwiZXhwIjoxNzEzOTMwMzMwfQ.pbyvIBGxa5vxVWKAUxmqW2pnA82AdP4mdF5kxcquOfA
//clvbgnsw40002m5p35mt5wl7j

router.put('/:id',jwtAuthMiddleware,async(req,res)=>{
    const prisma = new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const userId=req.params.id
        const user=await prisma.user.findUnique({
            where:{
                id:userId
            },
            include:{
                interviewerProfile:true
            }
        })
        if(!user){
            return res.status(404).json({
                message:"User not found"
            })
        }
        if(user.role !== 'interviewer'){
            return res.status(403).json({
                message:"Only interviewers can access this route"
            })
        }
        if(user.interviewerProfile){
            updatedUser=await prisma.user.update({
                where:{
                    id:userId
                },
                data:{
                    interviewerProfile:{
                        update:{
                            company_name:req.body.company_name,
                            industry:req.body.industry,
                            other_profile_details:req.body.other_profile_details  
                        }
                    }
                },
                include:{
                    candidateProfile:true
                }
            })
        }else{
            updatedUser=await prisma.user.update({
                where:{
                    id:userId
                },
                data:{
                    interviewerProfile:{
                        create:{
                            company_name:req.body.company_name,
                            industry:req.body.industry,
                            other_profile_details:req.body.other_profile_details
                        }
                    }
                },
                include:{
                    interviewerProfile:true
                }

            })
        }
        console.log("Profile updated successfully");
        res.status(200).json({
            message:"Profile has been updated successfully"
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

router.get('/:id/interviews',jwtAuthMiddleware,async(req,res)=>{
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
                message:"User does not exist"
            })
        }
        if(user.role !=='interviewer'){
            return res.status(403).json({
                message:"Only interviewer can access this route"
            })
        }
        const interviews=await prisma.interview.findMany({
            where:{
                interviewer_id:userId,
            },
            include:{
                candidate:true
            }
        })
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

router.post('/:id/interviews',jwtAuthMiddleware,async(req,res)=>{
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
                message:"User does not exist"
            })
        }
        if(user.role !== 'interviewer'){
            return res.status(403).json({
                message:"Only interviewer can access this route"
            })
        }
        const interviewId=req.body.interviewId
        const candidateId=req.body.candidateId
        const interview=await prisma.interview.create({
            data:{
                interview_id:interviewId,
                interviewer_id:userId,
                candidate_id:candidateId
            },
            include:{
                candidate:true
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

router.delete('/:id/interviews/:interviewId',async(req,res)=>{
    const prisma = new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const userId=req.params.id
        const interviewId=req.params.interviewId
        const user=await prisma.user.findUnique({
            where:{
                id:userId
            }
        })
        if(!user){
            return res.status(404).json({
                message:"User does not exist"
            })
        }
        if(user.role !== 'interviewer'){
            return res.status(403).json({
                message:"Only interviewer can access this route"
            })
        }
        const existingInterview=await prisma.interview.findUnique({
            where:{
                interview_id:interviewId
            }
        })
        if(!existingInterview){
            return res.status(404).json({
                message:"Interview not found"
            })
        }
        const interview=await prisma.interview.delete({
            where:{
                interviewer_id:interviewId
            }
        })

        res.status(200).json({
            interview
        })
        console.log("Interview deleted");
    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

module.exports=router