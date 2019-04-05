import Helper from '../../helpers/AuthHelper';
import validator from 'validator';
import db from '../../models/user';

class AuthValidator {
  Signup(req, res, next) {
    const { firstName, lastName, email, password } = req.body,
      errorMessage = {};

    if (firstName === undefined || lastName === undefined || password === undefined) {
      return res.status(400).json({
        status: 400,
        error: 'All or some of the field is/are undefined'
      });
    }
    //Search through dummy database to check if email exits
    let emailExit = db.find(x => x.email === email);

    if (emailExit != undefined) {
      return res.status(409).json({
        status: 409,
        error: 'The email you entered already exist'
      });
    }
    if (!validator.isLength(firstName, { min: 2, max: 20 })) {
      errorMessage.firstName = 'Fullname must not be less than 3 or above 20 characters';
    }
    if (!validator.isLength(lastName, { min: 2, max: 20 })) {
      errorMessage.lastName = 'Lastname must not beless than 3 or above 20 characters';
    }
    if (firstName.search(/^[a-zA-Z]*$/) === -1) {
      errorMessage.firstName = 'Fullname should be all alphalbet';
    }
    if (lastName.search(/^[a-zA-Z]*$/) === -1) {
      errorMessage.lastName = 'Lastname should be all alphalbet';
    }

    if (!Helper.isValidEmail(email)) {
      errorMessage.email = 'Please enter a valid email';
    }
    if (!validator.isLength(password, { min: 7, max: 20 })) {
      errorMessage.password = 'password must not be less than 7 or above 20 characters';
    }
    if (!(Object.keys(errorMessage).length === 0)) {
      return res.status(400).json(errorMessage);
    }
    return next();
  }

}

export default new AuthValidator();
