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
    let create_dates_template = std_lib.get("create_dates_template");
    let remove_null_date_fields = std_lib.get("remove_null_date_fields");

    // validate parameters object
    schema = validate_params(schema, validator);

    // convert JSON data to object form
    if (typeof data === 'string' || data instanceof String) {
        data = JSON.parse(data);
    }

    // define new data and errors array
    let new_data = [];
    let errors = [];

    data.map(d => {
        let item = {};
        let skip = false;

        // add name (required)
        if (!add_required(item, "name", d, d.artwork_title, errors)) {
            skip = true;
        }

        // add coordinates (required)
        let coordinates = {};
        if (!add_required(coordinates, "longitude", d, parseFloat(d.location_longitude), errors)) {
            skip = true;
        }
        if (!add_required(coordinates, "latitude", d, parseFloat(d.location_latitude), errors)) {
            skip = true;
        }
        item.coordinates = coordinates;

        item.address = {};
        add_if_not_null(item.address, "street_address", d.location_street_address)
        add_if_not_null(item.address, "city", d.location_city)
        add_if_not_null(item.address, "region", d.location_state)
        remove_if_empty(item, "address");

        add_if_not_null(item, "artist", d.artist)
        add_if_not_null(item, "material", d.material)

        item.dates = create_dates_template();
        add_if_not_null(item.dates.installed, "date_string", d.artwork_date)
        remove_null_date_fields(item);


        let misc = {};
        item.misc = remove_if_null(misc)
        remove_if_empty(item, "misc");

        // skip adding to new data if required field not found
        if (!skip) {
            let result = validator.validate(item, schema, {
                required: true
            });
            if (!result.valid) {
                errors.push({
                    type: "validation",
                    validation_result: result,
                    data_entry: d
                })
            } else {
                new_data.push(item);
            }
        }
    })

    // return data and convert to string if enabled
    if (stringify) {
        new_data = JSON.stringify(new_data, null);
    }

    return {
        data: new_data,
        errors: errors
    };
}
return filter;