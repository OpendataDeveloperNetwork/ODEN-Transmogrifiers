const filter = async function (data) {
    data = JSON.parse(data);
    
    let new_data = [];

    data.map(d => {
        let item = {};
        item.name = d.title_of_work;
        let coordinates = { longitude: d.geo_point_2d.lon, latitude: d.geo_point_2d.lat };
        item.coordinates = coordinates;
        new_data.push(item);
    })

    return JSON.stringify(new_data, null);
}
return filter;