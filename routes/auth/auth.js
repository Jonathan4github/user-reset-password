import express from 'express';
import AuthController from '../../controllers/AuthController';
import AuthValidator from '../../middlewares/validators/AuthValidator';
import PasswordResetValidator from '../../middlewares/validators/PasswordResetValidator';
import ResetPasswordController from '../../controllers/ResetPasswordController';

const router = express.Router();

router.route('/auth/signup/')
  .post(AuthValidator.Signup, AuthController.signUp);
router.route('/auth/forgot_password')
  .post(PasswordResetValidator.resetPassword, ResetPasswordController.forgotPassword);

export default router;