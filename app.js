const express =require('express');
const app= new express();
const router =require('./src/route/api');
//const bodyParser = require('body-parser');
require('dotenv').config();

//Security Middleware Lib Import
const rateLimit =require('express-rate-limit');
const helmet =require('helmet');
const hpp =require('hpp');
const cors =require('cors');
const mongoSanitize=require('express-mongo-sanitize');
const xss=require('xss-clean');
const cookieParser = require('cookie-parser');
//const path = require("path");
const mongoose=require('mongoose');

app.use(cookieParser());

//Security Middleware Lib Implement
app.use(cors({ origin: "*" }));
app.use(helmet({
    contentSecurityPolicy: false, // Disable Helmet's default CSP
}));
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
    
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

const limiter= rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter);

//body parser implement
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

let URL=process.env.URL
let option={user:'',pass:"",autoIndex:true};
mongoose.connect(URL,option).then((res)=>{
    console.log("Database Connected")
}).catch((err)=>{
    console.log(err)
})

app.set('etag', false);

app.use("/api",router);

//undefined route implement
app.use("*",(req,res)=>{
    res.status(404).json({status:"fail",data:"not found(wrong route)"})
});

//app.use(express.static('client/dist'));


// Add React Front End Routing

//app.get('*',function (req,res) {
//   res.sendFile(path.resolve(__dirname,'client','dist','index.html'))
//})



module.exports=app;