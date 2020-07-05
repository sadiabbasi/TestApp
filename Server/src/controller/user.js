const constant = require("../constant"),
generalService = require("../services/generalOperation"),
_ = require("lodash"),
jwt = require("jsonwebtoken"),
TableName = "User",
config = require("config"),
bcrypt = require("bcrypt"),
saltRounds = 10;

/* ************************************************************************************** */
// Function for user Sign IN
/* ************************************************************************************** */
const signIn = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    //check email exists or not
    const userExists = await generalService.getSingleRecord(TableName, {email: email});
    if(userExists) {
      //password validation with db hash
      const userValidate = await bcrypt.compare(password, userExists.password);
      if (userValidate) {
        //update token
        let token = await generateToken(userExists)
        let updateUser = await generalService.updateRecord(TableName, userExists._id, {token:token})
        delete updateUser.password;
        //send response to user
        res.send({
          status: constant.SUCCESS,
          message: "Login SuccessFully",
          data: updateUser
        });
      }
      else {
        res.send({
          status: constant.ERROR,
          message: 'Password Incorrect'
        });
      }
    }
    else {  
      res.send({
        status: constant.ERROR,
        message: 'Email address not found'
      });
    }

  } catch (error) {
    res.send({
      status: constant.ERROR,
      message: "Connectivity error try again"
    });
  }
};


/* ************************************************************************************** */
// Function for user Sign up 
/* ************************************************************************************** */
const signUp = async (req, res) => {
  try {
    const {email, username, password, role} = req.body;
    //Check email exists in db or not
    const userExists = await generalService.getSingleRecord(TableName, {email: email});
    if(userExists) {
      res.send({
        status: constant.ERROR,
        message: 'Email already exists. Please try another email address'
      });
    }
    else {  
      //create password hash of password 
      let passwordHash = await bcrypt.hash(password, saltRounds);
      //create account
      let userObj = await generalService.addRecord(TableName, {email: email, username: username, role:role, password: passwordHash})
      //create jwt token for signup customer.
      let token = await generateToken(userObj)
      //update token along with register user
      let updateUser = await generalService.updateRecord(TableName, userObj._id, {token:token})
      delete updateUser.password;
      //send response to user
      res.send({
        status: constant.SUCCESS,
        message: "User added SuccessFully",
        data: updateUser
      });
    }
  } catch (error) {
    res.send({
      status: constant.ERROR,
      message: "Connectivity error try again"
    });
  }
};

async function generateToken(userObj) {
  return jwt.sign({
    _id: userObj._id.toHexString(),
    email: userObj.email,
    username: userObj.username,
    role:userObj.role,
    date: new Date()
  },config.get("webServer.secretKey")
  ).toString();
}

module.exports = {
  signUp,
  signIn
};
