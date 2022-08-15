const cloudinary = require("../config/cloudinary");
const delImage = async (publicID)=>{
    try{
      const dest = await cloudinary.uploader.destroy(publicID);
  
      return dest;
    }
    catch(err){
<<<<<<< HEAD
    throw err;
=======
      throw err;
>>>>>>> 4c9541e7560bbfcefa7264fefac0981d96f70ca1
    }
  }

module.exports = { delImage };