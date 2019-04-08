import db from '../models/db';
import randomstring from 'randomstring';
import nodemailer from 'nodemailer';


class ResetPasswordController {
  resetPassword(req, res) {
    const { email } = req.body;
    const token = randomstring.generate();
    const url = `http://localhost:3000/auth/reset_password/${token}`;
    const emailMailer = process.env.MAILER_EMAIL_ID || 'jo.mydiary@gmail.com';
    const password = process.env.MAILER_PASSWORD || 'jo.mydiary2019';

    const transporter = nodemailer.createTransport({
      service: process.env.MAILER_SERVICE_PROVIDER || 'gmail',
      auth: {
        user: emailMailer,
        pass: password
      }
    });

    const mailOptions = {
      from: emailMailer,
      to: `${email}`,
      subject: 'Password help has arrived!',
      html: `<h3> Dear</h3 >
      <p>You requested for a password reset, kindly use this link: ${url} to reset your password</p>.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        throw error;
      } else {
        res.status(200).json({
          status: 200,
          data: 'Kindly check your email for further instructions'
        });
      }
    });
  }
}

export default new ResetPasswordController();