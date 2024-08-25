require('dotenv').config(); 

const config = {
  port: process.env.PORT ?? 3000,
  db: {
    uri: process.env.MONGO_URI ?? 'mongodb://localhost:27017/devalShoppingCart'
  },
  email: {
    service: process.env.EMAIL_SERVICE ?? 'Gmail',
    host: process.env.EMAIL_HOST ?? "smtp.gmail.com",
    user: process.env.EMAIL_USER ?? 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS ?? 'your-email-password'
  },
  google: {
    secret: process.env.GOOGLE_CLIENT_SECRET,
    clientId: process.env.GOOGLE_CLIENT_ID
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? 'your_jwt_secret_key',
    expiresIn: process.env.JWT_EXPIRES_IN ?? '1h'
  },
  messageSecret: process.env.MSG_SECRET ?? "your message secret_key",
  session: {
    secret: process.env.SESSION_SECRET ?? 'your_session_secret_key',
    resave: false,
    saveUninitialized: true
  },
  env: {
    dev: process.env.NODE_ENV === 'development',
    prod: process.env.NODE_ENV === 'production'
  },
  appUris: {
    clientUri: process.env.CLIENT_URL ?? "http://localhost:5173",  
    serverUri: process.env.SERVER_URL ?? "http://localhost:8000"   
  }
};

module.exports = config;
