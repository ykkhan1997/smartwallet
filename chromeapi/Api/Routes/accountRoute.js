const express=require("express");
const authController=require("../Controllers/authController");
const router=express.Router();
router.post("/createaccount",authController.addAccounts);
router.get("/allaccounts",authController.allAccount);
module.exports=router;