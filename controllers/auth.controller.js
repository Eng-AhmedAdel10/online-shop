// ***********************************************setup***********************************
const authModel=require("../models/auth.model");
const validationResult=require("express-validator").validationResult;

// ***********************************************signup***********************************
// get signup
exports.getSignup=(req,res,next)=>{
    res.render("signup",{error:req.flash("error"),isUser:req.session.userId,isAdmin:false,pageTitle:"Signup"});
}

// post signup
exports.postSignup=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        const errorMsg=errors.errors.map(msg=>{
            return msg.msg;
        })
        req.flash("error",errorMsg);
        res.redirect("/signup");
        return;
    }

    const body=req.body;
    authModel.createNewUser(body.username,body.email,body.password).then(()=>{
        res.redirect("/signin");
    }).catch(err=>{
        req.flash("error",err);
        res.redirect("/signup");
    })
}

// ***********************************************signin***********************************
// get signin
exports.getSignin=(req,res,next)=>{
    res.render("signin",{error:req.flash("error"),isUser:req.session.userId,isAdmin:false,pageTitle:"Signin"});
}

// post signin
exports.postSignin=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        const errorMsg=errors.errors.map(msg=>{
            return msg.msg
        })
        req.flash("error",errorMsg);
        res.redirect("/signin")
        return;
    }


    const body=req.body;
    authModel.signin(body.email,body.password).then((user)=>{
        req.session.userId=user.userId;
        req.session.isAdmin=user.isAdmin;
        res.redirect("/");
    }).catch(err=>{
        req.flash("error",err);
        res.redirect("/signin");
    })
}



// ***********************************************logout***********************************
exports.logout=(req,res,next)=>{
    req.session.destroy(()=>{
        console.log("logout");
        res.redirect("/");
    })

}

