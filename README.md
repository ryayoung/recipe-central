<!-- Maintainer:     Ryan Young -->
<!-- Last Modified:  Feb 22, 2022 -->
# Recipe Server API

## Reference Index
---

<details>
  <summary><i><b>What response codes can I expect?</b></i></summary>
	
- `200` Request succeeded
- `201` Resource created
- `204` No content (returned when resource removed successfully)
- `404` Requested resource not found
- `400` Bad request/invalid parameters
- `500` Server error

</details>

---

### User
- [GET /users/](#users_get_all)
- [GET /users/by](#users_get_by)
- [GET /users/:id](#users_get)
- [POST /users/](#users_post)
- [PUT /users/:id](#users_put)
- [DELETE /users/by](#users_delete_by)
- [DELETE /users/:id](#users_delete)

### Recipe
- [GET /recipes/](#recipes_get_all)
- [GET /recipes/:id](#recipes_get)
- [POST /recipes/](#recipes_post)
- [PUT /recipes/:id](#recipes_put)
- [DELETE /recipes/:id](#recipes_delete)

### Review
- [GET /recipes/:id/reviews/](#reviews_get_all)
- [GET /recipes/:id/reviews/:id](#reviews_get)
- [POST /recipes/:id/reviews/](#reviews_post)
- [PUT /recipes/reviews/:id](#reviews_put)
- [DELETE /recipes/:id/reviews/](#reviews_delete)

<br>

## Schemas
---
### User
- Required:
	- `name` (sub-document containing `first` and `last`)
	- `username`
	- `email`
- Unique: `username`, `email`
- All of the required fields are indexed, allowing us to efficiently query by any of them.

<details>
  <summary><i>PREVIEW CODE</i></summary>

```javascript
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
```
</details>

<details>
  <summary><i>SAMPLE USER</i></summary>

```javascript
{
    "_id": "6214288a10738a5371d5f051",
    "name": {
        "first": "Jerry",
        "last": "Smith"
    },
    "username": "bsmith12",
    "email": "example@email.com",
    "created_at": "2022-02-22T00:04:26.854Z",
    "updated_at": "2022-02-22T00:04:26.854Z"
}
```
</details>

---

### Recipe
- Required:
	- `name`
	- `description`
	- `image_url_https`
	- `prep_time` (minutes)
	- `cook_time` (minutes)
	- `directions` (array of strings)
	- `ingredients` (array of `ingredientSchema` sub-documents)
- Required for `ingredientSchema`:
	- `name`
	- `quantity`
	- `units` (type `enum`: must be a valid unit)
- Recipes contain an additional field, `reviews`, but this field can be populated only after a recipe has been created.

<details>
  <summary><i>PREVIEW CODE</i></summary>

```javascript
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
```
</details>

<details>
  <summary><i>SAMPLE RECIPE</i></summary>

```javascript
{
    "_id": "6214288a10738a5371d5f051",
    "name": "Smoked Salmon",
    "description": "This is a really good recipe.",
    "image_url_https": "https://pbs.recmg.com/media/FLlqGeGUYAAI0rz.jpg",
    "prep_time": 10,
    "cook_time": 5,
    "directions": [
        "Do this",
        "then do this",
    ],
    "ingredients": [
        {
            "name": "salt",
            "quantity": 5,
            "units": "tsp"
        },
        {
            "name": "pepper",
            "quantity": 6,
            "units": "lbs"
        }
    ],
    "reviews": [],
    "created_at": "2022-02-22T00:04:26.854Z",
    "updated_at": "2022-02-22T00:04:26.854Z"
}

```
</details>

---

### Review
- Required attributes: `text`. `rating`, and `user_id`
- Reviews must be added to an existing recipe
- Timestamps `created_at` and `updated_at` are added/updated automatically
- Ratings must be between 1 and 5

<details>
  <summary><i>PREVIEW CODE</i></summary>

```javascript
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

```
</details>

<details>
  <summary><i>SAMPLE REVIEW</i></summary>

```javascript
{
    "text": "This recipe is amazing!",
    "rating": 5,
    "user_id": "6214288a10738a5371d5f051", 
    "created_at": "2022-02-22T00:04:26.854Z",
    "updated_at": "2022-02-22T00:04:26.854Z"
}
```
</details>

<br>

## API Endpoints

---


### Users

<a name="users_get_all"></a>

- `GET /users/`
	- Returns all users in the database

<a name="users_get_by"></a>


- `GET /users/by`
  - Returns all requested users.  
	- Accepts query parameters. Include ONE of the following in a comma separated string: `ids`, `usernames`, `emails`

<a name="users_get"></a>

- `GET /users/:id`
	- Returns the user for the id provided as a path variable.
	- Provided id must be a valid ObjectId

<a name="users_get_reviews"></a>

- `GET /users/:id/reviews`
	- Returns an array of the user's reviews, each tagged with the ID of the recipe it was posted for.
	- Each array element contains two fields: `data` (review content) and `recipe_id`

<a name="users_post"></a>

- `POST /users/`
	- Creates a new user
	- Surrounding whitespace will be trimmed from `name.first`, `name.last`, `username`, and `email` before insertion
  - Returns the created user if successful

<a name="users_put"></a>

- `PUT /users/:id`
	- Updates an existing user.
	- Provided id must be a valid ObjectId
	- Surrounding whitespace will be trimmed from `name.first`, `name.last`, `username`, and `email` before insertion
	- Returns the saved user if successful

<a name="users_delete_by"></a>

- `DELETE /users/by`
	- Deletes all specified users.
	- Similar to `GET /users/by`, identifiers must be passed as a comma separated string in ONE of the following query parameters: `ids`, `usernames`, `emails`
	- NOTE: This endpoint returns `200` if successful, instead of `204`.
    - Return body: json containing attribute: `deletedCount` for the number of successful deletions

<a name="users_delete"></a>

- `DELETE /users/:id`
	- Deletes the user specified by ID. 
	- Provided ID must be a valid ObjectId
	- Returns `204` No content if successful


### Recipes
<a name="recipes_get_all"></a>

- `GET /recipes/`
	- Returns all recipes, with the `reviews` array containing only ObjectIds
    - Pass query parameter, `mode`, with value `extended` to include array of full review documents

<a name="recipes_get"></a>

- `GET /recipes/:id`
	- Returns the recipe for a given id specified as a path variable
	- Specified ID must be a valid ObjectId

<a name="recipes_post"></a>

- `POST /recipes/`
	- Creates a new recipe for the object passed in request body
	- Reviews CANNOT be created this way. Any reviews passed will be ignored.
	- Returns the created recipe if successful

<a name="recipes_put"></a>

- `PUT /recipes/:id`
	- Updates an existing recipe. The `reviews` array CANNOT be updated this way
	- Provided ID must be a valid ObjectId
	- Returns the saved recipe if successful

<a name="recipes_delete"></a>

- `DELETE /recipes/:id`
	- Deletes the recipe specified by ID as a path variable.
	- All of its reviews will be deleted
	- Returns `204` No content if successful

### Reviews

<a name="reviews_get_all"></a>

- `GET /recipes/:id/reviews/`
	- Returns all reviews for a recipe specified by ID
	- Provided ID must be a valid ObjectId
<a name="reviews_get"></a>

- `GET /recipes/:id/reviews/:id`
	- Returns a review specified by ID as a path variable. Parent recipe ID must also be given.
	- All IDs must be valid ObjectIds

<a name="reviews_post"></a>

- `POST /recipes/:id/reviews/`
	- Creates a new review for the recipe specified by ID
    - The `user_id` field in the json payload must represent a valid ObjectId, and it must represent an existing user
	- Returns the created review if successful

<a name="reviews_put"></a>

- `PUT /recipes/reviews/:id`
	- Updates an existing review for an existing recipe. Provide review ID as path variable
	- IDs must be valid ObjectIds

<a name="reviews_delete"></a>

- `DELETE /recipes/:id/reviews/`
	- Deletes an existing review from an existing recipe. Provide recipe ID as path variable and review ID as query param
	- IDs must be valid ObjectIds
	- Returns `204` No content if successful
