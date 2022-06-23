const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
   username:{
       type:String,
       required:true,
       unique:true
   },
   password:{
       type:String,
       required:true
   },
},{timestamps:true})

UserSchema.pre('save' , async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password , salt)
    next();
})

// static method to login user
UserSchema.statics.login = async function(username, password) {
  const user = await this.findOne({ username});
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    console.log('incorrect password')
    return null;
    // throw Error('incorrect password');
  }
  console.log('incorrect username')
  // throw Error('incorrect username');
  return null
};


const User = mongoose.model("User" , UserSchema)
module.exports = {User}