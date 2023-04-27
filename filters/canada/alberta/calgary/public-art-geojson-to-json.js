const filter = function (data, stringify) {
    if (typeof data === 'string' || data instanceof String) {
        data = JSON.parse(data);
    }
    
    let new_data = [];

    data["features"].map(d => {
        let item = {};
        item.name = d.properties["title"];
        if (item.name === undefined) {
            console.log(`Data name not found for art with url ${d.url}`);
        }
        let coordinates = { longitude: d.geometry.coordinates[0], latitude: d.geometry.coordinates[1]};
        if (coordinates.longitude === undefined || coordinates.latitude === undefined) {
            console.log(`Data coordinates not found for art with url ${d.url}`);
        }
        item.coordinates = coordinates;

        let details = {};
        if (d.properties["short_desc"] != null || d.properties["short_desc"] != undefined) {
            details.description = d.properties["short_desc"];
        }
        details.artist = d.properties.artist;
        details.website = d.properties.website;

        item.details = details;
        new_data.push(item);
    })

    if (stringify) {
        return JSON.stringify(new_data, null);
    }

    return new_data;
}

return filter;
