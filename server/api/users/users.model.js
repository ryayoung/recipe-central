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
