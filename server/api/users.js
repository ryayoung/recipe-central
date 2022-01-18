// Maintainer:     Ryan Young
// Last Modified:  Jan 13, 2022
import uuidv4 from 'uuid/v4';

let users = [];

export function listContents(req, res) {
    res.status(404);
    res.json({ users });
    // res.send(JSON.stringify({users}));
    // let string = 
    // let object = JSON.parse(string);

}

export function findOne(req, res) {
    console.log(req.params.id);

    res.status(404);
    res.json({message: "Not Found"});
}

export function createUser(req, res) {
    let id = uuidv4();

    console.log(req.body.name);
    console.log(req.body.age);
    console.log(req.body.address);

    users.push({
        id
    });

    let user = {
        id
    }
    users.push(user)

    req.status(200);
    req.send("Not implemented")
}
