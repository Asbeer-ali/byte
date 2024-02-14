const mongoose = require('mongoose');

const { Schema } = mongoose;

const CategorySchema = new Schema({
 categoryName:{
    type:String,
    required:true
 }

});

const Category = mongoose.model('category', CategorySchema);


module.exports = Category;
