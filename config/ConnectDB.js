const mongoose = require("mongoose");

console.log("URL_MONGODB:",process.env.URL_MONGODB);

mongoose
  .connect(process.env.URL_MONGODB, { dbName: "GoPhoneStore", useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connect successfully ✅ !!!"))
  .catch((err) => console.log("connect failed ❌: ", err));
  
module.exports = mongoose;
