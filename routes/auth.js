const express = require('express')
const { check,validationResult } = require('express-validator');
const router = express.Router()
const {signout,signup,signin} = require('../controllers/auth')


router.post("/signup",[ 
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 5 char").isLength({ min: 5 })
],signup)

router.post("/signin",[ 
    check("email", "email is required").isEmail(),
    check("password", "password field is required").isLength({ min: 5 })
],
signin)

router.get("/signout",signout)

module.exports = router