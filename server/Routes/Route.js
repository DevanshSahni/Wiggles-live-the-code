const router = require("express").Router();
const { Login, Register, SecondaryRegister } = require('../Controllers/AuthController')
const { userVerification } = require('../Middlewares/AuthMiddleware')
const { profileData, UpdateProfile  } = require('../Controllers/UserData')
const { QrCode,QrData,QrSwitch } = require('../Controllers/QRController')

const multer = require("multer")
const storage = multer.diskStorage({})
const upload = multer({storage:storage})


router.post('/',userVerification)
router.post('/login', Login)
router.post('/register', Register)
router.post('/secondaryregister', upload.single("image"), SecondaryRegister)

router.post('/profiledata',userVerification,profileData)
router.post('/userdata',profileData)
router.post("/updateProfile",upload.single("image"),UpdateProfile);

router.post('/qrData',QrData)
router.post('/qrSwitch',QrSwitch)
router.post('/qr-code',userVerification,QrCode) 

module.exports = router;