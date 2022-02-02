results = db.runCommand({
    mapReduce: 'phones',
    map: map,
    reduce: reduce,
    finalize: function(key, reducedValue) {
        return {total: reducedValue.count};
    },
    out: 'phones.report'
})
