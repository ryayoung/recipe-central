'use strict';
import mongoose from 'mongoose';
let ObjectId = mongoose.Types.ObjectId;

import { User } from './users.model';

// To use instead of ObjectId.isValid(id)
import { isValidObjectId } from '../util/validation/isValidObjectId';

// Find all Users
export function index(req, res) {
    
    // If a comma separated list of ids was passed in query params, return those users.
    if (req.query.ids) {
        let ids = req.query.ids.split(',');
        let objectIds = ids.map(s => ObjectId(s));
        console.log(objectIds);
        User.find()
            .where('_id')
            .in(objectIds)
            .exec()
            .then(function(users) {
                res.json({ users });
            })
            .catch(function(err) {
                res.status(500);
                console.log(err);
                res.send(err);
            });
        
    // Return all users
    } else {
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
}

// Find details for one user
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

export function showBy(req, res) {
    let query = {};

    // USERNAME
    if (req.query.username) {
        query = {username : req.query.username};
        
    // EMAIL
    } else if (req.query.email) {
        query = {email : req.query.email};

    // First & last, or just last, or just first
    } else if (req.query.first && req.query.last) {
        // query = {$and : [{'name.last': req.query.last}, {'name.first' : req.query.first}]};
        query = {'name.last': req.query.last, 'name.first' : req.query.first};

    } else if (req.query.last) {
        query = {'name.last': req.query.last};

    } else if (req.query.first) {
        query = {'name.first': req.query.first};
    }

    // Decide if we're finding one or many
    if (req.query.username | req.query.email) {
        showOneBy(req, res, query);
    } else {
        console.log("FINDING MANY =========================================")
        showManyBy(req, res, query);
    }
}

export function showOneBy(req, res, query) {
    User.findOne(query)
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

export function showManyBy(req, res, query) {
    User.find(query)
        .exec()
        .then(function(existingUsers) {
            if (existingUsers) {
                console.log("FOUND USER BY FIRST NAME =========================================")
                res.status(200);
                res.json(existingUsers);
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


export function create(req, res) {
    let user = req.body;

    // TRIM WHITESPACE
    user.name.first = user.name.first.trim();
    user.name.last = user.name.last.trim();
    user.username = user.username.trim();
    user.email = user.email.trim();

    // Start off by saving the address
    User.create(user)
        .then(function(createdUser) {
            res.status(201);
            res.json(createdUser);
        })
        // An error was encountered during either the save of the address or the save of the user
        .catch(function(err) {
            res.status(400);
        res.send(err);
    });
}

// Update a user
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

                return existingUser.save()

            } else {
                // User was not found
                return existingUser;
            }
        })
        // This .then will be called after the Promise.all resolves, or be called with null if the user was not found
        .then(function(savedUser) {
            // savedObjects should be defined if Promise.all was invoked (user was found)
            if(savedUser) {
                res.status(200);
                res.json(savedUser);
            } else {
                // User was not found
                res.status(404);
                res.json({message: 'Not Found'});
            }
        })
        // Error encountered during the save of the user
        .catch(function(err) {
            res.status(400);
            console.log(err);
            res.send(err);
        });
}

// Remove a user
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
                /*
                  This is the equivalent of cascading delete in a relational database
                  If the user was found, remove both the user object and the address object from
                  their respective collections. Only record the delete as successful if both objects
                  are deleted
                 */
                return Promise.all([
                    existingUser.remove()
                ]);
            } else {
                return existingUser;
            }
        })
        // Delete was successful
        .then(function(deletedUser) {
            if(deletedUser) {
                res.status(204).send();
            } else {
                // User was not found
                res.status(404);
                res.json({message: 'Not Found'});
            }
        })
        // Address or user delete failed
        .catch(function(err) {
            console.log("Hello")
            res.status(400);
            res.send(err);
        });
}

