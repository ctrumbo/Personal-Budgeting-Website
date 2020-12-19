const mongoose = require('mongoose');

let url = 'mongodb+srv://ctrumbo:Trumbo54321@cluster0.hiamm.mongodb.net/PersonalBudget?retryWrites=true&w=majority';

const connectDB = async () =>{
  await mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true});
  console.log(mongoose.connection.readyState);
  console.log("connected");
};

module.exports = connectDB;
