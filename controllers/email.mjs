/* eslint-disable max-len */
import nodeMailer from 'nodemailer';
import dotenv from 'dotenv';

// ... expose secret keys ... //
dotenv.config();

// definte account to use to send email
const transporter = nodeMailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

/**
 * @desc to send email to recipient
 * @param {Object} mailOptions - Object containing email info
 * @param {string} mailOptions.from - Name of sender
 * @param {string} mailOptions.to - Email of recipient
 * @param {string} mailOptions.subject - Subject / title of email
 * @param {string} mailOptions.text - Content in plain text if HTML not supported
 * @param {string} mailOptions.html- Content in HTML format
 * @param {Array} mailOptions.attachements - Array of objects {path: 'path url'}
 */
export default function sendEmail(mailOptions) {
  return transporter.sendMail(mailOptions);
}
