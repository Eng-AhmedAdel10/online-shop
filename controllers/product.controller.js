// *************************************setup**************************************
const productModel=require("../models/products.model");

// *************************************get product by id************************************
// to get product description
exports.getProductById=(req,res,next)=>{
    const id=req.params.id;
    productModel.getProductDescription(id).then(result=>{
        res.render("product",{product:result,isUser:req.session.userId,error:req.flash("errorMsg"),
        isAdmin:req.session.isAdmin,pageTitle:"Product"});
    })
}

// *************************************get product**************************************
// get the first product in db if i type in search product
exports.getProduct=(req,res,next)=>{
    productModel.getProductOne().then(result=>{
        res.render("product",{product:result,isUser:req.session.userId,error:req.flash("errorMsg"),
        isAdmin:req.session.isAdmin,pageTitle:"Product"});
    })
}