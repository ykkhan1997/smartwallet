const express=require("express");
const accountRouter=require("./Api/Routes/accountRoute");
const userRouter=require("./Api/Routes/userRouter");
const tokenRouter=require("./Api/Routes/tokenRouter");
const mainRoute=require("./Api/Routes/mainRoute");
const cors=require("cors");
const app=express();
app.use(express.json());
app.use(cors());
app.use("*",cors());
app.use("/api/v1/user",userRouter);
app.use("/api/v1/accounts",accountRouter);
app.use("/api/v1/tokens",tokenRouter);
app.use(mainRoute);

module.exports=app;