const authController=require("../Controllers/authController");
const express=require("express");

const router=express.Router();

router.post("/createtoken",authController.addToken);
router.get("/alltokens",authController.allToken);

module.exports=router;