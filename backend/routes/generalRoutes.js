const express=require('express')
const router=express.Router()
const { PrismaClient } = require('@prisma/client/edge')
const { withAccelerate } = require('@prisma/extension-accelerate')

router.get('/resources',async(req,res)=>{
    const prisma = new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const resources=await prisma.resource.findMany()
        res.status(200).json({
            resources
        })
        

    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

//interviewer can post feedback only if they have interviewed a candidate
router.post('/feedback',async(req,res)=>{
    const prisma = new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const {interview_id,feedback}=req.body
        const interview=await prisma.interview.findUnique({
            where:{
                id:interview_id
            },
            include:{
                interviewer:true
            }
        })
        if(!interview){
            return res.status(404).json({
                message:"Interview not found"
            })
        }
        if(interview.interviewer.id != req.user.id){
            return res.status(403).json({
                message:"You are not authorized to write feedback for this interview"
            })  
        }
        const updatedInterview=await prisma.interview.update({
            where:{
                id:interview_id
            },
            data:{
                feedback
            },
            include:{
                interviewer:true
            }
        })
        res.status(200).json({
            updatedInterview
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

router.get('/matching/:id',async(req,res)=>{
    const prisma = new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const jobId=req.params.id
        const job=await prisma.job.findUnique({
            where:{
                id:jobId
            }
        })
        if(!job){
            return res.status(404).json({
                message:"Job not found"
            })
        }
        const candidates=await prisma.candidateProfile.findMany({
            where:{
                skills:job.skills
            }

        })
        res.status(200).json({
            candidates
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

router.get('/jobs',async(req,res)=>{
    const prisma = new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const jobs=await prisma.jobPosting.findMany()
        res.status(200).json({
            jobs
        })

    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

router.get('/jobs/:id',async(req,res)=>{
    const prisma = new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const jobId=req.params.id
        const jobs=await prisma.jobPosting.findUnique({
            where:{
                id:jobId
            }
        })
        if(!jobs){
            return res.status(404).json({
                message:"Job not found"
            })
        }
        res.status(200).json({
            jobs
        })

    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})  

router.post('/jobs',async(req,res)=>{
    const prisma = new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const {title,description,requirements,company,posted_datetime}=req.body
        const job=await prisma.jobPosting.create({
            data:{
                title,
                description,
                requirements,
                company,
                posted_datetime
            }
        })
        res.status(201).json({
            job
        })

    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

router.put('/jobs/:id',async(req,res)=>{
    const prisma = new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const jobId=req.params.id
        const {title,description,requirements,company,posted_datetime}=req.body
        const job=await prisma.jobPosting.findUnique({
            where:{
                id:jobId
            },
            include:{
                interviewer:true
            }
        })
        if(!job){
            return res.status(404).json({
                message:"Job not found"
            })
        }
        const updatedJob=await prisma.jobPosting.update({
            where:{
                id:jobId
            },
            data:{
                title,
                description,
                requirements,
                company,
                posted_datetime

            },
            include:{
                interviewer:true
            }
        })
        res.status(200).json({
            updatedJob
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

router.delete('api/jobs/:id',async(req,res)=>{
    const prisma = new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const jobId=req.params.id
        const job=await prisma.jobPosting.findUnique({
            where:{
                id:jobId
            }
        })
        if(!job){
            return res.status(404).json({
                message:"Job not found"
            })
        }
        const jobDeleted=await prisma.jobPosting.delete({
            where:{
                id:jobId
            },
            include:{
                interviewer:true
            }
        })
        res.status(200).json({
            jobDeleted
        })
        console.log("Job deleted");
    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

router.post('/api/search',async(req,res)=>{
    const prisma = new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const {search}=req.body
        const jobs=await prisma.jobPosting.findMany({
            where:{
                OR:[
                    {
                        title:{
                            contains:search
                        }
                    },
                    {
                        description:{
                            contains:search
                        }
                    },
                    {
                        requirements:{
                            contains:search
                        }
                    },
                    {
                        company:{
                            contains:search
                        }
                    }
                ]
            },
            include:{
                interviewer:true
            }
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

router.get('api/stats',async(req,res)=>{
    const prisma = new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const totalJobs=await prisma.jobPosting.count()
        const totalCandidates=await prisma.candidateProfile.count()
        const totalInterviews=await prisma.interview.count()

        res.status(200).json({
            totalJobs,
            totalCandidates,
            totalInterviews
        })

    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

router.post('/api/contact',async(req,res)=>{
    const prisma = new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const {name,email,message}=req.body
        const contact=await prisma.contact.create({
            data:{
                name,
                email,
                message
            }
        })
        res.status(201).json({
            contact
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

module.exports=router