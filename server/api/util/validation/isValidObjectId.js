const ObjectId = require('mongoose').Types.ObjectId;

// Mongoose's validator, isValid(id) isn't sufficient on its own.
// For example, isValid("useruseruser") returns true

export function isValidObjectId(id){
    // 12 bytes or 24 hex characters
    if(ObjectId.isValid(id)){
        // Try casting to ObjectId
        if((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}

