const filter = function (data, std_lib, stringify, skip_errors) {
    if (typeof data === 'string' || data instanceof String) {
        data = JSON.parse(data);
    }
    
    let new_data = [];

    data.map(d => {
        let item = {};
        item.name = d.art;
        if (item.name === undefined) {
            console.log(`Data name not found for art with url ${d.url}`);
        }
        let coordinates = { longitude: parseFloat(d.longitude), latitude: parseFloat(d.latitude) };
        if (coordinates.longitude === undefined || coordinates.latitude === undefined) {
            console.log(`Data coordinates not found for art with url ${d.url}`);
        }

        let artist = d.artist;
        let details = {}

        if(artist !== undefined){
            details.artist = artist;
        }

        item.coordinates = coordinates;
        item.details = details;
        
        new_data.push(item);
    })

    if (stringify) {
        return JSON.stringify(new_data, null);
    }

    return new_data;
}

return filter;
