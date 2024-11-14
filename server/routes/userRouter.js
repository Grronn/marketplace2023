const Router = require('express');
const router = new Router()
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware')
const checkrole = require('../middleware/checkRoleMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/', userController.getAll)
router.get('/:id', userController.getOne)
router.put('/becomemaster/:id', checkrole('USER'), userController.becomeMaster)
router.post('/createtimesheet/:id', checkrole('MASTER'), userController.createTimesheet)
router.get('/gettimesheet/:id', checkrole('MASTER'), userController.getTimesheet)
module.exports=router