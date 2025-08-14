interface NodemailerConfig {
  service: string;
  auth: {
    user: string | undefined;
    pass: string | undefined;
  };
  tls: {
    rejectUnauthorized: boolean;
  };
  host?: string;
  port?: number;
  secure?: boolean;
}
const configNodeMailer: NodemailerConfig = {
  service: process.env.NODE_ENV === "PRODUCTION" ? "zoho" : "gmail", // Set service based on environment
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // Ignore certificate errors (if any)
  },
};
export { configNodeMailer };
