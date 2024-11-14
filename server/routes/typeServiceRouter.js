const Router = require('express');
const router = new Router()
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware')
const checkrole = require('../middleware/checkRoleMiddleware')
const typeServiceController = require('../controllers/typeServiceControler');


router.post('/')

router.get('/',typeServiceController.getAll)

router.get('/:id')


module.exports=router