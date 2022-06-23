const jwt = require('jsonwebtoken')
const { UnAuthenticated } = require('../errors')

const authenticationMiddleware = (req,res,next)=>{
    console.log(req.headers.authorization)

    let authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnAuthenticated("No Token provided.")
    }
    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const {username,id} = decoded
        req.user = {username,id};
        next()
        
    } catch (error) {
        throw new UnAuthenticated("Not authorized to access this route.")
    }



    
}

module.exports  = authenticationMiddleware