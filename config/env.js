require ('dotenv').config();

exports.CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
exports.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
exports.CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET

exports.DB_USER = process.env.DB_USER
exports.DB_PASS = process.env.DB_PASS
exports.DB_NAME = process.env.DB_NAME
exports.DB_HOST = process.env.DB_HOST
exports.DB_PORT = process.env.DB_PORT
exports.DB_DIALECT = process.env.DB_DIALECT

exports.EMAIL_FROM = process.env.EMAIL_FROM
exports.EMAIL_HOST = process.env.EMAIL_HOST
exports.EMAIL_PORT = process.env.EMAIL_PORT
exports.EMAIL_USER = process.env.EMAIL_PORT
exports.EMAIL_PASS = process.env.EMAIL_PASS