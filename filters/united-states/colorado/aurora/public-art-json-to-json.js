const filter = function (data, std_lib, stringify, skip_errors) {
    data = JSON.parse(data);
    data = data.features;
    let new_data = [];

    data.map(d => {
        d = d.properties

        let item = {}

        item.name = d.SITE_NAME
        if (item.name === undefined) {
            console.log(`Data name not found`)
        }

        let coordinates = { longitude: d.POINT_X, latitude: d.POINT_Y };
        if (coordinates.longitude === undefined || coordinates.latitude === undefined) {
            console.log("Data coordinates not found")
        }
        item.coordinates = coordinates

        let details = {}
        details.title = d.ARTWORK_TITLE
        details.artist = d.ARTIST
        details.address = d.ADDRESS
        details.description = d.DESCRIPTION
        details.zip = d.ZIP
        item.details = details
        
        new_data.push(item)
    })


    if (stringify) {
        return JSON.stringify(new_data, null)
    } else {
        return new_data
    }

}
return filter
