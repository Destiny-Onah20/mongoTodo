const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({path: "./config/config.env"});
const app = require("./app");
const port = 1800;
const databaseUrl = "mongodb+srv://onahdestinyc20:4ggoPMQWogMml4kn@cluster0.y9wmotd.mongodb.net/?retryWrites=true&w=majority";

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


