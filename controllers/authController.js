const { User } = require("../models/userModel");
const jwt = require("jsonwebtoken");
let users;
const DB_NAME = process.env.DB_NAME
const injectAuthDB = async (conn) => {
  if (users) {
    return;
  }
  try {
    users = await conn.db(DB_NAME).collection("users");
  } catch (e) {
    console.error(`Unable to establish collection handles in userDAO: ${e}`);
  }
};
// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: maxAge,
  });
};

const singupPost = async (req, res) => {
  try {
    console.log(req.body);
    const find = await users.findOne({ username: req.body.username });
    if (find) {
      res.status(404).json({ message: "user already exists!" });
      return;
    } else {
      const user = await User.create(req.body);
      const token = createToken(user._id);
      res.status(201).json({ user: user, message: "signup successful"  , token:token});
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const loginPost = async (req, res) => {
    const { username, password } = req.body;

  try {
    const user = await User.login(username, password);
    if (user) {
      const token = createToken(user._id);
      res.status(200).json({message:"success" , success:true , token:token})
    }
    if (user) {
      res.status(200).json({ user: user._id });
      return;
    }
    res.status(200).json({ message: "Invalid Credentials" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};

const logoutGet = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.cookie("user", "", { maxAge: 1 });
  res.redirect("/");
};

module.exports = { singupPost, loginPost, logoutGet, injectAuthDB };