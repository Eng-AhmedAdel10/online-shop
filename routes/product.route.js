// *************************************setup**************************************
const router=require("express").Router();
const productController=require("../controllers/product.controller");
const guardAuth=require("../routes/guard/auth.guard");
// *************************************get product**************************************
router.get("/:id",guardAuth.isAuth,productController.getProductById);

// get first product if make a req to product without id
router.get("/",guardAuth.isAuth,productController.getProduct);

module.exports=router;