const filter = function (data, stringify) {
    if (typeof data === 'string' || data instanceof String) {
        data = JSON.parse(data);
    }
    
    let new_data = [];

    data.map(d => {
        let item = {};
        item.name = d.name;
        if (item.name === undefined) {
            console.log(`Data name not found for art with url ${d.url}`);
        }
        let coordinates = { longitude: d?.lng, latitude: d?.lat };
        if (coordinates.longitude === undefined || coordinates.latitude === undefined) {
            console.log(`Data coordinates not found for art with url ${d.url}`);
        }
        item.coordinates = coordinates;
        let details = {};
        details.artist = d.artist;
        details.from_date = d.from_date;
        details.to_date = d.to_date;
        details.location = d.location;
        details.description = d.description;
        details.borough = d.borough;
        details.active = d.active;

        item.details = details
        new_data.push(item);
    })

    if (stringify) {
        return JSON.stringify(new_data, null);
    }

    return new_data;
}
return filter;
