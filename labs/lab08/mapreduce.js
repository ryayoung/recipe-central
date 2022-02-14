// Maintainer:     Ryan Young
// Last Modified:  Feb 13, 2022

map = function() {
    var longitude = Math.floor(this.location.longitude)

    emit({
        longitude: longitude,
        city: this.name
    }, {
        count: 1
    });
}

reduce = function(key, values) {
    var total = 0;
    for (var i = 0; i < values.length; i++) {
        var data = values[i];
        if ('total' in data) {
            total += data.total;
        } else {
            total += data.count;
        }
    }
    return {total:total};
}

results = db.runCommand({
    mapReduce: 'cities',
    map: map,
    reduce: reduce,
    finalize: function(key, reducedValue) {
        return {total: reducedValue.count};
    },
    out: 'cities.report'
})
