const User=require("../Model/userModel");
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
dotenv.config({path:'.env'});
const Account=require("../Model/accountModel");
const Token=require("../Model/tokenMode");
const signinToken=async(id)=>{
    return  jwt.sign({id:id},process.env.JWT_SECRET,{
        expiresIn:"10d"
    });
}
const createToken=async(user,statusCode,req,res)=>{
    const token=await signinToken(user._id);
    res.cookie("jwt",token,{
        expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES_IN*24*60*60*1000),
        httpOnly:true,
        secure:req.secure ||req.headers["x-forwarded-proto"]==="https"
    });
    //Remove the password from output
    user.password=undefined;
    res.status(statusCode).json({
        status:"success",
        token,
        data:{
            user
        }
    });
}
exports.signUp=async function(req,res,next){
    const newUser=await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        confirmPassword:req.body.confirmPassword,
        address:req.body.address,
        privateKey:req.body.privateKey,
        mnemonic:req.body.mnemonic
    });
    createToken(newUser,201,req,res);
    
}
exports.logIn=async function(req,res,next){
    const {email,password}=req.body;
    if(!email ||!password){
        res.status(400).json({
            status:"fail",
            message:"Please Provide email and Password"
        });
        return;
    }
    const user=await User.findOne({email}).select("+password");
    if(!user ||!(await user.correctPassword(password,user.password))){
        res.status(401).json({
            status:"fail",
            message:"Incorrect Email and Password"
        });
        return;
    }
    createToken(user,200,req,res);
}
exports.addToken=async function(req,res,next){
    const token=await Token.create({
        address:req.body.address,
        name:req.body.name,
        symbol:req.body.symbol
    });
    res.status(201).json({
        status:"success",
        data:{
            token
        }
    });
}
exports.allToken=async function(req,res,next){
    const tokens=await Token.find();
    res.status(200).json({
        status:"success",
        data:{
            tokens
        }
    });
}
exports.addAccounts=async function(req,res,next){
    const account=await Account.create({
        address:req.body.address,
        privateKey:req.body.privateKey
    });
    res.status(200).json({
        status:"success",
        data:{
            account
        }
    });
}
exports.allAccount=async function(req,res,next){
    const accounts=await Account.find();
    res.status(200).json({
        status:"success",
        data:{
            accounts
        }
    });
}