const filter = function (data, stringify) {
    if (typeof data === 'string' || data instanceof String) {
        data = JSON.parse(data);
    }
    
    let new_data = [];

    data["features"].map(d => {
        let item = {};
        item.name = d.properties.MAP_LABEL;
        if (item.name === undefined) {
            console.log(`Data name not found for art with url ${d.url}`);
        }
        let coordinates = { longitude: d.geometry.coordinates[0], latitude: d.geometry.coordinates[1]};
        if (coordinates.longitude === undefined || coordinates.latitude === undefined) {
            console.log(`Data coordinates not found for art with url ${d.url}`);
        }
        item.coordinates = coordinates;

        let details = {};
        if (d.properties["Description"] != null || d.properties["Description"] != undefined) {
            details.description = d.properties["Description"];
        }
        details.artist_first_name = d.properties["ARTIST_FIRST_NAME"];
        details.artist_last_name = d.properties["ARTIST_LAST_NAME"];
        details.location = d.properties["LOCATION"];
        details.location_description = d.properties["LOCATION_DESCRIPTION"];

        item.details = details;
        new_data.push(item);
    })

    if (stringify) {
        return JSON.stringify(new_data, null);
    }

    return new_data;
}

return filter;
