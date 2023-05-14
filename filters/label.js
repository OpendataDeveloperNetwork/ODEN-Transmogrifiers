const filter = function (data, params) {
    data.data.map(d => {
        d['labels'] = params;
    });
    return data;
}
return filter;