const filter = function (data, params) {
    console.log(data);
    data.data.map(d => {
        d['labels'] = params;
    });
}
return filter;