const mongoose=require("mongoose");

const TokenSchema=new mongoose.Schema({
    address:String,
    name:String,
    symbol:String
});
const Token=new mongoose.model("Token",TokenSchema);
module.exports=Token;