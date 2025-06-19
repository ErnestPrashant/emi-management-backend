import express from "express"
import jwt from "jsonwebtoken"


const authMiddleware = (req, res, next) => {
     try{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message: "unauthorized access, no token provided"
        });
    }   
   
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId; // Assuming the token contains userId
        next();
    }catch(error){
        console.error("Error in authMiddleware:", error.message);
        return res.status(403).json({
            message: "Forbidden, invalid token"
        });
    }
}

    /*const auth = req.headers['Authorization']

    if(!auth || !auth.startsWith('Bearer ')){
        res.status(500).json({
            message : "unauthrized access "
        })
    }
    try{
    const token = auth.split(' ')[1];
    const v = jwt.verify(token,process.env.JWT_SECRET)
    if(!v || v._userId){
        req.userId = v.userId
        next();
    }
    }catch(error){
        res.status(403).json({
            message : "error while getting info "
        })
    }*/

export default authMiddleware;