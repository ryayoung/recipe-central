'use strict';

import {Review, Recipe} from './recipes.model';

// Find all Recipes
export function index(req, res) {
  Recipe.find()
    .exec()
    .then(function(recipes) {
      res.json({
        recipes
      });
    })
    .catch(function(err) {
      res.status(500);
      res.send(err);
    });
}

// Find details for one Recipe
export function show(req, res) {
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

// Create a new recipe
export function create(req, res) {
  let recipe = req.body;
  recipe.reviews = [];

  Recipe.create(recipe)
    // Recipe saved successfully
    .then(function(createdRecipe) {
      res.status(201);
      res.json(createdRecipe);
    })
    // An error was encountered during saving
    .catch(function(err) {
      res.status(400);
      res.send(err);
    });
}

// Update a recipe
export function update(req, res) {
  // Start by trying to find the recipe by its id
  Recipe.findById(req.params.id)
    .exec()
    // Update recipe
    .then(function(existingRecipe) {
      // If recipe exists, update all fields of the object
      if(existingRecipe) {
        existingRecipe.name = req.body.name;
        existingRecipe.description = req.body.description;
        existingRecipe.image_url_https = req.body.image_url_https;
        existingRecipe.prep_time = req.body.prep_time;
        existingRecipe.cook_time = req.body.cook_time;
        existingRecipe.directions = req.body.directions;
        existingRecipe.ingredients = req.body.name.ingredients;
        /*
         Promise.all takes an array of promises as an argument
         It ensures that all the promises in the array have successfully resolved before
         continuing the promise chain. It will pass to the next .then an array of results, one
         for each promise that was passed
        */
        return Promise.all([
          existingRecipe.increment().save()
        ]);
      } else {
        // Recipe was not found
        return existingRecipe;
      }
    })
    // This .then will be called after the Promise.all resolves, or be called with null if the recipe was not found
    .then(function(savedObjects) {
      // savedObjects should be defined if Promise.all was invoked (recipe was found)
      if(savedObjects) {
        res.status(200);
        // The order of responses are guaranteed to be the same as the order of the promises, so we can assume
        // the second element of the array is the result of the recipe update
        res.json(savedObjects[0]);
      } else {
        // Recipe was not found
        res.status(404);
        res.json({message: 'Not Found'});
      }
    })
    // Error encountered during the save of the recipe or address
    .catch(function(err) {
      res.status(400);
      res.send(err);
    });
}

// Remove a recipe
export function destroy(req, res) {
  Recipe.findById(req.params.id)
    .populate('reviews')
    .exec()
    .then(function(existingRecipe) {
      if(existingRecipe) {
        /*
          This is the equivalent of cascading delete in a relational database
          If the recipe was found, remove both the recipe object and the address object from
          their respective collections. Only record the delete as successful if both objects
          are deleted
         */
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
      console.log("Hello")
      res.status(400);
      res.send(err);
    });
}

