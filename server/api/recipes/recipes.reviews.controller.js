'use strict';
import mongoose from 'mongoose';
let ObjectId = mongoose.Types.ObjectId;

import {Recipe, Review} from './recipes.model';
import {User} from '../users/users.model';

// To use instead of ObjectId.isValid(id)
import { isValidObjectId } from '../util/validation/isValidObjectId';

// Find all: GET '/:id/reviews/'
export function index(req, res) {
    // ID must be valid mongodb ObjectId format
    if (!isValidObjectId(req.params.id)) {
        res.status(400);
        res.send('Error: Invalid ID format: "' + req.params.id + '"')
        return
    }
    Recipe.findById(req.params.id)
        .populate('reviews')
        .exec()
        .then(function(existingRecipe) {
            if (existingRecipe) {
                res.status(200);
                res.json(existingRecipe.reviews);
            } else {
                res.status(404);
                res.json({message: 'Not found'});
            }
        })
        .catch(function(err) {
            res.status(400);
            res.send(err);
        });
}

// Find one review: GET '/:id/reviews/:id'
export function show(req, res) {
    return true
}

// Create new review: POST '/:id/reviews/'
export function create(req, res) {
    let review = req.body;
    review.user_id = new ObjectId(review.user_id);

    let recipe = null

    Recipe.findById(req.params.id)
        .then(function(existingRecipe) {
            if (existingRecipe) {
                recipe = existingRecipe;
                return existingRecipe;
            }
        })
        .then(function(existingRecipe) {
            return [existingRecipe, User.findById(review.user_id).exec()];
        })
        .then(function(existingRecipe, user) {
            if (user) {
                return [existingRecipe, user._id];
            }
        })
        .then(function(existingRecipe, userId) {
            Review.create(review)
                .then(function(createdReview) {
                    recipe.reviews.push(createdReview._id);
                    return [recipe.save(), createdReview]
                })
                .then(function(savedObjects) {
                    if (savedObjects) {
                        res.status(201);
                        res.json(savedObjects[1]);
                    } else {
                        res.status(404);
                        res.json({message : 'User or recipe not found'});
                    }

                })})
                .catch(function(err) {
                    res.status(400);
                    res.send(err);
                })
}


// Update existing review: PUT '/:id/reviews/'
export function update(req, res) {
    let reviewId = req.params.id;

    Review.findById(reviewId)
        .exec()
        .then(function(existingReview) {
            if (existingReview) {
                existingReview.text = req.body.text;
                existingReview.rating = req.body.rating;

                return existingReview.save();
            } else {
                return existingReview;
            }
        })
        .then(function(savedReview) {
            if (savedReview) {
                res.status(200);
                res.json(savedReview);
            } else {
                res.status(404);
                res.json({message : 'Not found'});
            }
        })
        .catch(function(err) {
            res.status(400);
            res.send(err);
        });
}
 

// Remove existing review: DELETE '/:id/reviews/'
export function destroy(req, res) {
    let recipeId = req.params.id;
    let reviewId = req.query.id;

    Review.findById(reviewId)
        .then(function(existingReview) {
            if (existingReview) {
                return existingReview.remove()
            } else {
                return existingReview
            }
        })
        .then(function(existingReview) {
            Recipe.findOneAndUpdate({_id : recipeId}, {$pull: {reviews : reviewId}})
                .then(function(updatedRecipe) {
                    if (updatedRecipe) {
                        res.status(200);
                        res.json(updatedRecipe);
                    } else {
                        res.status(404);
                        res.json({message : 'Not found'});
                    }
                })
        })
        .catch(function(err) {
            res.status(400);
            res.send(err);
        });
}

