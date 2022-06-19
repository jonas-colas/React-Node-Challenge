const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const User = require('./model/userModel');


const app = express();
require('dotenv').config();

//Connect to Database
mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('DB connected'))
.catch(err => console.log(err));

app.use(bodyParser.json());
// app.use(cookieParser());
app.use(cors());
app.use(expressValidator());

const { validateRegistration, validateLogin } = require('./validator');
const { protected } = require('./middlewares/auth');

app.post('/api/register', validateRegistration, async (req, res) => {
  const { fullname, email, password } = req.body;
  
  const checkUser = await User.findOne({ email });
  if (checkUser) {
    // throw new Error('Email already exist');
    return res.status(400).json({
      error: 'Email already exist',
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = new User({ fullname, email, password: hashedPassword });
    const savedUser = await user.save();
    res.status(201).json({ 
      id: savedUser.id, 
      fullname: savedUser.fullname, 
      email: savedUser.email,
      token: generateToken(savedUser.id)
    });
  } catch (err) {
    res.status(400).json({
      error: 'Email already exist',
    });
  }
});

app.post('/api/login', validateLogin, async (req, res) => {
  const { email, password } = req.body;
  try{
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        error: 'Email does not exist',
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({
        error: 'Credentials are incorrect',
      });
    }
    res.status(200).json({ 
      id: user.id, 
      fullname: user.fullname, 
      email: user.email, 
      token: generateToken(user.id)
    });
  }catch(err){
    res.status(400);
    throw new Error('Invalid email or password');
  }
});

app.get('/api/home', protected, async(req, res) => {
  res.status(200).json(req.user);
});

app.post('/api/logout', async (req, res) => {
  res.clearCookie('jwt');
  res.send();
});

//Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => { console.log(`listening on port ${port}`) });

module.exports = app;