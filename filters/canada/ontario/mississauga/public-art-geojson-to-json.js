const filter = function (data, std_lib, stringify, skip_errors) {
    if (typeof data === 'string' || data instanceof String) {
        data = JSON.parse(data);
    }
    
    let new_data = [];

    data["features"].map(d => {
        let item = {};
        item.name = d.properties["Name"];
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
        details.artist = d.properties["Artist_Name"];
        details.location = d.properties["Location"];
        details.address = d.properties["Address"];
        details.webstie = d.properties["Project_Website"];

        item.details = details;
        new_data.push(item);
    })

    if (stringify) {
        return JSON.stringify(new_data, null);
    }

    return new_data;
}

return filter;
