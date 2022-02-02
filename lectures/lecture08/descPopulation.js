db.cities.aggregate([
    {
    // same $match statement the previous aggregation operation
    },
    {
        $sort: {
            population: -1
        }
    },
    {
        $project: {
            _id: 0,
            name: 1,
            population: 1
        }
    }
])
