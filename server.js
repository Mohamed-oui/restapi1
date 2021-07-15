const express = require('express');
require('dotenv').config({path: './config/.env'});
const connectDB = require('./config/connectDB');
const User = require('./models/User')

const app = express();
app.use(express.json());
connectDB();

//add users to the database
app.post('/users/add' , async(req,res)=> {
  const {name, adress, specialty, email, phone} = req.body;
  const newUser = new User({name,adress,specialty,email,phone,});
  try {
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    res.send({error: error.message});
  }
});

//get all the users
app.get('/users/get', async (req,res)=>{
try {
  const users = await User.find();
  res.send(users);
} catch (error) {
  res.send(error);
}
});

//REMOVE A USER BY ID
app.remove('/users/delete/:id', async (req,res)=>{
try {
  await User.findByIdAndRemove(req.params.id);
  res.send({msg:'User successfully deleted'});
} catch (error) {
  res.send(error);
}
});

//EDIT A USER BY ID
app.put('/users/update/:id', async (req,res)=>{
  try {
    const editUser = await User.findByIdAndUpdate(req.params.id,{...req.body},{new:true});
    res.send(editUser);
  } catch (error) {
    res.send(error);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) =>
  err ? console.error(err) : console.log(`server is running on port ${PORT}`)
);
