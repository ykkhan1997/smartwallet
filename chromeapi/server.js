const app=require("./app");
const mongoose=require("mongoose");
const dotenv=require('dotenv');
dotenv.config();
const DB=process.env.DATABASE.replace(
    "<password>",process.env.DATABASE_PASSWORD
);
mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(()=>console.log("Database connected successfully"));

const port=process.env.PORT ||  3000 ;
app.listen(port,()=>{
    console.log(`Your Port is running on port ${port}`);
});
