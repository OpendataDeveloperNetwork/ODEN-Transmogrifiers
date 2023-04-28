const filter = function (data, std_lib, stringify, skip_errors) {
    if (typeof data === 'string' || data instanceof String) {
        data = JSON.parse(data);
    }
    
    let new_data = [];

    data.map(d => {
        let item = {};

        item.name = d.title;
        if (item.name === undefined) {
            console.log(`Data name not found for art with url ${d.url}`);
        }
        let coordinates = {
            longitude: parseFloat(d.longitude?.longitude),
            latitude: parseFloat(d.longitude?.latitude)
        };
        if (coordinates.longitude === undefined || coordinates.latitude === undefined) {
            console.log(`Data coordinates not found for art with url ${d.url}`);
        }
        item.coordinates = coordinates;

        let details = {
            artist: d.artist,
            medium: d.medium,
            suburb: d.suburb,
            date: d.date,
            commissioned_details: d.commissioned_details,
            description: d.description
        }
        item.details = details
        
        new_data.push(item);
    })

    if (stringify) {
        return JSON.stringify(new_data, null);
    }

    return new_data;
}
return filter;