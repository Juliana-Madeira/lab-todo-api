const { Router } = require('express')
const User = require('../models/User')
const uploadCloud = require('../config/cloudinary.config')


const router = Router()

router.get('/', async (req, res) => {
    try{
        const userId = req.user.id
        const userFromDb = await User.findById(userId).select('name email image') 
        res.status(200).json(userFromDb)
    } catch(error) {
        res.status(500).json({msg: error.message})
    }
})

router.put('/image', uploadCloud.single('image'), async (req, res) => {
    const userId = req.user.id
    const { path } = req.file
    try {
        const updateUser = await User.findByIdAndUpdate(userId, {image:path}, {new:true}).select('-passwordHash')
        res.status(200).json(updateUser)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}),

module.exports = router;