const mongoose=require("mongoose");

const AccountSchema=new mongoose.Schema({
    address:String,
    privateKey:String
});
const Account=new mongoose.model("Account",AccountSchema);
module.exports=Account;