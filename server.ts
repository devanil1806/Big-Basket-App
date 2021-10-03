import express from 'express';
import dotEnv from 'dotenv';
import mongoose from 'mongoose';
import productRouter from './router/productRouter';

const app:express.Application = express();


// configure express to receive from JSON()

app.use(express.json())

// config .env
dotEnv.config({path:'./.env'});

//  configure Routings
app.use('/api',productRouter)


 const hostName:string| undefined=process.env.HOST_NAME;
 const port:number| undefined=Number(process.env.PORT);
 const MongoDBURL:string|undefined = process.env.MONGO_DB_URL
 app.get('/', (req, res) =>{
     res.status(200).send(`<h2>Express from bigBasket server</h2>`)
 })

 if(MongoDBURL !== undefined){
     mongoose.connect(MongoDBURL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify:false,
        useCreateIndex:true
     }).then((response) => {
         console.log('Connected to MongoDB successfully');
         
     }).catch((error) =>{
         console.error(error);
        //  if i am not connected then simply exit..
         process.exit(1)
     })

 }




 if(port !== undefined && hostName!==undefined){
   
    app.listen(port,hostName,()=>{
        console.log(`express server starts at http://${hostName}:${port}`)
    })
 }


 


// import express from 'express';
// import dotEnv from 'dotenv';
// import mongoose from 'mongoose';
// import productRouter from './router/productRouter';

// const app: express.Application = express()

// app.use(express.json());

// // config dotEnv
// dotEnv.config({ path: './.env' })

// const hostName: string | undefined = process.env.HOST_NAME;
// const port: number | undefined = Number(process.env.PORT);
// const mongoDBURL: string | undefined = process.env.MONGO_DB_URL;

// // connect to MongoDB
// if (mongoDBURL !== undefined) {
//     mongoose.connect(mongoDBURL, {
//         useNewUrlParser: true,
//         useFindAndModify: false,
//         useUnifiedTopology: true,
//         useCreateIndex: true
//     }).then((resolve) => {
//         console.log("Connected To MongoDB Successfully...");
//     }).catch((error) => {
//         console.log(error);
//         process.exit(1);  //stop the NodeJs connection and exit

//     })
// }

// app.get('/', (request: express.Request, response: express.Response) => {
//     response.status(200).send(`<h2>Welcome To React BigBAsket Srever...</h2>`)
// });

// // config productRouter
// app.use('/api', productRouter)

// if (port !== undefined && hostName !== undefined) {
//     app.listen(port, hostName, () => {
//         console.log(`Express Server Is Strated At http://${hostName}:${port}`);

//     })
// }