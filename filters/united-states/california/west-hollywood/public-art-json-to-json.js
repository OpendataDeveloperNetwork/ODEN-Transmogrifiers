const filter = function (data, std_lib, stringify, skip_errors) {
    if (typeof data === 'string' || data instanceof String) {
        data = JSON.parse(data);
    }
    
    let new_data = [];

    data.map(d => {
        let item = {};
        
        item.name = d.art_installation_name;
        if (item.name === undefined) {
          console.log(`Data name not found for art with url ${d.url}`);
        }
    
        let coordinates = {latitude: parseFloat(d.location?.latitude), longitude: parseFloat(d.location?.longitude)};
        if (coordinates.longitude === undefined || coordinates.latitude === undefined) {
          console.log(`Data coordinates not found for art with url ${d.url}`);
        }

        item.coordinates = coordinates;
        new_data.push(item);
    })

    if (stringify) {
        return JSON.stringify(new_data, null);
    }

    return new_data;
}
return filter;


