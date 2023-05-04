const filter = function (data, std_lib, schema, validator, stringify) {
    // check for standard library and pull out required functions
    if (!std_lib) {
        throw "standard library not provided";
    }
    let add_required = std_lib.get("add_required");
    let add_if_not_null = std_lib.get("add_if_not_null")
    let remove_if_null = std_lib.get("remove_if_null");
    let remove_if_empty = std_lib.get("remove_if_empty");
    let validate_params = std_lib.get("validate_params");

    // validate parameters object
    schema = validate_params(schema, validator);

    if (typeof data === 'string' || data instanceof String) {
        data = JSON.parse(data);
    }

    // define new data and errors array
    let new_data = [];
    let errors = [];

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
