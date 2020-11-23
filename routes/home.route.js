// *************************************setup**************************************
const router=require("express").Router();
const homeController=require("../controllers/home.controller");
const authGuard=require("./guard/auth.guard");
// *************************************get home**************************************
router.get("/",homeController.getHome);

module.exports=router;