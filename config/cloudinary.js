const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: "challenge-platinum",
  api_key: "225313815671598",
  api_secret: "stW9tIhcdUgv8HVI4mv7NOl5vag"
})

module.exports = cloudinary;