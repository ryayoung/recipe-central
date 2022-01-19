// // Maintainer:     Ryan Young
// // Last Modified:  Jan 13, 2022
// import { v4 as uuidv4 } from 'uuid' ;
// let users = [];
//
// export function listContents(req, res) {
//     res.json({ users });
// }
//
// export function findOne(req, res) {
//     let id = req.params.id;
//     console.log(id);
//     for (var i=0; i < users.length; i++) {
//         if (id === users[i].id) {
//             // This code is breaking
//             res.status(200);
//             res.json(users[i]);
//         }
//     }
//
//     res.status(404);
//     res.json({message: "Not Found"});
// }
//
// export function createUser(req, res) {
//     let id = uuidv4();
//
//     let new_name = req.body.name;
//     let new_age = req.body.age;
//     let new_address = req.body.address;
//
//     let user = {
//         id: id,
//         name: new_name,
//         age: new_age,
//         address: new_address
//     }
//     users.push(user);
//
//     res.status(200);
//     res.json(user)
// }
