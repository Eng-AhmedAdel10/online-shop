// ************************************setup****************************************
const cartModel=require("../models/cart.model");
const validationResult=require("express-validator").validationResult;

// ***************************************verifyOrder*************************************
exports.verifyOrder=(req,res,next)=>{
    res.render("verifyOrder",{isUser:true,error:req.flash("errorMsg"),
    name:req.body.name,price:req.body.price,amount:req.body.amount,productId:req.body.productId,
    isAdmin:req.session.isAdmin,pageTitle:"Verify Order"});
}

// ***************************************post order*************************************
const orderModel=require("../models/order.model");
exports.postOrder=(req,res,next)=>{
    const error=validationResult(req);
    if(!error.isEmpty())
    {
        const errors=error.errors.map(msg=>{
            return msg.msg
        })
        req.flash("errorMsg",errors);
        res.redirect("/order/verifyOrder");
        return ;
    }
    const order={
        name:req.body.name,
        price:req.body.price,
        amount:parseInt(req.body.amount),
        productId:req.body.productId,
        userId:req.session.userId,
        address:req.body.address,
        timestamp:`${new Date().getHours()}:${new Date().getMinutes()}`,
        date:`${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`
    }
    orderModel.saveOrder(order,req.session.userId).then(()=>{
        res.redirect("/order");
    }).catch(err=>{
        next(err)
    });
    
}

// ***************************************get order*************************************
exports.getOrder=(req,res,next)=>{
    orderModel.getOrder(req.session.userId).then(orders=>{
        res.render("order",{orders:orders,isUser:true,isAdmin:req.session.isAdmin,pageTitle:"Order"})
    }).catch(err=>{
        next(err)
    });
}