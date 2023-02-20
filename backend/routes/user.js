const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');


//Route que va suivre l'API quand elle est appellée lors de la connexion/inscription
router.post('/signup',userCtrl.signup);
router.post('/login',userCtrl.login);

module.exports = router;