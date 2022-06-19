const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, unique: true, lowercase: true,
          maxlength: 255, dropDups: true, match: /\S+@\S+\.\S+/},
    password: { type: String, required: true },
  }, 
  { timestamps: true },
  { collection: 'users' },
);

module.exports = mongoose.model('User', userSchema);