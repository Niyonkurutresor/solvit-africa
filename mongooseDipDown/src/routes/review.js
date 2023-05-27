import express from 'express';
import { reviewController } from '../controller/reviewController.js';
import { only } from '../middlewares/authontication.js';
import { isLoggedIn } from '../middlewares/authorization.js';

const routes = express.Router({mergeParams:true});

routes.get('/allReviews',reviewController.getAllReviews)
routes.post('/createReview',isLoggedIn,only('user'),reviewController.createReview)

export default routes