const Router = require('express');
const router = new Router()
const reviewController = require('../controllers/reviewController');

router.post('/', reviewController.createReview)
router.put('/update/:id', reviewController.createReviewUpdate)
router.get('/:id', reviewController.getReview)

router.get('/reviewcount/:id', reviewController.getReviewCount)
router.get('/reviewaverage/:id', reviewController.getReviewAverage)

// router.get('/:id',serviceController.getServicesMaster)


module.exports=router