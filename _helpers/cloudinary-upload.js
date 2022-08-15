const cloudinary = require("../config/cloudinary");
const fs = require ('fs')

const upload = async (file, array={ }) => {
  try {
    const res = await cloudinary.uploader.upload(file, {
      overwrite: true,
      use_filename: true,
      unique_filename: true,
      ...array
    })
    return res;
    
  } catch (err) {
    throw err;
  }
}

<<<<<<< HEAD
module.exports = { upload };
=======
module.exports = { upload };
>>>>>>> 4c9541e7560bbfcefa7264fefac0981d96f70ca1
