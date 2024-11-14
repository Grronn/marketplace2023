const Router = require('express');
const router = new Router()
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware')
const checkrole = require('../middleware/checkRoleMiddleware')
const typeUserServiceController = require('../controllers/typeUserServiceController');


router.get('/idtype/:id',typeUserServiceController.getTypesUserServicesid)
// router.get('/name/:id',typeUserServiceController.getTypesUserServicesname)
router.post('/',typeUserServiceController.addTypesUserServices)

router.get('/:id')


module.exports=router