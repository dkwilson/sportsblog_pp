const mongoose = require('mongoose');

// article schema
const articleSchema = mongoose.Schema({
  title: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  category: {
    type: String,
  },
  body: {
    type: String,
  },
  author: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      comment_subject: {
        type: String,
      },
      comment_body: {
        type: String,
      },
      comment_author: {
        type: String,
      },
      comment_email: {
        type: String,
      },
      comment_date: {
        type: String,
      },
    },
  ],
});

const Article = (module.exports = mongoose.model('Article', articleSchema));

// get Article
module.exports.getArticles = (callback, limit) => {
  Article.find(callback)
    .limit(limit)
    .sort([['title', 'ascending']]);
};

// get article by category
module.exports.getCategoryArticles = (categoryId, callback) => {
  let query = { category: categoryId };
  Article.find(query, callback).sort([['title', 'ascending']]);
};

// add article
module.exports.addArticle = (article, callback) => {
  Article.create(article, callback);
};

// get single article by id
module.exports.getArticleById = (id, callback) => {
  Article.findById(id, callback);
};

// update article
module.exports.updateArticle = (query, update, options, callback) => {
  Article.findByIdAndUpdate(query, update, options, callback);
};

// remove article
module.exports.removeArticle = (query, callback) => {
  Article.deleteOne(query, callback);
};

// add comment
module.exports.addComment = (query, comment, callback) => {
  Article.updateOne(
    query,
    {
      $set: { comments: comment },
    },
    callback
  );
};
