const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonSchema =  new Schema ({
  title: {
    type: String,
    required: [true,'title field is required']
  },
  description: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  }
});


module.exports = mongoose.model('person', PersonSchema);


/*
require true
means you must
 have a email
  addres*/
