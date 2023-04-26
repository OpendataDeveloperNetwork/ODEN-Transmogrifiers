const filter = function (data, stringify) {
    if (typeof data === 'string' || data instanceof String) {
        data = JSON.parse(data);
    }
    if (stringify) {
        return JSON.stringify(data, null);
    }
    return data;
}
return filter;