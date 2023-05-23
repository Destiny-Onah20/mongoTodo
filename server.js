const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({path: "./config/config.env"});
const app = require("./app");
const port = process.env.PORT
const databaseUrl = process.env.DATABASE;

mongoose.connect(databaseUrl, {
  useUnifiedTopology : true,
  useNewUrlParser: true
}).then(()=>{
  console.log("Database connected.");
}).then(()=>{
  app.listen(port, ()=>{
    console.log(`Listening to port: ${port}`);
  });
}).catch((err)=>{
  console.log(err.message);
})


