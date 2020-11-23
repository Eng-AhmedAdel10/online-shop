// ************************************setup****************************************
const mongoose=require("mongoose");
const DB_URL="mongodb+srv://ahmedadel:80080800@cluster0.xxobw.mongodb.net/online-shop?retryWrites=true&w=majority";
const cart=require("./cart.model");

// ************************************orderSchema****************************************
const orderSchema=mongoose.Schema({
    name:String,
    price:Number,
    amount:Number,
    address:String,
    productId:String,
    userId:String,
    state:{
        type:String,
        default:"pending",
    },
    timestamp:String,
    date:String,
});
const Order=mongoose.model("order",orderSchema);

// ************************************save order****************************************
exports.saveOrder=(order,userId)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            const orderSave=new Order(order)
            return orderSave.save()
        }).then(()=>{
            cart.cartSchema().find({userId:userId}).then(product=>{
        const indexOfProductsId=product.map(item=>{
            return item.productId;
        }).indexOf(order.productId);
        const id=product[indexOfProductsId]._id;
            return cart.cartSchema().deleteOne({_id:id});
        }).then(()=>{
            mongoose.disconnect();
            resolve();
        }).catch(err=>{
            mongoose.disconnect();
            reject(err);
        })
    })
}
    )}

// ************************************get order****************************************
exports.getOrder=(userId)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return Order.find({userId:userId})
        }).then(orders=>{
            mongoose.disconnect();
            resolve(orders);
        }).catch(err=>{
            mongoose.disconnect();
            reject(err);
        })
    })

}

// ************************************get allOrder****************************************
exports.getAllOrder=()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return Order.find({})
        }).then(orders=>{
            mongoose.disconnect();
            resolve(orders);
        }).catch(err=>{
            mongoose.disconnect();
            reject(err);
        })
    })

}
// ************************************post MOrder****************************************
exports.postMOrder=(state,productId)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return Order.updateOne({_id:productId},{$set:{state:state}})
        }).then(_=>{
            mongoose.disconnect();
            resolve();
        }).catch(err=>{
            mongoose.disconnect();
            reject(err);
        })
    })

}

// ************************************get Order state****************************************
exports.getOrderState=(state)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return Order.find({state:state})
        }).then(orders=>{
            mongoose.disconnect();
            resolve(orders);
        }).catch(err=>{
            mongoose.disconnect();
            reject(err);
        })
    })

}







