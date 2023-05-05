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
    let remove_null_date_fields = std_lib.get("remove_null_date_fields");
    let create_dates_template = std_lib.get("create_dates_template");
    
    // validate parameters object
    schema = validate_params(schema, validator);

    if (typeof data === 'string' || data instanceof String) {
        data = JSON.parse(data);
    }
    
    let new_data = [];
    let errors = [];

    data["features"].map(d => {
        let item = {};
        let skip = false;
        
        // add name (required)
        if (!add_required(item, "name", d, d.properties.MAP_LABEL, errors)) {
            skip = true;
        }

        // add coordinates (required)
        let coordinates = {};
        if (!add_required(coordinates, "longitude", d, d.geometry.coordinates[0], errors)) {
            skip = true;
        }
        if (!add_required(coordinates, "latitude", d, d.geometry.coordinates[1], errors)) {
            skip = true;
        }
        item.coordinates = coordinates;

        //optional fields
        // item.artist = d.properties.ARTIST_FIRST_NAME + " " + d.properties.ARTIST_LAST_NAME
        let artist_name;
        if (d.properties.ARTIST_FIRST_NAME) artist_name = d.properties.ARTIST_FIRST_NAME + " ";
        if (d.properties.ARTIST_LAST_NAME) artist_name += d.properties.ARTIST_LAST_NAME;
        add_if_not_null(item, "artist", artist_name);

        item.dates = create_dates_template();
        add_if_not_null(item.dates.created, "year", d.properties["CONSTRUCTION_YEAR"]);
        add_if_not_null(item.dates.installed, "year", d.properties["INSTALLATION_YEAR"]);
        remove_null_date_fields(item);

        add_if_not_null(item, "material", d.properties["MEDIUM"]);
        add_if_not_null(item, "owner", d.properties["OWNERSHIP"]);
        add_if_not_null(item, "area", d.properties["LOCATION"]);
        add_if_not_null(item, "type", d.properties["TYPE"]);

        // Not sure if "INITIAL_COST" refers to budget!
        add_if_not_null(item, "budget", d.properties["INITIAL_COST"]);

        item.address = {}
        add_if_not_null(item.address, "street_address", d.properties["COMMON_LOCATION_REFERENCE"]);
        add_if_not_null(item.address, "city", d.properties["MUNICIPALITY"]);
        remove_if_empty(item, "address");

        item.misc = {}
        add_if_not_null(item.misc, "status", d.properties["STATUS"]);
        remove_if_empty(item, "misc");

        // skip adding to new data if required field not found
        if (!skip) {
            let result = validator.validate(item, schema, { required: true });
            if (!result.valid) {
                errors.push({type: "validation", validation_result: result, data_entry: d})
            } else {
                new_data.push(item);
            }
        }
    })

    // return data and convert to string if enabled
    if (stringify) {
        new_data = JSON.stringify(new_data, null);
    }

    return {data: new_data, errors: errors};
}

return filter;
