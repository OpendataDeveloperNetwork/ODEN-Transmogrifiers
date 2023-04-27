const filter = function (data, stringify) {
    if (typeof data === 'string' || data instanceof String) {
        data = JSON.parse(data);
    }

    let new_data = [];

    data.map(d => {
        let item = {};

        item.name = d.artwork_name;
        if (item.name === undefined) {
            console.log(`Data name not found for art with url ${d.url}`);
        }

        let coordinates = { longitude: d.x_coordinate, latitude: d.y_coordinate };
        if (coordinates.longitude === undefined || coordinates.latitude === undefined) {
            console.log(`Data coordinates not found for art with url ${d.url}`);
        }
        item.coordinates = coordinates;

        let details = {};
        details.street_address = d.street_address;
        details.location = d.location;
        details.artist = d.artist;
        details.media = d.media;
        details.category = d.category;
        details.credit = d.credit;
        details.weblink = d.weblink;
        details.installation_date = d.installation_date;
        details.budget = d.budget;
        details.geocoded_column = d.geocoded_column;
        item.details = details;

        new_data.push(item);
    })

    if (stringify) {
        return JSON.stringify(new_data, null);
    }

    return new_data;
}
return filter;