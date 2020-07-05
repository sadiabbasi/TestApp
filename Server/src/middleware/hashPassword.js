const bcrypt = require("bcrypt");

const bcryptPassword = (req, res, next) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      req.body.password = hash;
      next();
    });
  });
};

module.exports = { bcryptPassword };
