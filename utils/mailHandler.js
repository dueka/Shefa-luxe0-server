const nodemailer = require("nodemailer");
const { mailGenerator } = require("../config/mail");
const requestHandler = require("../utils/requestHandler");
const { usersToken } = require("../utils/generateToken");
const winston = require("../config/winston");
const server = require("../api/server");

const redirectUrl = process.env.REDIRECT_URL;

/**
 * Mailer Event Emitter
 * @exports
 * @class Mailer
 * @extends EventEmitter
 */
module.exports = class Mailer {
  /**
   *
   * generates html email template for the mail
   * @param { object } options - Info needed to generate the email template
   * @param { string } options['receieverName'] Name of the recipient
   * @param { string } options['intro'] The email salutation
   * @param { string } options['text'] The text for the email
   * @param { string } options['actionBtnText'] Action button text
   * @param { string } options['actionBtnLink'] Action Button Link
   * @param { string } options['footerText'] Text on the email footer
   * @returns html
   */
  static async generateMailTemplate(options) {
    const {
      receieverName,
      intro,
      text,
      actionBtnText = "",
      actionBtnLink = "",
      footerText = null,
    } = options;
    return mailGenerator.generate({
      body: {
        name: receieverName,
        intro,
        action: {
          instructions: text,
          button: {
            color: "#33b5e5",
            text: actionBtnText,
            link: actionBtnLink,
          },
        },
        ...(footerText && { outro: footerText }),
      },
    });
  }

  /**
   * This method send mail
   * @param {string} to
   * @param {string} message
   * @param {string} subject
   */

  static async createMail({ to, message, subject }) {
    const transporter = nodemailer.createTransport({
      service: "SendGrid",
      auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_PASSWORD,
      },
    });
    const mailOptions = {
      from: "shefaluxe.com  <shefaluxe@shefaluxe.com>",
      to,
      subject,
      html: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        winston.info(error);
      }
      winston.info(info);
    });
  }

  /**
   * Send password reset token to users email
   * @param {string} token
   * @param {string} email
   */ x;
  static async forgotPassword(res, statusCode, info, user) {
    const token = usersToken(user);
    server.locals = token;
    const template = await this.generateMailTemplate({
      receieverName: user.email,
      intro: "Password Reset",
      text:
        "You recently requested to reset your password. If this wasn't you, please ignore this mail. To reset your password click the button below",
      actionBtnText: "Reset Password",
      actionBtnLink: `${process.env.REDIRECT_URL}/resetpassword`,
    });
    requestHandler.sucess(res, statusCode, info, token);
    winston.info(token);

    Mailer.createMail({
      to: user.email,
      subject: "Reset forgotPassword",
      message: template,
    });
  }

  /**
   * Send Success Message if password reset is successful
   * @param {string} email
   */

  static async resetPassword(res, statusCode, Info, email) {
    const template = await this.generateMailTemplate({
      receieverName: email,
      intro: "Password Reset",
      text:
        "Your password was reset successfully. You can now login to your account again.",
      actionBtnText: "Login",
      actionBtnLink: `${redirectUrl}/login`,
    });

    return Mailer.createMail({
      to: email,
      subject: "Password Reset Successful",
      message: template,
    });
  }

  /**
   * Send Success Message if password reset is successful
   * @param {string} token
   * @param {string} email
   */

  static async confirmEmail(user, action) {
    const token = usersToken(user);
    server.locals = token;
    const template = await this.generateMailTemplate({
      receieverName: email,
      intro: "Verify Email",
      text: "Welcome to Shefa Luxe.",
      actionBtnText: "Verify Email",
      actionBtnLink: `${process.env.REDIRECT_URL}/${action}?verified=true`,
    });
    Mailer.createMail({
      to: user.email,
      subject: "Verify Email",
      message: template,
    });
  }
};
