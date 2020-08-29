const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  userid: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  lastLogout:
  {
    type: Date
  }
},
{
  timestamps:true
});



module.exports = mongoose.model('User', userSchema);
