import express from 'express';
import * as controller from './users.controller';

let router = express.Router();

// GET methods
router.get('/', controller.index);
router.get('/by', controller.showBy);
router.get('/:id', controller.show);
router.get('/:id/reviews', controller.showReviews);

// POST method
router.post('/', controller.create);

// PUT method
router.put('/:id', controller.update);

// DELETE method
router.delete('/by', controller.destroyBy);
router.delete('/:id', controller.destroy);

export {router};
