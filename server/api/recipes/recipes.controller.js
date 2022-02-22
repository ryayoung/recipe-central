'use strict';

import {Review, Recipe} from './recipes.model';

// Use this instead of ObjectId.isValid(id)
import { isValidObjectId } from '../util/validation/isValidObjectId';

// Find all: GET '/'
export function index(req, res) {
    Recipe.find()
        .exec()
        .then(function(recipes) {
            res.json({ recipes });
        })
        .catch(function(err) {
            res.status(500);
            res.send(err);
        });
}

// Find one recipe: GET '/:id'
export function show(req, res) {
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
            /*
            findById will return null if the object was not found
            This if check will evaluate to false for a null recipe
            */
            if(existingRecipe) {
                // Recipe was found by Id
                res.status(200);
                res.json(existingRecipe);
            } else {
                // Recipe was not found
                res.status(404);
                res.json({message: 'Not Found'});
            }
        })
        .catch(function(err) {
            res.status(400);
            res.send(err);
        });
}

// Create new recipe: POST '/'
export function create(req, res) {
    let recipe = req.body;
    recipe.reviews = [];

    Recipe.create(recipe)
        .then(function(createdRecipe) {
            res.status(201);
            res.json(createdRecipe);
        })
        .catch(function(err) {
            res.status(400);
            res.send(err);
        });
}

// Update existing recipe: PUT '/:id'
export function update(req, res) {
    // ID must be valid mongodb ObjectId format
    if (!isValidObjectId(req.params.id)) {
        res.status(400);
        res.send('Error: Invalid ID format: "' + req.params.id + '"')
        return
    }
    // Start by trying to find the recipe by its id
    Recipe.findById(req.params.id)
        .exec()
        // Update recipe
        .then(function(existingRecipe) {
            // If recipe exists, update all fields of the object
            if(existingRecipe) {
                // DO NOT update reviews
                existingRecipe.name = req.body.name;
                existingRecipe.description = req.body.description;
                existingRecipe.image_url_https = req.body.image_url_https;
                existingRecipe.prep_time = req.body.prep_time;
                existingRecipe.cook_time = req.body.cook_time;
                existingRecipe.directions = req.body.directions;
                existingRecipe.ingredients = req.body.ingredients;

                return existingRecipe.save();

            } else {
                // Recipe was not found
                return existingRecipe;
            }
        })
        .then(function(savedRecipe) {
            if(savedRecipe) {
                res.status(200);
                res.json(savedRecipe);
            } else {
                res.status(404);
                res.json({message: 'Not Found'});
            }
        })
        .catch(function(err) {
            res.status(400);
            res.send(err);
        });
}

// Remove a recipe: DELETE '/:id'
export function destroy(req, res) {
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
            if(existingRecipe) {
                return Promise.all([
                    existingRecipe.reviews.remove(),
                    existingRecipe.remove()
                ]);
            } else {
                return existingRecipe;
            }
        })
        // Delete was successful
        .then(function(deletedRecipe) {
            if(deletedRecipe) {
                res.status(204).send();
            } else {
                // Recipe was not found
                res.status(404);
                res.json({message: 'Not Found'});
            }
        })
        // Recipe delete failed
        .catch(function(err) {
            res.status(400);
            res.send(err);
        });
}

