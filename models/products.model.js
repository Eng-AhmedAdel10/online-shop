// ***********************************************setup***********************************
const mongoose=require("mongoose");
const DB_URL="mongodb+srv://ahmedadel:80080800@cluster0.xxobw.mongodb.net/online-shop?retryWrites=true&w=majority";

// ***********************************************productSchema***********************************
const productSchema=mongoose.Schema({
    name:String,
    price:Number,
    description:String,
    category:String,
    image:String
})
const Product=mongoose.model("product",productSchema);

// ***********************************************get all product***********************************
// get all product to show at home page
exports.getAllProduct=()=>{
    // connect to db
    // get data
    // disconnect to db
   return new Promise((resolve,reject)=>{
    mongoose.connect(DB_URL).then(()=>{
        return Product.find({});
    }).then(products=>{
        mongoose.disconnect();
        resolve(products);
    }).catch(err=>reject(err));
   })
};

// ***************************************get all product by category***********************************
// get product by category
exports.getAllProductByCategory=(category)=>{
    // connect to db
    // get data
    // disconnect to db
   return new Promise((resolve,reject)=>{
    mongoose.connect(DB_URL).then(()=>{
        return Product.find({category:category});
    }).then(products=>{
        mongoose.disconnect();
        resolve(products);
    }).catch(err=>reject(err));
   })
};

// *******************************************get product description***********************************
exports.getProductDescription=(id)=>{
        return new Promise((resolve,reject)=>{
            mongoose.connect(DB_URL).then(()=>{
                return Product.findById(id);
            }).then(product=>{
                mongoose.disconnect();
                resolve(product);
            }).catch(err=>reject(err));
           })
};

// ****************************************get product one********************************************
// get first product in db is i search product
exports.getProductOne=()=>{
    return new Promise((resolve,reject)=>{
    mongoose.connect(DB_URL).then(()=>{
        return Product.findOne({});
    }).then(result=>{
        mongoose.disconnect();
        resolve(result);
    }).catch(err=>reject(err));
});
}

// ****************************************post product********************************************
exports.postProduct=(product)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            const productSave=new Product(product);
            return productSave.save()
        }).then(()=>{
            resolve();
        }).catch(err=>{
            reject(err)
        })
    })
}

