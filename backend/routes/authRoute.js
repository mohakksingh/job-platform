const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.port || 5000;

app.use(bodyParser.json());
app.use(cors());

app.post('/register',async (req,res) => {
    try{
        const{email,password,role} = req.body;

        if(!email || !password || !role){
            return res.status(400).json({message: "Email, password, and role are required "});

        }   

        const existingUser = await prisma.user.findUnique({ where: {email}});
        if(existingUser){
            return res.status(400).json({message: 'User already exists'});

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                passwordHash: hashedPassword,
                role,
            },
        });

        res.status(201).json({ message: 'User registered successfully', user: newUser});

    }catch(error){
        console.error('Error registering user:', error);
        res.status(500).json({message: 'Internal server error'});
    }
});