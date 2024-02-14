const mongoose = require('mongoose');

const { Schema } = mongoose;

const UsersSchema = new Schema({
  Email: { type: String, required: true, unique: true },
  Address: [{
    Country: { type: String },
    HouseName: { type: String },
    Pincode: { type: Number },
    State: { type: String },
  }],
  UserName: { type: String, required: true },
  Password: { type: String, required: true },
  Status: { 
    type: Boolean,
    default: true
},

  Mobile: { type: Number },
});

const Users = mongoose.model('Users', UsersSchema);


module.exports = Users;
