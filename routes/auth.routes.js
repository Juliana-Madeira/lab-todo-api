const { Router } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = Router();

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body 
        if(!name || !email || !password){
            throw new Error ('All fields are required')
        }

        const user = await User.findOne({email})
        if (user){
            throw new Error ('Email already exists')
        }

        const salt = bcrypt.genSaltSync(12)
        const hash = await bcrypt.hash(password, salt)
        
        const newUser = await User.create({
            name,
            email,
            passwordHash: hash
        })

        res.status(201).json({
            user: newUser.name, 
            email: newUser.email,
            todos: newUser.todos
        })
    } 
    catch (error) { 
        if(error.message === 'User alredy exists'){
            res.status(400).json({ msg: error.message })
        }
        res.status(500).json({ msg: error.message })
        
    }
})


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const userFromDb = await User.findOne({email});
        if(!userFromDb){
            throw new Error ('User not found')
        } 

        const verifiedHash = bcrypt.compareSync(password, userFromDb.passwordHash)
        if (!verifiedHash){
            throw new Error ('Email or password invalid')
        }

        const payload = {
            id: userFromDb._id,
            name: userFromDb.name,
            email
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:'10d'})

        res.status(200).json({user: payload, token})

    } catch (error) {
        res.status(500).json({msg: error.message})
    }
})

module.exports = router;