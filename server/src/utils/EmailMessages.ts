import { APP_NAME, APP_YEAR, EMAIL } from "./data";
export const VERIFY_EMAIL_MESSAGE = ({ link }: { link: string }) => {
  return {
    subject: "🎉 One quick step to get started!",
    html: `
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
            
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
  
            body {
              font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              background-color: #fafafa;
              margin: 0;
              padding: 20px;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
  
            .email-wrapper {
              background-color: #fafafa;
              padding: 20px;
            }
  
            .email-container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 24px;
              overflow: hidden;
              box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
            }
  
            .email-header {
              background: linear-gradient(135deg, #7c3aed 0%, #c026d3 100%);
              padding: 48px 40px;
              text-align: center;
            }
  
            .logo {
              margin-bottom: 24px;
            }
  
            .header-title {
              color: #ffffff;
              font-size: 28px;
              font-weight: 700;
              margin: 0;
              letter-spacing: -0.5px;
              line-height: 1.3;
            }
  
            .header-subtitle {
              color: rgba(255, 255, 255, 0.9);
              font-size: 16px;
              margin-top: 12px;
              font-weight: 500;
            }
  
            .email-content {
              padding: 48px 40px;
            }
  
            .greeting {
              font-size: 22px;
              font-weight: 600;
              color: #18181b;
              margin-bottom: 20px;
            }
  
            .message {
              color: #3f3f46;
              font-size: 16px;
              line-height: 1.7;
              margin-bottom: 32px;
            }
  
            .verification-code {
              background: linear-gradient(135deg, #faf5ff 0%, #f5f3ff 100%);
              border-radius: 16px;
              padding: 32px;
              text-align: center;
              margin-bottom: 32px;
              border: 1px solid rgba(124, 58, 237, 0.1);
            }
  
            .code {
              font-family: 'SF Mono', 'Roboto Mono', monospace;
              font-size: 36px;
              font-weight: 700;
              color: #7c3aed;
              letter-spacing: 6px;
              margin: 0;
              text-shadow: 0px 1px 2px rgba(124, 58, 237, 0.1);
            }
  
            .code-label {
              font-size: 14px;
              color: #6b7280;
              margin-top: 12px;
              font-weight: 500;
            }
  
            .expiry-notice {
              background-color: #fef2f2;
              border: 1px solid rgba(239, 68, 68, 0.1);
              padding: 16px 20px;
              border-radius: 12px;
              margin-bottom: 32px;
              display: flex;
              align-items: center;
              gap: 12px;
            }
  
            .expiry-icon {
              color: #ef4444;
              font-size: 20px;
            }
  
            .expiry-text {
              color: #991b1b;
              font-size: 14px;
              margin: 0;
              font-weight: 500;
            }
  
            .help-section {
              background-color: #f8fafc;
              border-radius: 12px;
              padding: 20px;
              margin-bottom: 32px;
            }
  
            .help-title {
              font-size: 16px;
              font-weight: 600;
              color: #0f172a;
              margin-bottom: 8px;
            }
  
            .help-text {
              color: #475569;
              font-size: 14px;
              line-height: 1.6;
            }
  
            .support-link {
              color: #7c3aed;
              text-decoration: none;
              font-weight: 600;
              transition: color 0.15s ease;
            }
  
            .support-link:hover {
              color: #6d28d9;
            }
  
            .email-footer {
              background-color: #f8fafc;
              padding: 32px 40px;
              text-align: center;
              border-top: 1px solid #e2e8f0;
            }
  
            .social-links {
              margin-bottom: 24px;
              display: flex;
              justify-content: center;
              gap: 16px;
            }
  
            .social-link {
              color: #64748b;
              text-decoration: none;
              font-size: 14px;
              font-weight: 500;
            }
  
            .footer-text {
              color: #94a3b8;
              font-size: 14px;
              margin-bottom: 16px;
              font-weight: 500;
            }
  
            .footer-links {
              color: #64748b;
              font-size: 14px;
            }
  
            .footer-link {
              color: #64748b;
              text-decoration: none;
              margin: 0 8px;
              font-weight: 500;
              transition: color 0.15s ease;
            }
  
            .footer-link:hover {
              color: #7c3aed;
            }
  
            .address {
              color: #94a3b8;
              font-size: 13px;
              margin-top: 24px;
              line-height: 1.5;
            }
  
            @media only screen and (max-width: 600px) {
              .email-header {
                padding: 40px 24px;
              }
  
              .email-content {
                padding: 40px 24px;
              }
  
              .header-title {
                font-size: 24px;
              }
  
              .greeting {
                font-size: 20px;
              }
  
              .code {
                font-size: 32px;
                letter-spacing: 4px;
              }
            }
  
            /* Button Style */
            .button {
              display: inline-block;
              padding: 12px 24px;
              background-color: #7c3aed;
              color: white;
              font-size: 16px;
              font-weight: 600;
              text-align: center;
              text-decoration: none;
              border-radius: 8px;
              margin-top: 20px;
              transition: background-color 0.3s;
            }
  
            .button:hover {
              background-color: #6d28d9;
            }
          </style>
        </head>
        <body>
          <div class="email-wrapper">
            <div class="email-container">
              <div class="email-header">
                <div class="logo">
                  <!-- Modern minimalist logo -->
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="48" rx="12" fill="white" fill-opacity="0.1"/>
                    <path d="M24 12L35.2583 17.5V28.5L24 34L12.7417 28.5V17.5L24 12Z" stroke="white" stroke-width="2.5"/>
                  </svg>
                </div>
                <h1 class="header-title">Almost there! 🚀</h1>
                <p class="header-subtitle">Let's verify your email to get you started</p>
              </div>
  
              <div class="email-content">
                <h2 class="greeting">Hey there! 👋</h2>
                <p class="message">
                  Exciting to have you on board! To keep your account secure and get you up and running, we just need to make sure this email address belongs to you.
                </p>
  
                <div class="verification-code">
                  <a href="${link}" class="button">Verify Your Email</a>
                </div>
  
                <div class="expiry-notice">
                  <span class="expiry-icon">⏰</span>
                  <p class="expiry-text">
                    This code expires in 15 minutes for your security.
                  </p>
                </div>
  
                <div class="help-section">
                  <h3 class="help-title">Need help?</h3>
                  <p class="help-text">
                    If you're having trouble or didn't request this email, please let us know at <a href="mailto:help@yourapp.com" class="support-link">help@yourapp.com</a>. We're always here to help!
                  </p>
                </div>
              </div>
  
              <div class="email-footer">
                <div class="social-links">
                  <a href="https://twitter.com/yourapp" class="social-link">Twitter</a>
                  <a href="https://instagram.com/yourapp" class="social-link">Instagram</a>
                  <a href="https://linkedin.com/company/yourapp" class="social-link">LinkedIn</a>
                </div>
                
                <p class="footer-text">© ${new Date().getFullYear()} YourApp. All rights reserved.</p>
                
                <div class="footer-links">
                  <a href="https://yourapp.com/privacy" class="footer-link">Privacy</a>
                  <span style="color: #cbd5e1">•</span>
                  <a href="https://yourapp.com/terms" class="footer-link">Terms</a>
                  <span style="color: #cbd5e1">•</span>
                  <a href="https://yourapp.com/preferences" class="footer-link">Preferences</a>
                </div>
  
                <p class="address">
                  YourApp Inc. • 123 Startup Street • San Francisco, CA 94107
                </p>
              </div>
            </div>
          </div>
        </body>
      </html>
      `,
  };
};
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
