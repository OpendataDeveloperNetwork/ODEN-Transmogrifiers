const filter = function (data, stringify) {
    if (typeof data === 'string' || data instanceof String) {
        data = JSON.parse(data);
    }
    
    let new_data = [];

    data.map(d => {
        let item = {};
        item.name = d.title_of_work;
        if (item.name === undefined) {
            throw "data name not found";
        }
        let coordinates = { longitude: d.geo_point_2d.lon, latitude: d.geo_point_2d.lat };
        if (coordinates.longitude === undefined || coordinates.latitude === undefined) {
            throw "data coordinates not found";
        }
        item.coordinates = coordinates;
        new_data.push(item);
    })

    if (stringify) {
        return JSON.stringify(new_data, null);
    }

    return new_data;
}
return filter;