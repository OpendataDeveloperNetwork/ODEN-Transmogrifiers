const filter = function (data, params) {
    if (params['schema']) {
        delete params['schema'];
    }
    data.data.map(d => {
        d['labels'] = params;
    });
    return data;
}
return filter;