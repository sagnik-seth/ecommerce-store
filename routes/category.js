const express = require('express')
const router = express.Router()

const { getcategorybyId, createCategory, getCategory, getAllCategory, updateCategory,removeCategory} = require("../controllers/category")
const { isAdmin, isSignedIn, isAuthenticated } = require("../controllers/auth")
const { getUserById } = require("../controllers/user")

//param
router.param("userId", getUserById)
router.param("categoryId", getcategorybyId)


//routers
router.post("/category/create/:userId", isSignedIn, isAuthenticated, isAdmin, createCategory)

router.get("/category/:caetegoryId", getCategory)
router.get("/categoryies", getAllCategory)

router.put("/category/:caetegoryId/:userId", isSignedIn, isAuthenticated, isAdmin, updateCategory)


router.delete("/category/:caetegoryId/:userId", isSignedIn, isAuthenticated, isAdmin, removeCategory)

module.exports = router
