const mongoose=require("mongoose");
const bycrypt=require("bcryptjs");
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Provide Your Name"]
    },
    email:{
        type:String,
        required:[true,"Please Provide Your Email"],
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:[true,"Please Provide  Password"],
        select:false
    },
    confirmPassword:{
        type:String,
        required:[true,"Please Confirm Your Password"],
        validate:{
            validator:function (el){
                return el===this.password
            }
        }
    },
    passwordChangedAt:Date,
    address:String,
    privateKey:String,
    mnemonic:String,
});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password=await bycrypt.hash(this.password,12);
    this.confirmPassword=undefined;
    next();
});
userSchema.pre("save",async function(next){
    if(!this.isModified("password")||this.isNew) return next();
    this.passwordChangedAt=Date.now()-1000;
    next();
})
userSchema.pre("/^find/",async function(next){
    this.find({active:{$ne:false}});
    next();
});
userSchema.methods.correctPassword=async function(candidatePassword,userPassword){
        return await bycrypt.compare(candidatePassword,userPassword);
}
userSchema.methods.changedPasswordAfter=async function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changedTimeStamp=parseInt(this.passwordChangedAt.getTime()/1000,10);

        return JWTTimestamp<changedTimeStamp;
    };
    return false;
    
}
const User=mongoose.model("User",userSchema);
module.exports=User;