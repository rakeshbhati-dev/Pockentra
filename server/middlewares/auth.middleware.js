const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET

const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization
        if (token) {
            token = token.split(" ")[1]
            let user = jwt.verify(token, secretKey)
            req.user = user
            next()
        }
        else{
             res.status(401).json({message:"Unauthorized User"})
        }
    } catch(err){
        res.status(500).json({message:"Something went wrong in accessing token.",error:err.message})
    }
}

module.exports=auth