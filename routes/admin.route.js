// **************************************setup*****************************************
const router=require("express").Router();
const bodyParser=require("body-parser");
const adminController=require("../controllers/admin.controller");
const guardAdmin=require("./guard/admin.guard");
const multer=require("multer");
const check=require("express-validator").check;

// **************************************get addProduct*****************************************
router.get("/addProduct",guardAdmin.isAdmin,adminController.getAddProduct);


// **************************************post addProduct*****************************************
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images")
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}_${file.originalname}`);
    }
})
router.post("/addProduct",guardAdmin.isAdmin,multer({storage:storage}).single("image"),
[
    check("name").not().isEmpty().withMessage("please enter product name"),
    check("price").not().isEmpty().withMessage("please enter product price"),
    check("description").not().isEmpty().withMessage("please enter product description"),
    check("category").custom((val,{req})=>{
        if(val == "")
        { 
            throw new Error("please select category");
        }
        else
        { 
            return true;
        }
    }),
    check("image").custom((val,{req})=>{
        if(req.file) return true;
        else throw new Error("please choose image");
    })
],
adminController.postAddProduct);

// **************************************get m-order*****************************************
    router.get("/m-order",guardAdmin.isAdmin,adminController.getMOrder)

// **************************************post m-order*****************************************
    router.post("/m-order",guardAdmin.isAdmin,bodyParser.urlencoded({extended:true}),adminController.postMOrder)

module.exports=router;





