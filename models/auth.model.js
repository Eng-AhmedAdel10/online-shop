// ***********************************************setup***********************************
const mongoose=require("mongoose");
const DB_URL="mongodb+srv://ahmedadel:80080800@cluster0.xxobw.mongodb.net/online-shop?retryWrites=true&w=majority";
const bcrypt=require("bcrypt");

// ***********************************************userSchema***********************************
const userSchema=mongoose.Schema({
    username:String,
    email:String,
    password:String,
    isAdmin:{
        type:Boolean,
        default:false
    }
}); 
const User=mongoose.model("user",userSchema);

// ***********************************************signup***********************************
exports.createNewUser=(username,email,password)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return User.findOne({email:email})
        }).then(user=>{
            if(user) 
            {
                mongoose.disconnect();
                reject("this email is already exist");
            }
            else
            {
                return bcrypt.hash(password,10)
            }
        }).then(hashPassword=>{
            const user=new User({
                username:username,
                email:email,
                password:hashPassword,
            });
            return user.save();
        }).then(()=>{
            mongoose.disconnect();
            resolve();
        }).catch(err=>{
            mongoose.disconnect();
            reject(err);
        })
    })
};

// ***********************************************signin***********************************
exports.signin=(email,password)=>{
    return new Promise((resolve,reject)=>{
        let userG;
        mongoose.connect(DB_URL).then(()=>{         
            return User.findOne({email:email})
         })
        .then(user=>{
            userG=user;
           if(!user)
           {
               mongoose.disconnect();
               reject("this email is not exist");
           }
            else
            {
                return bcrypt.compare(password,user.password)
            }
        }).then(same=>{
            if(!same)
            {
                mongoose.disconnect();
                reject("this password is incorrect");
            }
            else
            { 
                mongoose.disconnect();
                resolve({userId:userG._id,isAdmin:userG.isAdmin});
            }
        }).catch(err=>{
            mongoose.disconnect();
            reject(err);
        })
    })
}