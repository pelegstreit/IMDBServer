import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import process from 'process';
import {connectDB} from './data base/mongoose.connection.mjs';
import {error_handler, not_found} from './middleware/errors.handler.mjs';

import userRouter from './modules/users/user.router.mjs';
import userModel from './modules/users/user.model.mjs';
import mongoose from 'mongoose';


//global varibale
const { PORT,HOST, DB_URI } = process.env;
// const NODE_ENV = process.env.NODE_ENV;
const JWT_SECERT= "dkvdjbgnskjgkelfsbegsejkjgs";
//define express app
const app = express();

//apply middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

const User = mongoose.model("user");

//routing
app.use('/user', userRouter);


app.post('/register', async(req,res)=> {
  const {name, mail, password} = req.body;
  const passwordCrypt = await bcrypt.hash(password, 10);
  try{
    const oldUser = await User.findOne({mail});
    if(oldUser)
    {
     return res.send({Error:"Mail already in use"});
    }
    await User.create({name, mail, password:passwordCrypt, movie:[]});
    res.send({status:"ok"});
  }
  catch{
    res.send({status:"fail"});
  }
});

app.post("/login", async (req, res) => {
  const { mail, password } = req.body;

  const user = await User.findOne({ mail });
  if (!user) {
    return res.json({ error: "User was not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ mail: user.mail }, JWT_SECERT, {
      // expiresIn: "15m",
    });
    if (res.status(201)) {
      return res.json({ status: "ok", token: token, data: {mail:user.mail, name: user.name, movie: user.movie} });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "Invalid Password" });
});

app.post("/userdata", async (req,res) =>{
const {token} = req.body;
try {
  const user = jwt.verify(token, JWT_SECERT);
  const usermail= user.mail;
  User.findOne({mail: usermail}). then((data)=>{
    res.send({status: "ok", data: data});
  }).catch ((error)=> {
    res.send({status: "error", data: error});
  });
} catch (error) {
  
}
});

app.use(error_handler);
app.use('*', not_found);



//launch server
(async ()=> {
    await connectDB(DB_URI);
    app.listen(PORT,HOST);
    console.log(`IMDB is live on`,` ✨ ⚡  http://${HOST}:${PORT} ✨ ⚡`);  
  })().catch()