// *************************************setup**************************************
const router=require("express").Router();
const authController=require("../controllers/auth.controller");
const bodyParser=require("body-parser");
const check=require("express-validator").check;
const guardAuth=require("./guard/auth.guard");

// *************************************signup**************************************
// get signup
router.get("/signup",guardAuth.notAuth,authController.getSignup);

// post signup
router.post("/signup",guardAuth.notAuth,bodyParser.urlencoded({extended:true}),
[
    check("username").not().isEmpty().withMessage("please enter your username"),
    check("email").not().isEmpty().withMessage("please enter your email")
    .isEmail().withMessage("please enter valid email"),
    check("password").isLength({min:6}).withMessage("please enter password at least 6 char"),
    check("confirmPassword").custom((val,{req})=>{
        if(req.body.password!==val)
        {
            throw new Error("password and confirm password is not matched");
        }
        else
        {
            return true;
        }
    })
],
authController.postSignup);

// *************************************signin**************************************
// get signin
router.get("/signin",guardAuth.notAuth,authController.getSignin);

// post signin
router.post("/signin",guardAuth.notAuth,bodyParser.urlencoded({extended:true}),
[
    check("email").not().isEmpty().withMessage("please enter your email"),
    check("email").isEmail().withMessage("please enter vaild email"),
    check("password").isLength({min:6}).withMessage("please Enter password at least 6 char")
],
authController.postSignin);

// *************************************logout**************************************
// all====> او ضغظ ع الزرار فدي بتدعم البوست و الجيت /logout علشان اليوزر لو كتب  
router.all("/logout",guardAuth.isAuth,authController.logout);


module.exports=router;