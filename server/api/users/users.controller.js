'use strict';
import mongoose from 'mongoose';
let ObjectId = mongoose.Types.ObjectId;

import { User } from './users.model';
import { Review, Recipe } from '../recipes/recipes.model';

// Use this instead of ObjectId.isValid(id)
import { isValidObjectId } from '../util/validation/isValidObjectId';

// FIND ALL: GET '/'
export function index(req, res) {
    User.find()
        .exec()
        .then(function(users) {
            res.json({ users });
        })
        .catch(function(err) {
            res.status(500);
            res.send(err);
        });
}


// Find one user: GET '/:id'
export function show(req, res) {
    // ID must be valid mongodb ObjectId format
    if (!isValidObjectId(req.params.id)) {
        res.status(400);
        res.send('Error: Invalid ID format: "' + req.params.id + '"')
        return
    }
    User.findById(req.params.id)
        .exec()
        .then(function(existingUser) {
            if (existingUser) {
                res.status(200);
                res.json(existingUser);
            } else {
                res.status(404);
                res.json({message : 'Not Found'});
            }
        })
        .catch(function(err) {
            res.status(400);
            res.send(err);
        });
}


// Find multiple users: GET '/by'
export function showBy(req, res) {
    /* Given a query paramter (ids, usernames, or emails) with
     * a comma separated string of unique identifiers, return
     * all users listed.
    */

    let searchData = getIdentifiers(req);
    let identifiers = searchData[0]
    let fieldName = searchData[1]

    User.find()
        .where(fieldName)
        .in(identifiers)
        .exec()
        .then(function(users) {
            if (users) {
                res.status(200);
                res.json({ users });
            } else {
                res.status(404);
                res.json({message : 'Not found'});
            }
        })
        .catch(function(err) {
            res.status(500);
            res.send(err);
        });
}


// Find all reviews for user: GET '/:id/reviews'
export function showReviews(req, res) {
    /* Returns an array of all reviews user has posted.
     * NOTE: Each review will be tagged with the ID of the recipe it was posted for
     * So each list element will contain two elements: data (review object) and recipe_id
    */ 
    // ID must be valid mongodb ObjectId format
    if (!isValidObjectId(req.params.id)) {
        res.status(400);
        res.send('Error: Invalid ID format: "' + req.params.id + '"')
        return
    }
    Review.find({user_id : req.params.id})
        .exec()
        .then(function(reviews) {
            let reviewIds = reviews.map(s => s._id)

            Recipe.find({reviews : {$in : reviewIds}})
                .then(function(recipes) {
                    if (recipes) {
                        reviews = reviews.map(function(e, i) {
                            let recipeTag = {recipe_id : recipes[i]._id};
                            return {
                                data : e,
                                recipe_id : recipes[i]._id
                            }
                        })
                        res.status(200);
                        res.json({ reviews });
                    } else {
                        res.status(400);
                        res.json({ message : 'None found' });
                    }
                })
        })
        .catch(function(err) {
            res.status(500);
            res.send(err);
        })
        
}


// Create single user: POST '/'
export function create(req, res) {
    let user = req.body;
    // Trim whitespace from important information
    user.name.first = user.name.first.trim();
    user.name.last = user.name.last.trim();
    user.username = user.username.trim();
    user.email = user.email.trim();

    User.create(user)
        .then(function(createdUser) {
            res.status(201);
            res.json(createdUser);
        })
        .catch(function(err) {
            res.status(400);
            res.send(err);
        });
}


// Update a single user: PUT '/:id'
export function update(req, res) {
    // ID must be valid mongodb ObjectId format
    if (!isValidObjectId(req.params.id)) {
        res.status(400);
        res.send('Error: Invalid ID format: "' + req.params.id + '"')
        return
    }
    User.findById(req.params.id)
        .exec()
        .then(function(existingUser) {
            if(existingUser) {
                // TRIM WHITESPACE
                existingUser.name.first = req.body.name.first.trim();
                existingUser.name.last = req.body.name.last.trim();
                existingUser.username = req.body.username.trim();
                existingUser.email = req.body.email.trim();

                return existingUser.save();

            } else {
                // User was not found
                return existingUser;
            }
        })
        .then(function(savedUser) {
            if(savedUser) {
                res.status(200);
                res.json(savedUser);
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

// Remove a single user: DELETE '/:id'
export function destroy(req, res) {
    // ID must be valid mongodb ObjectId format
    if (!isValidObjectId(req.params.id)) {
        res.status(400);
        res.send('Error: Invalid ID format: "' + req.params.id + '"')
        return
    }
    User.findById(req.params.id)
        .exec()
        .then(function(existingUser) {
            if(existingUser) {
                return existingUser.remove()
            } else {
                return existingUser;
            }
        })
        .then(function(deletedUser) {
            if(deletedUser) {
                res.status(204).send();
            } else {
                // User was not found
                res.status(404);
                res.json({message: 'Not Found'});
            }
        })
        .catch(function(err) {
            res.status(400);
            res.send(err);
        });
}


// Remove multiple users: '/by'
export function destroyBy(req, res) {
    /* Given a query paramter (ids, usernames, or emails) with
     * a comma separated string of unique identifiers, remove all
     * users listed.
    */
    let searchData = getIdentifiers(req);
    let identifiers = searchData[0]
    let fieldName = searchData[1]

    User.find()
        .where(fieldName)
        .in(identifiers)
        .remove()
        .exec()
        .then(function(deletedUsers) {
            if (deletedUsers.deletedCount > 0) {
                res.status(200);
                res.send({deletedCount : deletedUsers.deletedCount});
            } else {
                res.status(404);
                res.json({message : 'None found'});
            }
        })
        .catch(function(err) {
            res.status(400);
            res.send(err);
        });
}


// HELPER FUNCTIONS
function getIdentifiers(req) {
    /* Given a query parameter (ids, usernames, or emails)
     * with a comma separated string of identifiers, return
     * them in a list. For 'ids' this must be list of ObjectIds
    */
    let identifiers
    let fieldName
    // IDS
    if (req.query.ids) {
        identifiers = req.query.ids.split(',')
        identifiers = identifiers.map(s => ObjectId(s));
        fieldName = "_id";
    // USERNAMES
    } else if (req.query.usernames) {
        identifiers = req.query.usernames.split(',');
        fieldName = "username";
    // EMAILS
    } else if (req.query.emails) {
        identifiers = req.query.emails.split(',');
        fieldName = "email";
    }
    return [identifiers, fieldName]
}




