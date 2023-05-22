const filter = function (data, params) {
    if (!params['labels']) {
        throw 'label: no labels set'
    }
    data.data.map(d => {
        d['labels'] = params.labels;
    });
    data.errors.map(e => {
        e['labels'] = params.labels;
    });
    return data;
}
return filter;