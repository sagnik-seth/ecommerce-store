const User = require("../models/user")




exports.getUserById = (req, res, next, id) => {
  User.findById().exec((err,user) => {
      if (err || !user) {
          return res.status(400).json({
              error: "NO user found on DB"
          })
      }
      req.profile = user
      next()
  })
}

exports.getUser = (req, res) => {
    //TODO password
    return res.json(req.profile);
}