const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res,next, id ) => {
    Product.findById(id)
    .populate("category")
    .exec((err, product ) => {
        if (err) {
            return res.status(400).json({
                error: "product not found"
            })
        }
        req.product = product;
        next();

    })
};

exports.createProduct = (req, res,) => {
    let form = new formidable.IncomingForm();

    form.keepExtensions = true;

    form.parse(req , (err , fields , file) => {
        if (err) {
            return res.status(400).json({
                error: "problem with image"
            })
        }


        //destructure the fields
        const { name , description, price , stock, category} = fields;

        if (!name || !description ||!price || !stock || !category) {
            return res.json({
                error: "All fields are required"
            })
            
        }

        let product = new Product(fields)

    //handle file here
    if (file.photo) {
        if (file.photo.size > 3000000) {
            return res.status(400).json({
                error: "picture is so big"
            })
        }
        product.photo.data = fs.readFileSync(file.photo.path);
        product.photo.contentType = file.photo.type;
    }
    //save to the db
    product.save((err, product) => {
        if (err) {
            return res.status(400).json({
                error: "saving product in db is failed"
            })
        }
        res.json(product)
    })


    })
}

exports.getProduct = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product)
}
//middleware
exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("content-Type", req.product.photo.contentType)
            return res.send(req.product.photo.data)
    }
    next()
}

//delete product
exports.deleteProduct = (req, res) => {
    let product = req.product;
    product.remove((err , deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error : "failed to delete product"
            }) 
        }
        res.json({
            message: "deletion of product is successfull"
        })
    })
}

//update product 
exports.updateProduct = (req , res) => {
    let form = new formidable.IncomingForm();

    form.keepExtensions = true;

    form.parse(req , (err , fields , file) => {
        if (err) {
            return res.status(400).json({
                error: "problem with image"
            })
        }


      
            //updation code
        let product = req.product;
        product = _.extend(product , fields)

    //handle file here
    if (file.photo) {
        if (file.photo.size > 3000000) {
            return res.status(400).json({
                error: "picture is so big"
            })
        }
        product.photo.data = fs.readFileSync(file.photo.path);
        product.photo.contentType = file.photo.type;
    }
    //save to the db
    product.save((err, product) => {
        if (err) {
            return res.status(400).json({
                error: "updation failed"
            })
        }
        res.json(product)
    })


    })
}

//product listing
exports.getAllProduct = (req , res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"

    Product.find()
    .select("-photo")
    .sort([[sortBy , "asc"]])
    .populate("category")
    .limit(limit)
    .exec((err , products) => {
        if (err) {
            return res.status(400).json({

                error : "NO product found"
            })
        }
        res.json(products)
    })
}

//listing categories
exports.getAllUniqueCategories = (req , res) => {
    Product.distinct("category" , {} , (err , category) => {
        if (err) {
            return res.status(400).json({
                error: "NO category found"
            })
        }
        res.json(category)
    })
}
//update stock
exports.updateStock = (req, res, next) => {
    let myOperations = req.body.Order.products.map(prod => {
        console.log("=========Update Stock==============",prod)
      return {
        updateOne: {
          filter: { _id: prod._id },
          update: { $inc: { stock: -prod.quantity, sold: +prod.quantity } } //Replaced count with quantity
        }
      };
    });
  
    Product.bulkWrite(myOperations, {}, (err, products) => {
      if (err) {
          console.log('err======================>',err)
        return res.status(400).json({
          error: "Bulk operation failed"
        });
      }
      next();
    });
  };
  