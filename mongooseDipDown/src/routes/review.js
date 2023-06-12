import express from 'express';
import { reviewController } from '../controller/reviewController.js';
import { only } from '../middlewares/authontication.js';
import { isLoggedIn } from '../middlewares/authorization.js';

const routes = express.Router({mergeParams:true});

routes.use(isLoggedIn)

routes.get('/allReviews',reviewController.getAllReviews)
routes.post('/createReview',only('user','admin'),reviewController.createReview)
routes.patch('/updateReview/:id',only('user'),reviewController.updateReview)
routes.delete('/delete/:id',reviewController.deleteReview)

export default routes