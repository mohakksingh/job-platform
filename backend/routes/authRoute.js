const express = require('express');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client/edge')
const { withAccelerate } = require('@prisma/extension-accelerate')
const env = require('dotenv');

const prisma = new PrismaClient();
const router = express.Router();

router.post('/register',async (req,res) => {
    const prisma = new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const{email,password_hash,role} = req.body;

         if(!email || !password_hash ){
            return res.status(400).json({message: "Email, password, and role are required "});
        }   
        
        if(role !=='candidate' && role !=='interviewer'){
            return res.status(400).json({
                message:"Role  must be either candidate or interviewer"
            })
        }

        const existingUser = await prisma.user.findUnique({ where: {email}});
        if(existingUser){
            return res.status(400).json({message: 'User already exists'});

        }

        const hashedPassword = await bcrypt.hash(password_hash, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                password_hash: hashedPassword,
                role,
            },
        });

        res.status(201).json({ message: 'User registered successfully', user: newUser});

    }catch(error){
        console.error('Error registering user:', error);
        res.status(500).json({message: 'Internal server error'});
    }
});


router.post('/login',async(req,res)=>{
    const prisma = new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const {email,password_hash}=req.body
        if(!email || !password_hash){
            return res.status(400).json({
                message:"Both email and password are required"
            })
        }
        const user=await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(!user ){

        }
    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

module.exports=router