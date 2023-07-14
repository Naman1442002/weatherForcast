
var express = require("express");
 
var https = require("https");

const bodyParser=require("body-parser");
var app=express();

app.use(bodyParser.urlencoded({extended:true}))



app.get("/",function(req,res){
   res.sendFile(__dirname+"/index.html");
})


app.post("/",function(req,res){
     const city = req.body.cityName;
     const cntryid = req.body.countryid;
     const unit = req.body.units;
     const appkey ="44ef0aa30f3149a8861a7270e3a42835";

     const url="https://api.openweathermap.org/data/2.5/weather?q="+city+","+cntryid+"&units="+unit+"&appid="+appkey;
     https.get(url,function(response){
     response.on("data",function(data){
        var weatherData=JSON.parse(data);
        var deg=weatherData.main.temp;
        res.send("The temperature of "+city+" , "+cntryid+" is "+deg);
     })
})

})

 


app.listen(3000,function(res,req){
    console.log("server listrning on port 3000");
})
