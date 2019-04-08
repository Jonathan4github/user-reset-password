import db from '../models/db';
import moment from 'moment';
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

    const createQuery =
      'INSERT INTO users (firstName, lastName, email, password, token, isVerified, created_date, modified_date)  VALUES($1, $2, $3, $4, $5, $6, $7, $8) returning *';
    const values = [firstName, lastName, email, hashPassword, null, false, moment(new Date()), moment(new Date())];

    db.query(createQuery, values, (error, user) => {
      if (error) {
        return res.status(500).json({
          status: 'Failed',
          message: error
        });
      }
      const token = Helper.generateToken(user.rows[0].id);
      req.token = token;
      return res.status(201).json({
        message: 'Sign up Sucessfully',
        status: 201,
        data: [{
          token: token
        }]
      });
    });
  }
  /**
   * Method for signing in User
   * @static
   * @param {request} req
   * @param {response} res
   * @return {obj} return json object.
   */

  signIn(req, res) {
    const { email, password } = req.body;
    const sql = `SELECT * FROM users WHERE email = '${email}'`;
    db.query(sql)
      .then(user => {
        if (user.rows[0]) {
          const isPassword = Helper.comparePassword(user.rows[0].password, password);
          if (isPassword) {
            const token = Helper.generateToken(user.rows[0].id);
            req.token = token;
            return res.status(200).json({
              status: 'Success',
              message: 'Sucessful login',
              data: {
                id: user.rows[0].id,
                fullname: user.rows[0].fullname,
                email: user.rows[0].email,
                image: user.rows[0].image
              },
              token
            });
          }
        }
        return res.status(401).json({
          status: 401,
          message: 'The credentials you provided is incorrect'
        });
      })
      .catch(err => {
        res.status(500).json({
          status: 'Failed',
          message: err.message
        });
      });
  }
}

export default new AuthController;