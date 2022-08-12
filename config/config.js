require('dotenv').config();

module.exports = {
  "local": {
    "use_env_variable": process.env.DATABASE_URL,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": process.env.DB_DIALECT,
    "logging": false
  },
  "development": {
    "use_env_variable": process.env.DATABASE_URL,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": process.env.DB_DIALECT,
    "logging": false
  },
  "test": {
    "use_env_variable": process.env.DATABASE_URL,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": process.env.DB_DIALECT,
    "logging": false
  },
  "production": {
    "use_env_variable": process.env.DATABASE_URL,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": process.env.DB_DIALECT,
    "logging": false
  },
  "emailFrom": process.env.EMAIL_FROM,
  "smtpOptions": {
      "host": process.env.EMAIL_HOST,
      "port": process.env.EMAIL_PORT,
      "auth": {
          "user": process.env.EMAIL_USER,
          "pass": process.env.EMAIL_PASS
      }
  },
  "socket": {
    "path": "/socket"
  }
}