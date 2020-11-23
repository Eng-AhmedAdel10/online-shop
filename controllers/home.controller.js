// *************************************setup**************************************
const productModel=require("../models/products.model");

// *************************************get home**************************************
exports.getHome=(req,res,next)=>{
    // get category
    // if category && category.includes(category) (لو في كويري كاتيجوري والكويري دي بتساوي اي حاجه من الفاليد كاتيجوري هيعمبل فيلتر)
    //          filer (filter اعمل)
    // else (All لو مش رايح للكاتجوري او الكويري كاتوجري بتساوي )
    //          render all
    const category=req.query.category;
    const validCategories=["clothes","phones","computers"];
    if(category && validCategories.includes(category))
    {
        productModel.getAllProductByCategory(category).then(products=>{
            res.render("home",{products:products,isUser:req.session.userId,isAdmin:req.session.isAdmin,
                error:req.flash("errorMsg"),pageTitle:"Home"
            });
        }).catch(err=>{
            next(err)
        })
    }
    else
    {
        // get all products
        productModel.getAllProduct().then(products=>{
            console.log(req.session);
            res.render("home",{
                products:products,
                isUser:req.session.userId,
                isAdmin:req.session.isAdmin,
                error:req.flash("errorMsg"),
                pageTitle:"Home"
            });
        }).catch(err=>{
            next(err)
        })
    }

}