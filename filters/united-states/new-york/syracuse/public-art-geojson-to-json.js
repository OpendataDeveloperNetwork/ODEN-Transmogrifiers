const filter = function (data, stringify) {
    if (typeof data === 'string' || data instanceof String) {
        data = JSON.parse(data);
    }
    
    let new_data = [];

    data.features.map(d => {
        let item = {};
        item.name = d.properties.Title;
        if (item.name === undefined) {
            console.log(`Data name not found for art with url ${d.url}`);
        }
        let coordinates = { longitude: parseInt(d.properties.Longitude), latitude: d.properties.Latitude};
        if (coordinates.longitude === undefined || coordinates.latitude === undefined) {
            console.log(`Data coordinates not found for art with url ${d.url}`);
        }
        item.coordinates = coordinates;

        let details = {};
        details.type = d.properties.Type;
        details.address = d.properties.Address;
        details.artist_first_name = d.properties.Artist_First;
        details.artist_last_name = d.properties.Artist_Last_;
        details.media = String(d.properties.Media);
        details.year_created = String(d.properties.Year_Created);
        details.neighbourhood = d.properties.Neighborhood;
        details.image_url = String(d.properties.Image_Url);

        item.details = details;
        new_data.push(item);
    })

    if (stringify) {
        return JSON.stringify(new_data, null);
    }

    return new_data;
}
return filter;