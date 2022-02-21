import express from 'express';
let router = express.Router();

// Recipe
import * as recipeController from './recipes.controller';
// Review
import * as reviewController from './recipes.reviews.controller';

// RECIPES -------------------------------------------------------------------

// - GET -------
router.get('/', recipeController.index);
router.get('/:id', recipeController.show);

// - POST ------
router.post('/', recipeController.create);

// - PUT -------
router.put('/:id', recipeController.update);

// - DELETE ----
router.delete('/:id', recipeController.destroy);


// REVIEWS -------------------------------------------------------------------

// - GET -------
router.get('/:id/reviews/', reviewController.index);
router.get('/:id/reviews/:id', reviewController.show);

// - POST ------
router.post('/:id/reviews/', reviewController.create);

// - PUT -------
router.put('/:id/reviews/:id', reviewController.update);

// - DELETE ----
router.delete('/:id/reviews/:id', reviewController.destroy);


// EXPORT ------------
export {router};
