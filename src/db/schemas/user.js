var mongoose = require('mongoose');
var passwordHash = require('password-hash');

let Schema = mongoose.Schema;

// create a schema
let userSchema = new Schema({
  _id: String,
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  location: String,
  meta: {
    age: Number,
    website: String
  },
  created_at: Date,
  updated_at: Date
});

userSchema.pre('save', next => {
    let date = new Date();
    if(this.created_at) {
        this.updated_at = date;
    } else {
        this.created_at = date;
    }
    next();
})

let User = mongoose.model('User', userSchema);

module.exports = User;