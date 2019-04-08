import express from 'express';
import AuthController from '../../controllers/AuthController';
import AuthValidator from '../../middlewares/validators/AuthValidator';
import PasswordResetValidator from '../../middlewares/validators/PasswordResetValidator'

const router = express.Router();

router.route('/auth/signup/')
  .post(AuthValidator.Signup, AuthController.signUp);
router.route('/auth/forgot_password')
  .post(PasswordResetValidator.resetPassword)

export default router;