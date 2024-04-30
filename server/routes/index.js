const express = require("express")
const router = express.Router();
const userController = require("../controllers/userController")
const { validate , userValidationRules } =require('../middlewares/validator')
const verify = require('../middlewares/verify');
const doctors = require('../controllers/doctors')

router.get("/", (req, res) => {
    res.json({msg:"Welcome to the API"})
});
router.post("/reg", [userValidationRules(),validate] ,userController.register)
router.post("/login",userController.login);
router.get('/getprofile',verify,userController.getProfile);
router.delete('/delete',verify,userController.delUser);
router.put('/update',verify,userController.upUser);
router.get('/doctors',doctors.index);

module.exports = router;      