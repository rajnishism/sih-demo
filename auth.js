const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0/\/", salt);
const jwt = require('jsonwebtoken');

const userSchema = {
  name: String,
  email: String,
  password: String,
  cpassword: String,
}

const User = mongoose.model("user", userSchema);
//Middleware



router.get('/login', (req, res) => {
  res.render('login', {});
})
router.get('/register', (req, res) => {
  res.render('register', {});
})
router.post('/login', (req, res) => {
  console.log(req.body);
  const {
    email,
    password
  } = req.body;
  if (!email || !password) {
    return res.send("please enter the field properly");
  }
  User.findOne({
      email: email
    })
    .then((userlogin) => {
      if (!userlogin || !bcrypt.compareSync(password, userlogin.password)) {
        // authentication failed
        return res.send("invalid");
      }
      else
      {
        // authentication successful

        //generate jsonwebtoken
        const token = jwt.sign({
            _id: userlogin._id
          },
          "thisismyspecialtokenworthninetyninerupeesanditshouldbemorethanthirtytwocharacters",
          {
            expiresIn: "2h",
          }
        );
        console.log(token);
        res.cookie("jwt",token).redirect('/dashboard');


      }
    }).catch((err) => {
      console.log(err);
    })



})
router.post('/register', async (req, res) => {
  const {
    name,
    email,
    password
  } = req.body;

  if (!name || !email || !password) {
    return res.send("fill the field properly")

  }
  User.findOne({
      email: email
    })
    .then((userExist) => {
      if (userExist) {
        return res.send("User already exist");
      }

      const user = new User({
        name,
        email,
        password
      });
      user.password = bcrypt.hashSync(password, 10);

      user.save().then(() => {
        console.log("succesfully created a new document");
        return res.redirect('/login');
      }).catch((err) => {
        console.log(err);
        console.log("faliled to register");
      })
    }).catch((err) => {
      console.log(err);
    })


})


router.get('/logout',(req,res)=>{
  res.clearCookie('jwt');
    return res.redirect('/');
})

module.exports = router;
