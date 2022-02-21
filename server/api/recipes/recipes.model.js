import mongoose from 'mongoose';
let Schema = mongoose.Schema;


let reviewSchema = Schema({

    text : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        required : true,
        min : 1,
        max : 5
    },
    user_id : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
}, { // OPTIONS
    timestamps : {
        createdAt : 'created_at',
        updatedAt : 'updated_at'
    }
});


let ingredientSchema = Schema({

    name : {
        type : String,
        required : true
    },
    quantity : {
        type : Number
    },
    units : {
        type: String,
        enum : ['oz', 'fl. oz', 'ml', 'l',
            'tsp', 'tbsp', 'mg', 'g',
            'kg', 'lb', 'qt', 'pt',
            'gal', 'doz', 'cup'
        ]
    }
}, {
    _id : false
});


let recipeSchema = Schema({

    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    image_url_https : {
        type : String,
        required : true
    },
    prep_time : {
        type : Number,
        required : true
    },
    cook_time : {
        type : Number,
        required : true
    },
    directions : {
        type : [ String ],
        required : true
    },
    ingredients : {
        type : [ ingredientSchema ],
        required : true
    },
    reviews : {
        type : [{
            type : Schema.Types.ObjectId,
            ref : 'Review'
        }],
        required : true
    }
}, { // OPTIONS
    timestamps : {
        createdAt : 'created_at',
        updatedAt : 'updated_at'
    }
});

let Review = mongoose.model('Review', reviewSchema);
let Recipe = mongoose.model('Recipe', recipeSchema);

export {Review, Recipe};
