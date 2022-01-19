'use strict';

// uuidv4 will let us generate unique IDs for our users
import { v4 as uuidv4 } from 'uuid';

// We are storing users in memory for now as JSON objects in an array
let users = [];

// The export keyword makes the function importable in other files
// (such as /server/api/users/index.js)
export function listContents(req, res) {
    // res.json will return the variable as its JSON string representation
    // https://expressjs.com/en/api.html#res.json
    res.json({
        users: users
    });
}

// I decided to delegate searching the array for a given ID to a helper function.
// This will let it be reused later (like in an update function)
function findUser(id) {
    let foundUsers = users.filter(function(user) {
        if (user.id === id) {
            return true;
        }
        return false;
    });

    if (foundUsers.length > 0) {
        return foundUsers[0];
    } else {
        // In JavaScript you could return null or undefined for "no such element"
        // Here's some discussion about which return value might be better:
        // https://stackoverflow.com/questions/37980559/is-it-better-to-return-undefined-or-null-from-a-javascript-function
        return null;
    }
}

export function findOne(req, res) {
    // the :id in '/:id' declared by /server/api/users/index.js can be accessed in the request object
    // under the params object, i.e. req.params.id
    let existingUser = findUser(req.params.id);

    if (existingUser) {
        // Make sure to only call res.status and res.json *once* per request.
        // If you try to set the status code twice, express.js will give you an error!
        // A detailed explanation for this can be found here:
        // https://stackoverflow.com/questions/7042340/error-cant-set-headers-after-they-are-sent-to-the-client
        res.status(200);
        res.json(existingUser);
    } else {
        // If you don't find the user make sure to return a 404 status code
        // with a descriptive response
        res.status(404);
        res.json({message: 'Not Found'});
    }
}

export function createUser(req, res) {
    // Generate a random ID
    let id = uuidv4();

    // The JSON you POST when calling /api/users
    // is parsed automatically into req.body and can be accessed directly
    let name = req.body.name;
    // Validate parameter exists and is a string
    if (!name || typeof name !== 'string') {
        res.status(400);
        return res.json({
            error: 'name(String) is required'
        });
    }

    let address = req.body.address;
    // Validate parameter exists and is a string
    if (!address || typeof address !== 'string') {
        res.status(400);
        return res.json({
            error: 'address(String) is required'
        });
    }

    let age = req.body.age;
    // Validate parameter exists and is a number
    if (!age || typeof age !== 'number') {
        res.status(400);
        return res.json({
            error: 'age(Number) is required'
        });
    }

    // Create a new user object with the generated ID and the fields provided by the user
    let user = {
        id,
        name,
        address,
        age
    };

    // Add the new user object to the array
    users.push(user);

    // Set a status code of 201 (created) and return the new user object back to the caller
    // You need to return the new user so that they can see the generated ID
    res.status(201);
    res.json(user);
}

export function updateUser(req, res) {
    let id = req.params.id;
    let name = req.body.name;
    let address = req.body.address;
    let age = req.body.age;

    let existingUser = findUser(id);

    if (existingUser) {
        existingUser.name = name
        existingUser.address = address
        existingUser.age = age
        res.status(200);
        res.json(existingUser);

    } else {
        let user = {
            id,
            name,
            address,
            age
        };
        users.push(user);
        res.status(201);
        res.json(user);
    }

}

export function removeUser(req, res) {
    let id = req.params.id;
    if (findUser(id)) {
        users = users.filter(function(user) {
            return user.id !== id;
        });
        res.status(204).send();
    } else {
        res.status(404);
        res.json({message: "Not Found"});
    }
}








