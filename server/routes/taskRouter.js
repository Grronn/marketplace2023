const Router = require('express');
const router = new Router()
const taskController = require('../controllers/taskController');

router.post('/',taskController.createTask)

router.get('/alltasks/',taskController.getAllTask)

router.get('/:id',taskController.getTask)
router.post('/respond/:id',taskController.respondTask)
router.get('/masterresponsed/:id',taskController.getMasterResponsed)
router.get('/taskorderedcustomer/:id',taskController.getTaskOrderedCustomer)
router.post('/createorderedtask/:id',taskController.createOrderedTask)
router.get('/historytaskcustomer/:id',taskController.getHistoryTaskCustomer)
router.get('/taskorderedmaster/:id',taskController.getTaskOrderedMaster)
router.get('/historytaskmaster/:id',taskController.getHistoryTaskMaster)
router.delete('/deletetaskwhenordered/:id',taskController.deleteTaskWhenOrdered)
router.put('/dotaskordered/:id',taskController.doTaskOrdered)
// router.get('/:id')

module.exports=router