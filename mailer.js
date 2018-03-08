import nodemailer from "nodemailer";

const from = '"Percy" <info@percy.com';

function setup() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
}

export function sendConfirmationEmail(user) {
  const transport = setup();
  const email = {
    from,
    to: user.email,
    subject: "Welcome to Percy",
    text: `
        Welcome to Percy. Please confirm your email.

        ${user.generateConfirmationUrl()}
        
        `
  };
  transport.sendMail(email);
}

export function sendResetPasswordEmail(user) {
  const transport = setup();
  const email = {
    from,
    to: user.email,
    subject: "Reset password",
    text: `
        To reset password, please follow this link:

        ${user.generateResetPasswordUrl()}
        
        `
  };
  transport.sendMail(email);
}
