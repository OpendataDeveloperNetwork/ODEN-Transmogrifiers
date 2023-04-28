const filter = function (data, std_lib, stringify, skip_errors) {
    if (typeof data === 'string' || data instanceof String) {
        data = JSON.parse(data);
    }
    
    let new_data = [];

    data["features"].map(d => {
        let item = {};
        item.name = d.attributes["ARTWORK_TITLE"];
        if (item.name === undefined) {
            console.log(`Data name not found for art with url ${d.url}`);
        }
        let coordinates = { longitude: d.attributes["LONGITUDE"], latitude: d.attributes["LATITUDE"]};
        if (coordinates.longitude === undefined || coordinates.latitude === undefined) {
            console.log(`Data coordinates not found for art with url ${d.url}`);
        }
        item.coordinates = coordinates;

        let details = {};
        if (d.attributes["DESCRIPTION"] != null || d.attributes["DESCRIPTION"] != undefined) {
            details.description = d.attributes["DESCRIPTION"];
        }
        details.location = d.attributes["STREET"];

        item.details = details;
        new_data.push(item);
    })

    if (stringify) {
        return JSON.stringify(new_data, null);
    }

    return new_data;
}

return filter;
