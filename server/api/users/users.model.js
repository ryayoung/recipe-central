import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let fullNameSchema = Schema({
    first : {
        type : String,
        required : true,
        index : true // So we can quickly search by name
    },
    last : {
        type : String,
        required : true,
        index : true // So we can quickly search by name
    }
}, { // OPTIONS
    _id : false
});


let userSchema = Schema({
    name : {
        type : fullNameSchema,
        required : true
    },
    username : {
        type : String,
        required : true,
        unique : true,
        index : true // So we can find by username
    },
    email : {
        type : String,
        required : true,
        unique : true,
        index : true // So we can find by email
    }
}, { // OPTIONS
    timestamps : {
        createdAt : 'created_at',
        updatedAt : 'updated_at'
    }
});

let User = mongoose.model('User', userSchema);


export {User};

// {
    // "_id": "6214288a10738a5371d5f051",
    // "name": "Smoked Salmon",
    // "description": "This is a really good recipe.",
    // "image_url_https": "https://pbs.recmg.com/media/FLlqGeGUYAAI0rz.jpg",
    // "prep_time": 10,
    // "cook_time": 5,
    // "directions": [
        // "Do this",
        // "then do this",
    // ],
    // "ingredients": [
        // {
            // "name": "salt",
            // "quantity": 5,
            // "units": "tsp"
        // },
        // {
            // "name": "pepper",
            // "quantity": 6,
            // "units": "lbs"
        // }
    // ],
    // "reviews": [],
    // "created_at": "2022-02-22T00:04:26.854Z",
    // "updated_at": "2022-02-22T00:04:26.854Z",
// }

// {
    // "text": "This recipe is amazing!",
    // "rating": 5,
    // "user_id": "6214288a10738a5371d5f051",
// }
