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

    data.features?.map(d => {
        let item = {};
        let skip = false;
        
        // add name (required)
        if (!add_required(item, "name", d, d.properties.Name, errors)) {
            skip = true;
        }

        // add coordinates (required)
        let coordinates = {};
        if (!add_required(coordinates, "longitude", d, d.properties.Longitude, errors)) {
            skip = true;
        }
        if (!add_required(coordinates, "latitude", d, d.properties.Latitude, errors)) {
            skip = true;
        }
        item.coordinates = coordinates;

        //optional fields
        // item.artist = d.properties.ARTIST_FIRST_NAME + " " + d.properties.ARTIST_LAST_NAME
        add_if_not_null(item, "artist", d.properties.Artist);
        add_if_not_null(item, "material", d.properties.Hours);
        add_if_not_null(item, "area", d.properties.Neighborhood);
        item.image_urls = [];
        if (d.properties.Pic_URL) {
            item.image_urls.push(d.properties.Pic_URL);
        }
        remove_if_empty(item, "image_urls");

        item.dates = create_dates_template();
        add_if_not_null(item.dates.installed, "year", d.properties.Year_Sort_FirstYr);
        remove_null_date_fields(item);

        item.address = {}
        add_if_not_null(item.address, "street_address", d.properties.Address);
        remove_if_empty(item, "address");

        item.details = {}
        add_if_not_null(item.details, "developer", d.properties.Developer);
        add_if_not_null(item.details, "desc1", d.properties.Desc1);
        add_if_not_null(item.details, "desc2", d.properties.Desc2);
        add_if_not_null(item.details, "desc3", d.properties.Desc3);
        add_if_not_null(item.details, "desc4", d.properties.Desc4);
        add_if_not_null(item.details, "desc5", d.properties.Desc5);
        remove_if_empty(item, "details");

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