const Router = require('express')
const router = new Router()
const masterResponsedRouter = require('./masterResponsedRouter')
const serviceOrderedRouter = require('./serviceOrderedRouter')
const serviceRouter = require('./serviceRouter')
const taskOrderedRouter = require('./taskOrderedRouter')
const taskRouter = require('./taskRouter')
const userRouter = require('./userRouter')
const typeServiceRouter = require('./typeServiceRouter')
const typeUserServiceRouter = require('./typeUserServiceRouter')
const reviewRouter = require('./reviewRouter')




router.use('/user', userRouter)
router.use('/service', serviceRouter)
router.use('/task', taskRouter)
router.use('/serviceordered', serviceOrderedRouter)
// router.use('/taskordered', taskOrderedRouter)
// router.use('/masterresponsed', masterResponsedRouter)
router.use('/typeservice', typeServiceRouter)
router.use('/typeuserservice', typeUserServiceRouter)
router.use('/review', reviewRouter)
module.exports = router