const express=require("express")
const path=require("path")
const hbs=require("hbs")
const bodyParser=require("body-parser")
const collection=require("./db")

const app=express()

app.use(express.json())
app.set("view engine","hbs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public"), {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith(".css")) {
            res.setHeader("Content-Type", "text/css");
        }
    }
}));

app.get("/",(req,res)=>{
    res.render("login")
})
app.get("/register",(req,res)=>{
    res.render("register")
})

app.post("/register",async(req,res)=>{
    const data={
        name:req.body.name,
        dob:req.body.dob,
        email:req.body.email,
        password:req.body.password
    }
    await collection.insertMany([data])
    
    res.render("home")
})

app.post("/login",async(req,res)=>{

    try{
        const check=await collection.findOne({email:req.body.email})
        if(check.password===req.body.password){
            res.render("home")
        }
        else{
            res.send('wrong password');
        }
    }
    catch{
        res.send("wrong details");
    }

})
app.get("/home", (req, res) => {
    res.render("home");
});
app.get('/', (req, res) => {
    res.render('logout_success'); 
});




app.listen(3000,()=>{
    console.log("Successfully connected to port 3000");
})
