import nodemailer from 'nodemailer';
import 'dotenv/config';

const { MAIL_USER, MAIL_PWD, RESET_CALLBACK } = process.env;

export const sendMail = (email: string, mess: string): void => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: MAIL_USER,
      pass: MAIL_PWD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    to: email,
    subject: 'Your password reset link',
    text: `${RESET_CALLBACK}?token=${mess}`,
    html: `<p>Someone requested a password reset for your account. If this was not you,
    please disregard this email. If you'd like to continue click the link below.</p>
    <p>This link will expire in 5 minutes.</p>
    <a href="${RESET_CALLBACK}?token=${mess}"><button>Reset your password</button></a>`,
  };
  transporter.sendMail(mailOptions);
};
