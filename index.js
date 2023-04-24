// HTTP Module for Creating Server and Serving Static Files Using Node.js

var http = require('http');
var fs = require('fs');
var path = require('path');
//const { MongoClient, ServerApiVersion } = require('mongodb');
//const uri = "mongodb+srv://zshar1:TsFZFxZyd4xc2nK6@restaurants.0pzu0cd.mongodb.net/?retryWrites=true&w=majority";        
//const client = new MongoClient(uri);
/*const connectDB=async()=>{
    try{
        await client.connect();
        console.log("Yay!! Mongo DB is connected")
    
    }
    catch(e){
        console.log(e)
    }
}
connectDB();*/

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
  };

http.createServer(async function(req, res){

    if(req.url === "/"){
        fs.readFile("./public/index.html", "UTF-8", function(err, html){
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(html);
        });
    }else if(req.url.match("\.css$")){
        var cssPath = path.join(__dirname, 'public', req.url);
        var fileStream = fs.createReadStream(cssPath, "UTF-8");
        res.writeHead(200, {"Content-Type": "text/css"});
        fileStream.pipe(res);

    }else if(req.url.match("\.png$")){
        var imagePath = path.join(__dirname, 'public', req.url);
        var fileStream = fs.createReadStream(imagePath);
        res.writeHead(200, {"Content-Type": "image/png"});
        fileStream.pipe(res);
    }else if(req.url.match("\.jpg$")){
        var imagePath = path.join(__dirname, 'public', req.url);
        var fileStream = fs.createReadStream(imagePath);
        res.writeHead(200, {"Content-Type": "image/jpg"});
        fileStream.pipe(res);
    }else if(req.url === "/api"){
        
        fs.readFile( path.join(__dirname,'public','db.json'),(err,data)=>{
        if (err) throw err;
        res.writeHead(200,headers);
        res.end(data);
        })

        /*const cursor = client.db("restaurants").collection("restaurants-collection").find({});
        const results = await cursor.toArray();
        //console.log('In api',results);
        const js= (JSON.stringify(results,null,2));
        res.writeHead(200,headers)
        res.write(js);
        //console.log('Data',js);
        res.end();*/
    }
    else{
        res.writeHead(404, {"Content-Type": "text/html"});
        res.end("No Page Found");
    }
}).listen(3000, ()=>console.log("Server is running"));