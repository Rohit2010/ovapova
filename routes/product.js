const express = require("express");
const router = express.Router();

const {getProductById,
     createProduct,
        getProduct ,
       photo ,
        updateProduct ,
         deleteProduct ,
         getAllProduct,
         getAllUniqueCategories} = require ("../controllers/product");
const {getUserById} = require ("../controllers/user");
const {isAuthenticated, isAdmin, isSignedIn} = require ("../controllers/auth");

//params
router.param("userId" , getUserById);
router.param("productId" , getProductById);

//actaul routes
//create product
router.post("/product/create/:userId",  isSignedIn,isAuthenticated,isAdmin,createProduct)

//read route
router.get("/product/:productId" , getProduct);
router.get("/product/photo/:productId" , photo)

//delete route
router.delete("/product/:productId/:userId" , isSignedIn , isAuthenticated, isAdmin , deleteProduct)

//update route
router.put("/product/:productId/:userId" , isSignedIn , isAuthenticated, isAdmin , updateProduct)

//product listing route
router.get("/products" , getAllProduct)

//listing category
router.get("/product/categories" , getAllUniqueCategories)

module.exports = router;