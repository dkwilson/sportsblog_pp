const mongoose = require('mongoose');

// category schema
const categorySchema = mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    }
});

const Category = module.exports = mongoose.model('Category', categorySchema);

// get categories
module.exports.getCategories = (callback, limit) => {
    Category.find(callback).limit(limit).sort([['title', 'ascending']]);
}

// add category
module.exports.addCategory = (category, callback) => {
    Category.create(category, callback);
}

// get single category by id
module.exports.getCategoryById = (id, callback) => {
    Category.findById(id, callback);
}

// update category
module.exports.updateCategory = (query, update, options, callback) => {
    Category.findByIdAndUpdate(query, update, options, callback);
}

// remove category
module.exports.removeCategory = (query, callback) => {
    Category.deleteOne(query,callback);
}