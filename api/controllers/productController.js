const { Product } = require("../models/product");
const { Wood } = require("../models/wood");
const { Brand } = require("../models/brand");
const mongoose = require("mongoose");
// BY ARRIVAL
// /articles?sortBy=createdAt&order=desc&limit=4

// BY SELL
// /articles?sortBy=sold&order=desc&limit=100&skip=5

exports.getProductSortBy = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? req.query.limit : 100;
  Product.find()
    .populate("brand")
    .populate("wood")
    .sort([[sortBy, order]])
    .exec((err, articles) => {
      if (err) return res.status(400).send(err);
      res.send(articles);
    });
};

/// /api/product/article?id=HSHSHSKSK,JSJSJSJS,SDSDHHSHDS,JSJJSDJ&type=single
exports.getProductArticle = (req, res) => {
  let type = req.query.type;
  let items = req.query.id;

  if (type === "array") {
    let ids = req.query.id.split(",");
    items = [];
    items = ids.map(item => {
      return mongoose.Types.ObjectId(item);
    });
  }

  Product.find({ _id: { $in: items } })
    .populate("brand")
    .populate("wood")
    .exec((err, docs) => {
      return res.status(200).send(docs);
    });
};

exports.addProduct = (req, res) => {
  const product = new Product(req.body);
  product.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      article: doc
    });
  });
};

exports.getallProduct = (req, res) => {
  Product.find({}, (err, product) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(product);
  });
};
