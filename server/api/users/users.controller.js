'use strict';

import User from './users.model';

// uuidv4 will let us generate unique IDs for our usersController
// import { v4 as uuidv4 } from 'uuid';

// The export keyword makes the function importable in other files
// (such as /server/api/usersController/index.js)
export function index(req, res) {
    res.json({
        users: User.find()
    });
}


export function show(req, res) {

    let existingUser = User.findById(req.params.id);

    if (existingUser) {
        res.status(200);
        res.json(existingUser);
    } else {
        res.status(404);
        res.json({message: 'Not Found'});
    }
}


export function create(req, res) {

    let name = req.body.name;
    if (!name || typeof name !== 'string') {
        res.status(400);
        return res.json({
            error: 'name(String) is required'
        });
    }

    let user = User.create({
        name: name,
        address: req.body.address,
        age: req.body.age
    });

    res.status(201);
    res.json(user);
}


export function upsert(req, res) {
    let name = req.body.name;
    if (!name || typeof name !== 'string') {
        res.status(400);
        return res.json({
            error: 'name(String) is required'
        });
    }
    let user = {
        id: req.params.id,
        name: name,
        address: req.body.address,
        age: req.body.age
    }

    let result = User.findOneAndUpdate(user);
    if (result === false) {
        res.status(201);
    } else {
        res.status(200);
    }
    res.json(user);
}


export function destroy(req, res) {

    let result = User.remove({id: req.params.id});
    if (result === true) {
        res.status(204).send();
    } else {
        res.status(404);
        res.json({message: "Not Found"});
    }
}








