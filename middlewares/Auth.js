import jwt from 'jsonwebtoken';
import userData from '../models/User';

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


      let user = userData.find(x => x.id === decoded.userId);
      if (user == undefined) {
        return res.status(403).json({
          status: 403,
          error: 'The token provided is invalid'
        })
      }
      req.user = { id: decoded.userId };
      next();
    });
  }
}

export default Auth;