import { APP_NAME, APP_YEAR, EMAIL } from "./data";
export const FORGET_PASSWORD_MESSAGE = ({
  link,
  name,
}: {
  link: string;
  name: string;
}) => {
  return {
    subject: "Reset Password",
    html: `
      <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
          }
          .email-container {
              max-width: 600px;
              margin: 20px auto;
              background: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 5px rgba(0,0,0,0.15);
              overflow: hidden;
          }
          .email-header {
              background-color: #4caf50;
              color: #ffffff;
              padding: 20px;
              text-align: center;
          }
          .email-body {
              padding: 20px;
              color: #333333;
              line-height: 1.6;
          }
          .email-body h1 {
              font-size: 24px;
              margin-bottom: 10px;
          }
          .reset-button {
              display: inline-block;
              margin: 20px 0;
              padding: 10px 20px;
              background-color: #4caf50;
              color: #ffffff;
              text-decoration: none;
              font-weight: bold;
              border-radius: 5px;
          }
          .reset-button:hover {
              background-color: #45a049;
          }
          .email-footer {
              text-align: center;
              font-size: 12px;
              color: #999999;
              padding: 10px 20px;
          }
          .email-footer a {
              color: #4caf50;
              text-decoration: none;
          }
      </style>
  </head>
  <body>
      <div class="email-container">
          <div class="email-header">
              <h1>Password Reset Request</h1>
          </div>
          <div class="email-body">
              <p>Hi ${name},</p>
              <p>We received a request to reset your password. If you made this request, please click the button below to reset your password:</p>
              <a href="${link}" class="reset-button">Reset My Password</a>
              <p>If you didn’t request this, you can safely ignore this email. Your password will remain unchanged.</p>
              <p>Thank you, <br>The ${APP_NAME} Team</p>
          </div>
          <div class="email-footer">
              <p>If you're having trouble clicking the button, copy and paste the following link into your browser:</p>
              <p><a href="${link}">${link}</a></p>
              <p>&copy; ${APP_YEAR} ${APP_NAME}. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>
  `,
  };
};
