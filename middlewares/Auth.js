import jwt from 'jsonwebtoken';
import db from '../models/db';

const Auth = {
  /**
   * Method to verify token
   * @param {request} req
   * @param {response} res
   * @param {}
   */

  verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401)
          .json({
            status: 401,
            error: err.message + ' Invalid user'
          })
      }

      const text = 'SELECT * FROM users WHERE id = $1';
      db.query(text, [decoded.userId]).then((user) => {
        if (!user.rows[0]) {
          return res.status(403)
            .json({
              status: 403,
              error: 'The token provided is invalid'
            });
        }
        req.user = { id: decoded.userId };
        next();
      }).catch(err => res.status(403).json({
        status: 'Failed',
        message: err.message
      }));
    });
  }
}

export default Auth;