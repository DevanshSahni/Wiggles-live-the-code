const router = require("express").Router();
const { Login, Register, SecondaryRegister } = require('../Controllers/AuthController')
const { userVerification } = require('../Middlewares/AuthMiddleware')
const { profileData, UpdateProfile, UpdateVaccinations  } = require('../Controllers/UserData')
const { QrCode,UpdateMessage } = require('../Controllers/QRController')

const multer = require("multer")
const storage = multer.diskStorage({})
const upload = multer({storage:storage})


router.post('/',userVerification)
router.post('/login', Login)
router.post('/register', Register)
router.post('/secondaryregister', upload.single("image"), SecondaryRegister)

router.post('/profiledata',userVerification,profileData)
router.post('/updateProfile',upload.single("image"),UpdateProfile);
router.post('/updateVaccinations',UpdateVaccinations);


router.post('/qr-code',QrCode) 
router.put('/update-message/:objectId',UpdateMessage)  

module.exports = router;