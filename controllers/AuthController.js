import userData from '../models/user';
import Helper from '../helpers/AuthHelper';
import dotenv from 'dotenv';

dotenv.config();

class AuthController {
  /**
   * Method for creating User
   * @static
   * @param {request} req
   * @param {response} res
   * @return {obj} return json object user.
   */
  signUp(req, res) {
    const { firstName, lastName, email, password } = req.body;
    const hashPassword = Helper.hashPassword(password);
    const newUser = {
      id: userData.length + 1,
      firstName,
      lastName,
      email,
      password: hashPassword
    }

    userData.push(newUser);
    const token = Helper.generateToken(newUser.id);
    req.token = token;
    return res.status(201)
      .json({
        status: 201,
        data: [{
          token: token
        }]
      });
  }
}

export default new AuthController;