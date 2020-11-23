// ************************************setup****************************************
const cartModel=require("../models/cart.model");
const validationResult=require("express-validator").validationResult;


// ************************************post cart****************************************
exports.cart=(req,res,next)=>{
    const error=validationResult(req);
    if(!error.isEmpty())
    {
        req.flash("errorMsg",error.errors[0].msg);
        res.redirect(req.body.redirectTo);
        return ;
    }

    const data={
        name:req.body.name,
        price:req.body.price,
        amount:req.body.amount,
        productId:req.body.productId,
        userId:req.session.userId,
        timestamp:Date.now()
    }
    cartModel.cart(data,req.body.productId).then(()=>{
        res.redirect("/cart");
    }).catch(err=>{
        next(err)
    });

}

// ************************************get cart****************************************
exports.getCart=(req,res,next)=>{
    cartModel.getCart(req.session.userId).then(data=>{
        res.render("cart",{cart:data,isUser:true,error:req.flash("errorMsg"),isAdmin:req.session.isAdmin,
        pageTitle:"Cart"
    });
    }).catch(err=>{
        next(err)
    });
}

// ************************************update cart****************************************
exports.updateCart=(req,res,next)=>{
    const error=validationResult(req);
    if(!error.isEmpty())
    {
        req.flash("errorMsg",error.errors[0].msg);
        res.redirect("/cart");
        return ;
    }

    cartModel.updateCart(req.body.productId,req.session.userId,parseInt(req.body.amount)).then(()=>{
        res.redirect("/cart"); 
    }).catch(err=>{
        next(err)
    });
}

// ************************************detete cart****************************************
exports.deleteCart=(req,res,next)=>{
    cartModel.deleteCart(req.body.productId,req.session.userId).then(data=>{
        res.redirect("/cart");
    }).catch(err=>{
        next(err)
    });
}

// ************************************deteteAll cart****************************************
exports.deleteAllCart=(req,res,next)=>{
    cartModel.deleteAllCart(req.session.userId).then(()=>{
        res.redirect("/cart");
    }).catch(err=>{
        next(err)
    });
}



