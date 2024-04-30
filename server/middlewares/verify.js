const jwt = require("jsonwebtoken");

const verify = (req , res , next) => {
    try {
        if(!req.headers.authorization){
            return res.status(401).json({ auth: false, message: 'unauthorized'});
        }
        const token = req.headers.authorization.split(' ')[1]; // get the token from header
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        req.currentUser = decoded;
        next();
    } catch (e) {
        res.status(500).json({msg : e.message})
    }
}

module.exports= verify;