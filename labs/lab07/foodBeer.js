// Both of these work

db.towns.find({
    name : /e/i,
    $or : [
        {famousFor: "food"},
        {famousFor: "beer"}
    ]
})

db.towns.find({
    name : {
        $regex: /e/i
    },
    $or : [
        {famousFor: "food"},
        {famousFor: "beer"}
    ]
})
