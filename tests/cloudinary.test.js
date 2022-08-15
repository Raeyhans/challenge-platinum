const cloudinary = require('../config/cloudinary');
const { upload } =require ('../_helpers/cloudinary-upload')
const { delImage } =require ('../_helpers/cloudinary-destroy')
const testImage = './filetest/TEST.jpg';
const fs = require ('fs')

let tespubid = '';


describe('Item Delete Endpoints',()=>{
    it("upload cloudinary", async()=>{
        const res = await upload (testImage)
        expect(typeof res.public_id).toBe('string');

        tespubid = res.public_id
<<<<<<< HEAD
    })

    it("destroy cloudinary", async()=>{
        await delImage(tespubid)
    })
})

=======
    }, 10000)

    it("destroy cloudinary", async()=>{
        await delImage(tespubid)
    }, 10000)
})
>>>>>>> 4c9541e7560bbfcefa7264fefac0981d96f70ca1
