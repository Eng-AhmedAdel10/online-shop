// ************************************setup****************************************
const mongoose=require("mongoose");
const DB_URL="mongodb+srv://ahmedadel:80080800@cluster0.xxobw.mongodb.net/online-shop?retryWrites=true&w=majority";

// ************************************cartSchema****************************************
const cartSchema=mongoose.Schema({
    name:String,
    price:Number,
    amount:Number,
    productId:String,
    userId:String,
    timestamp:String
})
const Cart=mongoose.model("cart",cartSchema);
// ************************************save data to db****************************************
exports.cart=(data)=>{
    
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{ 
            Cart.find({userId:data.userId}).then(product=>{
                if(product.length > 0)
                {
                    const indexOfProductsId=product.map(item=>{
                        return item.productId;
                    }).indexOf(data.productId)
                    if(indexOfProductsId >= 0) 
                    {
                        const id=product[indexOfProductsId]._id;
                        const amount=parseInt(data.amount) + parseInt(product[indexOfProductsId].amount);
                        Cart.updateOne({_id:id},{$set:{amount:amount}}).then(()=>{
                            mongoose.disconnect();
                            resolve();
                        })
                    }
                    else
                    {
                        setData(data);
                    }
                    
                }
                else
                {
                    setData(data);
                }
                function setData(data)
                {
                   const cart=new Cart(data);
                    cart.save().then(()=>{
                        mongoose.disconnect();
                        resolve();
                    }).catch(err=>{
                        mongoose.disconnect();
                        reject(err);
                    })
                }
            });
    });
    })}

// ************************************get data from db****************************************
exports.getCart=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
                                            // هيرتبلي الكارت تصاعدي ع حسب توقيت كل بروداكت انا طلبه
            return Cart.find({userId:id},{},{sort:{timestamp:1}})
        }).then(data=>{
            mongoose.disconnect();
            resolve(data);
        }).catch(err=>{
            mongoose.disconnect();
            reject(err);
        })
    })
}

// ************************************update cart****************************************
exports.updateCart=(productId,userId,productAmount)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return Cart.find({userId:userId});
    }).then(product=>{
        const indexOfProductsId=product.map(item=>{
            return item.productId;
        }).indexOf(productId);
        const id=product[indexOfProductsId]._id;
        Cart.updateOne({_id:id},{$set:{amount:productAmount}}).then(()=>{
            mongoose.disconnect();
            resolve();
        }).catch(err=>{
            reject(err);
        })
    })
})
}

// ************************************delete cart****************************************
exports.deleteCart=(productId,userId)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return Cart.find({userId:userId});
    }).then(product=>{
        const indexOfProductsId=product.map(item=>{
            return item.productId;
        }).indexOf(productId);
        const id=product[indexOfProductsId]._id;
        Cart.deleteOne({_id:id}).then(()=>{
            mongoose.disconnect();
            resolve();
        }).catch(err=>{
            reject(err);
        })
    })
})
} 

// ************************************deleteAllCart****************************************
exports.deleteAllCart=(userId)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return Cart.deleteMany({userId:userId});
        }).then(_=>{
            resolve();
        }).catch(err=>{
            reject(err);
        })
    })
}

// ************************************export cart****************************************
exports.cartSchema=()=>{
    return mongoose.exports=mongoose.model("cart",cartSchema);
} 

