let mongoose = require('mongoose');

let Schema = mongoose.Schema;

// create a schema
let languageSchema = new Schema({
  _id: String,
  name: String,
  meta: {
    talkedBy: Array,
  },
  created_at: Date,
  updated_at: Date
});

languageSchema.pre('save', next => {
    let date = new Date();
    if(this.created_at) {
        this.updated_at = date;
    } else {
        this.created_at = date;
    }
    next();
})


let Language = mongoose.model('Language', languageSchema);

module.exports = Language;