import express from "express"
import jwt from "jsonwebtoken"


const authMiddleware = (req, res, next) => {
    const auth = req.headers['Authorization']

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
    }
}

export default authMiddleware;