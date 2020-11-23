// **********************************setup**************************************
// express
const express=require("express");
// pass
const path=require("path");
// session
const session=require("express-session");
// store session in db
const SessionStore=require("connect-mongodb-session")(session);
// connect-flash
const flash=require("connect-flash");
// homeRouter
const homeRouter=require("./routes/home.route");
// productRouter
const productRouter=require("./routes/product.route");
// authRouter
const authRouter=require("./routes/auth.route");
// cartRouter
const cartRouter=require("./routes/cart.route");
// orderRouter
const orderRouter=require("./routes/order.route");
// adminRouter
const adminRouter=require("./routes/admin.route");


// app
const app=express();


// use assets folder in express static files
app.use(express.static(path.join(__dirname,"assets")));
app.use(express.static(path.join(__dirname,"images")));

// store
const STORE=new SessionStore({
    // url====>link db
    uri:"mongodb+srv://ahmedadel:80080800@cluster0.xxobw.mongodb.net/online-shop?retryWrites=true&w=majority",
    // collection=====>اسم الكوليكشين اللي هيحفظ فيها الداتا
    collection:"sessions"
});

// session
app.use(session({
    // secret===> دا عباره عن نص السيشن هتستخدمه وهي بتشفر بيانات السيشن والسيكيورتي بيقول ان النص يكون طويل ويكون مش معبر صعب حد يخمنه
    secret:"secret @ secret @ hash @ session @ ......",

    // saveUninitialized===>  معناه ان محفظش سيشن فالداتا بيز انا لسا مستخدمتهاش يعني انا ممكن اعمل سيشن لكن محتجهاش بعدين او تكون مش مهمه بالنسبالي فمش محتاج اعملها سيف فالداتابيز فعلشان كدا القيمه فالس يعني بختصار مش اي سيشن اعملها تتحفظ
    saveUninitialized:false,

    // cookie===>الكوكي اللي هيحفظها فالبراوزر
    // cookie:{
        // maxAge:1*60*60*100   هتنتهي بعد ساعه
        // expires:new Date() بكتب التاريخ اللي عاوزها تنتهي فيه
        // الاتنين ذي بعض اي واحده استخدمها
        // لكن انا مش هكتب كوكي خالص وهسيب القيمه الافتراضيه بتاعتها وهي لما اقفل البراوزر
    // }

    // store===>هخزنها فال داتابيز اللي اسمها سيشن
    store:STORE
}))

// flash
app.use(flash());

// use template engine ejs
app.set("view engine","ejs");

// views
app.set("views","views");


// if i want to use in detremain router 
app.use("/",homeRouter);
app.use("/product",productRouter);
app.use("/",authRouter);
app.use("/cart",cartRouter);
app.use("/order",orderRouter);
app.use("/admin",adminRouter);
// handel error
app.get("/error",(req,res,next)=>{
    res.status(500);
    res.render("error.ejs",{isUser:req.session.userId,isAdmin:req.session.isAdmin,pageTitle:"Error"})
})
app.use((error,req,res,next)=>{
    res.redirect("/error");
})
// handel error admin
app.get("/not-admin",(req,res,next)=>{
    res.status(403);
    res.render("not-admin.ejs",{isUser:req.session.userId,isAdmin:req.session.isAdmin,pageTitle:"Error"})
})
app.use((error,req,res,next)=>{
    res.redirect("/not-admin");
})
// handel error not found
app.use((req,res,next)=>{
    res.status(404);
    res.render("not-found.ejs",{isUser:req.session.userId,isAdmin:req.session.isAdmin,pageTitle:"Error"})
})
// ***********************************listen server************************

const port=process.env.PORT || 3000;
app.listen(port,()=>console.log("server is listening on port 3000"));
