import db from '../../models/db';
import Helper from '../../helpers/AuthHelper';

class PasswordResetValidator {
  resetPassword(req, res, next) {
    const { email } = req.body;
    let errorMessage = {};

    db.query(`SELECT id FROM users WHERE email = '${email}'`).then(userfound => {
      if (userfound.rows.length == 0) {
        errorMessage = 'Email entered has no account';
      }

      if (!Helper.isValidEmail(email)) {
        errorMessage = 'Enter a valid email';
      }
      if (!(Object.keys(errorMessage).length === 0)) {
        return res.status(400).json(errorMessage);
      }
      return next();
    });
  }
}

export default new PasswordResetValidator();