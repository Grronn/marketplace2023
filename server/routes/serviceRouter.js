const Router = require('express');
const router = new Router()
const serviceController = require('../controllers/serviceController');

router.post('/',serviceController.createService)

router.get('/', serviceController.getServicesAll)

router.get('/:id',serviceController.getServicesMaster)


module.exports=router