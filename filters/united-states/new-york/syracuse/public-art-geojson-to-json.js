const filter = function (data, std_lib, stringify, skip_errors) {
    if (typeof data === 'string' || data instanceof String) {
        data = JSON.parse(data);
    }
    
    let new_data = [];

    data.features.map(d => {
        let item = {};
        item.name = d.properties.title;
        if (item.name === undefined) {
            console.log(`Data name not found for art with url ${d.url}`);
        }
        let coordinates = { longitude: d.properties.Longitude, latitude: d.properties.Latitude};
        if (coordinates.longitude === undefined || coordinates.latitude === undefined) {
            console.log(`Data coordinates not found for art with url ${d.url}`);
        }
        item.coordinates = coordinates;

        let details = {};
        details.type = d.properties.Type;
        details.address = d.properties.Address;
        details.artist_first_name = d.properties.Artist_First;
        details.artist_last_name = d.properties.Artist_Last_;
        details.media = d.properties.media;
        details.year_created = d.properties.Year_Created;
        details.neighbourhood = d.properties.Neighbourhood;
        details.image_url = d.properties.Image_Url;

        item.details = details;
        new_data.push(item);
    })

    if (stringify) {
        return JSON.stringify(new_data, null);
    }

    return new_data;
}
return filter;