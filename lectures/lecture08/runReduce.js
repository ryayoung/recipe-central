results = db.runCommand({
    mapReduce: 'phones',
    map: map,
    reduce: reduce,
    out: 'phones.report'
})
