const Router = require('express');
const router = new Router()
const serviceOrderedController = require('../controllers/serviceOrderedController');


router.post('/',serviceOrderedController.createServiceOrdered)
router.get('/master/:id',serviceOrderedController.getServiceOrderedMaster)
router.get('/customer/:id',serviceOrderedController.getServiceOrderedCustomer)
router.delete('/delete/:id',serviceOrderedController.deleteServiceOrdered)
router.put('/do/',serviceOrderedController.doServiceOrdered)
router.get('/historyservice/:id',serviceOrderedController.historyServiceOrdered)
router.get('/historyservicemaster/:id',serviceOrderedController.historyServiceOrderedMaster)
module.exports=router