import db from '../models/db';
import randomstring from 'randomstring';
import moment from 'moment';
import nodemailer from 'nodemailer';


class ResetPasswordController {
  forgotPassword(req, res) {
    const { email } = req.body;
    const token = randomstring.generate();
    const url = `http://localhost:3000/auth/reset_password/${token}`;
    const emailMailer = process.env.MAILER_EMAIL_ID || 'jo.mydiary@gmail.com';
    const password = process.env.MAILER_PASSWORD || 'jo.mydiary2019';

    db.query(`SELECT firstName FROM users WHERE email = '${email}'`).then(user => {
      const receiver = user.rows[0].firstname;

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
        html: `<h3> Dear ${receiver},</h3>
        <p>You requested for a password reset, kindly use this link: ${url} to reset your password</p>.`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          throw error;
        } else {
          const sql = 'UPDATE users SET token = $1,  modified_date = $2  WHERE email = $3';
          const params = [token, moment(new Date()), email];
          db.query(sql, params, (err, result) => {
            if (err) {
              return res.status(500).json({
                status: 500,
                message: err.message
              });
            }
            return res.status(200).json({
              status: 200,
              data: 'Kindly check your email for further instructions'
            });
          });
        }
      });
    });
  }


}

export default new ResetPasswordController();