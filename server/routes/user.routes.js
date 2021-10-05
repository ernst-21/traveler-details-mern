const express = require('express');
const userCtrl = require('../controllers/user.controller');

const router = express.Router();

router.route('/api/users').post(userCtrl.create);
router.route('/api/email').post(userCtrl.checkEmail);

module.exports = router;
