// ************************************setup****************************************
const router=require("express").Router();
const bodyparser=require("body-parser");
const cartController=require("../controllers/cart.controller");
const guard=require("./guard/auth.guard");
const check=require("express-validator").check;

// ************************************post cart****************************************
router.post("/",guard.isAuth,bodyparser.urlencoded({extended:true},guard.isAuth),[
    check("amount").isInt({min:1}).withMessage("please enter amount at least 1")
]
,cartController.cart);

// ************************************get cart****************************************
router.get("/",guard.isAuth,cartController.getCart)

// ************************************update cart****************************************
router.post("/save",guard.isAuth,bodyparser.urlencoded({extended:true}),[
    check("amount").isInt({min:1}).withMessage("Please Enter at least 1")
],cartController.updateCart)

// ************************************delete cart****************************************
router.post("/delete",guard.isAuth,bodyparser.urlencoded({extended:true}),cartController.deleteCart)

// ************************************deleteAllCart****************************************
router.post("/deleteAll",guard.isAuth,bodyparser.urlencoded({extended:true}),cartController.deleteAllCart)



module.exports=router;

