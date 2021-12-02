const express = require("express");
const router = express.Router();
const { stripepayment } = require("../controllers/stripe");

router.post(
    "/stripe", stripepayment

)
module.exports = router;
