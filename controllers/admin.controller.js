// ***********************************************setup***********************************
const validationResult=require("express-validator").validationResult;
const modelProducts=require("../models/products.model");
const orderModel=require("../models/order.model");


// ***********************************************get addProduct***********************************
exports.getAddProduct=(req,res,next)=>{
    res.render("addProduct",{isUser:true,isAdmin:req.session.isAdmin,errorsMsg:req.flash("errorsMsg"),
    pageTitle:"Add Product",successMsg:req.flash("successMsg")
});
}

// ***********************************************post addProduct***********************************
exports.postAddProduct=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
    errorsMsg=errors.errors.map(msg=>msg.msg)
    req.flash("errorsMsg",errorsMsg);
    res.redirect("/admin/addProduct");
    return;
    }
    const product={
        name:req.body.name,
        price:parseInt(req.body.price),
        description:req.body.description,
        category:req.body.category,
        image:req.file.filename
    }
    modelProducts.postProduct(product).then(()=>{
        req.flash("successMsg","product is added")
        res.redirect("/admin/addProduct");
    }).catch(err=>{
        next(err)
    });
    
}

// ***********************************************get m-order***********************************
exports.getMOrder=(req,res,next)=>{

    const query=req.query.state;
    const state=["pending","sent","completed"];
    if(query && state.includes(query))
    {
        orderModel.getOrderState(query).then(product=>{
           res.render("m-order",{isUser:req.session.userId,isAdmin:true,orders:product,pageTitle:"Manage Order"});
        }).catch(err=>{
            next(err)
        });
    }
    else
    {
    orderModel.getAllOrder().then(product=>{
        res.render("m-order",{isUser:req.session.userId,isAdmin:true,orders:product,pageTitle:"Manage Order"});
    }).catch(err=>{
        next(err)
    });
    }
}

// ***********************************************post m-order***********************************
exports.postMOrder=(req,res,next)=>{
    orderModel.postMOrder(req.body.state,req.body.productId).then(product=>{
        res.redirect("/admin/m-order");
    }).catch(err=>{
        next(err)
    });
}

