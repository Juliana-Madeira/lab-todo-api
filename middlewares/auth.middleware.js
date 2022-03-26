const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    try {
        const bearer = req.get('Authorization')
        if(!bearer){
            return res. status(401).json('unauthorized, token not found')
        } 
        const token = bearer.split(' ')[1]    //ver no exemplo do imsonia   Authentication   Bearer Token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {...decodedToken}
        next()

    } catch (error) {
        res.status(401).json('invalid token')
    }
  
}

module.exports = auth;