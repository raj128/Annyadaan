import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";


import User from "../models/user.model.js";

export const signup=async(req, res)=>{
    try{
        const {name, email, password} =req.body;
        if (!name || !password || !email) {
            return res.json({ error: "Please submit all required field" });
        }
        
        User.findOne({email:email})
        .then((savedUser) => {
            if(savedUser){
                return res.json({error:"This Email is already used !"});
            }
            bcrypt.hash(password, 12).then((hashedPwd)=> {
                const user=new User({
                    name:name,
                    email:email,
                    password:hashedPwd,
                });
                user.save()
                    .then((user) => {
                        res.status(200).json({message :"Saved successfully"});
                    })
                    .catch((err)=>{
                        console.log(err);
                    });
            });
        });
    }catch(err){
        next(err);
    }
}

export const signin=(req, res)=>{
    try{
        const{email, password} = req.body;
        if(!email || !password)
        {
            return res.json({error:"Please provide email or pasword"});
        }

        User.findOne({email: email})
        .then((savedUser)=>{
            if(!savedUser) {
                return res.json({error:"Invalid Email or Password"});
            }
            bcrypt.compare(password, savedUser.password).then((doMatch) =>{
                if(doMatch){
                    const token=jwt.sign({_id:savedUser._id}, process.env.JWT_SECRET);
                    const { _id, name, email } = savedUser;
                    res
                    .cookie("access_token", token, {
                        httpOnly: true,
                    })
                    .json({token, user:{_id, name, email}});
                }else{
                    return res.json({
                        error:"Invalid email or password",
                    });
                }
            });
        })
    }catch(err){
        next(err);
    }
}
