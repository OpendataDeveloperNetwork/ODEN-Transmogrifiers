const filter = function (data, std_lib, stringify, skip_errors) {
    if (typeof data === 'string' || data instanceof String) {
        data = JSON.parse(data);
    }
    
    let new_data = [];

    data.features?.map(d => {
        let item = {};
        
        item.name = d.properties["Title"];
        if (item.name === undefined) {
            console.log(`Data name not found for art with ID ${d.OBJECTID}`);
        }

        let coordinates = { longitude: d.geometry.coordinates[0], latitude: d.geometry.coordinates[1] };
        if (coordinates.longitude === undefined || coordinates.latitude === undefined) {
            console.log(`Data coordinates not found for art with ID ${d.OBJECTID}`);
        }
        item.coordinates = coordinates;

        item.details = {
          artist: d.properties["Artist"],
          description: d.properties["ProjectInitiative"]
        }

        new_data.push(item);
    })

    if (stringify) {
        return JSON.stringify(new_data, null);
    }

    return new_data;
}
    
return filter;
