// Both of these work


db.towns.find({
    name: {
        $regex: /new/i
    } 
})

db.towns.find({
    name: /new/i
})

