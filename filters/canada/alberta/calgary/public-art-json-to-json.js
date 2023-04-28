const filter = function (data, stringify) {
    if (typeof data === 'string' || data instanceof String) {
        data = JSON.parse(data);
    }
    
    let new_data = [];

    data.map(d => {
        let item = {};
        item.name = d["title"];
        if (item.name === undefined) {
            console.log(`Data name not found for art with url ${d.url}`);
        }
        let coordinates = { longitude: d["point"]["coordinates"][0], latitude: d["point"]["coordinates"][1]};
        if (coordinates.longitude === undefined || coordinates.latitude === undefined) {
            console.log(`Data coordinates not found for art with url ${d.url}`);
        }

        item.coordinates = coordinates;

        let details = {};
        if (d["short_desc"] != null || d["short_desc"] != undefined) {
            details.description = d["short_desc"];
        }
        details.artist = d["artist"];
        details.website = d["website"]["url"];

        item.details = details;
        new_data.push(item);
    })

    if (stringify) {
        return JSON.stringify(new_data, null);
    }

    return new_data;
}

return filter;