const filter = function (data, params) {
    // check for standard library and pull out required functions
    if (!params.library) {
        throw "ODEN library not provided";
    }
    let add_required = params.library.get("add_required");
    let add_if_not_null = params.library.get("add_if_not_null")
    let remove_if_null = params.library.get("remove_if_null");
    let remove_if_empty = params.library.get("remove_if_empty");

    console.log(typeof(data))
    // convert JSON data to object form
    if (typeof data === 'string' || data instanceof String) {
        data = JSON.parse(data);
    }

    // define new data and errors array
    let new_data = [];
    let errors = [];

    console.log("typeof data after parsing:")
    console.log(typeof(data))

    data.map(d => {
        let item = {};
        let skip = false;

        // add name (required)
        if (!add_required(item, "name", d, d.art, errors)) {
            skip = true;
        }

        // add coordinates (required)
        let coordinates = {};
        if (!add_required(coordinates, "longitude", d, parseFloat(d.longitude), errors)) {
            skip = true;
        }
        if (!add_required(coordinates, "latitude", d, parseFloat(d.latitude), errors)) {
            skip = true;
        }
        item.coordinates = coordinates;

        add_if_not_null(item, "artist", d.artist);
        add_if_not_null(item, "owner", d.owner);

        // add misc sequentially
        item.misc = {}

        add_if_not_null(item.misc, "park_name", d.park_name);
        add_if_not_null(item.misc, "park_number", d.park_number);

        item.misc = remove_if_null(item.misc);
        // check for and remove empty misc object
        remove_if_empty(item, "misc");

        // skip adding to new data if required field not found
        if (!skip) {
            new_data.push(item);
        }
    })

    return new_data;
}

return filter;
