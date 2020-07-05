const mongoose = require('mongoose');
const _ = require('lodash');

const authenticate = (req, res, next) => {
    const token = req.header('x-auth');
    const User = mongoose.model('User');

    User.findByToken(token).then((user) => {
      if (!user) {
        return Promise.reject();
      }
  
      req.user = _.pick(user,['_id','email','companyId','departmentId','designationsId','role']);
      req.token = token;
      next();
    }).catch((e) => {
      res.status(401).send();
    });
  };
  
  module.exports = {authenticate};