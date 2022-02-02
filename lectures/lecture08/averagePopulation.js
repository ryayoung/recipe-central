db.cities.aggregate([
    {
        $match: {
            'timezone': {
                $eq: 'Europe/London'
            }
        }
    },
    {
        $group: {
            _id: 'averagePopulation',
            avgPop: {
                $avg: '$population'
            }
        }
    }
])
