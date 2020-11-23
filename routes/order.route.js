// ************************************setup****************************************
const router=require("express").Router();
const bodyparser=require("body-parser");
const orderController=require("../controllers/order.controller");
const guard=require("./guard/auth.guard");
const check=require("express-validator").check;

// ************************************verifyOrder****************************************
router.all("/verifyOrder",guard.isAuth,bodyparser.urlencoded({extended:true}),orderController.verifyOrder)

// ************************************post order****************************************
router.post("/",guard.isAuth,bodyparser.urlencoded({extended:true}),
[
    check("address").not().isEmpty().withMessage("please enter your address"),
    check("name").not().isEmpty().withMessage("go to cart to make order")
],
orderController.postOrder)

// ************************************get order****************************************
router.get("/",guard.isAuth,bodyparser.urlencoded({extended:true}),orderController.getOrder)


module.exports=router;