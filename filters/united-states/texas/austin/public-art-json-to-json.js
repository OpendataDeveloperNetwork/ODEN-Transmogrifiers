const filter = function (data, stringify) {
    if (typeof data === 'string' || data instanceof String) {
        data = JSON.parse(data);
    }
    
    let new_data = [];

    data.map(d => {
        let item = {};
        item.name = d.artwork_title;
        if (item.name === undefined) {
            console.log(`Data name not found for art with url ${d.webpage}`);
        }
        let coordinates = { longitude: d.location_longitude, latitude: d.location_latitude };
        if (coordinates.longitude === undefined || coordinates.latitude === undefined) {
            console.log(`Data coordinates not found for art with url ${d.webpage}`);
        }
        item.coordinates = coordinates;
        let details = {};
        details.artist = d.artist;
        details.material = d.material;
        details.artwork_date = d.artwork_date;
        details.artwork_location = d.artwork_location;
        details.location_street_address = d.location_street_address
        details.location_city = d.location_city
        d.location_state = d.location_state
        item.details = details
        new_data.push(item);
    })

    if (stringify) {
        return JSON.stringify(new_data, null);
    }

    return new_data;
}
return filter;
