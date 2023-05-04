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
        if (!add_required(item, "name", d, d.title, errors)) {
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

        item.dates = create_dates_template();
        add_if_not_null(item.dates.installed, "year", d.date)
        remove_null_date_fields(item)

        add_if_not_null(item, "artist", d.creator);
        add_if_not_null(item, "description", d.description);
        add_if_not_null(item, "area", d.location);
        add_if_not_null(item, "type", d.discipline);
        if (d.imagefile) {
            item.image_urls = [d.imagefile]
        }

        // add details sequentially
        item.details = {}

        add_if_not_null(item.details, "credit", d.credit);
        add_if_not_null(item.details, "objectid", d.objectid);
        add_if_not_null(item.details, "access", d.access);

        item.details = remove_if_null(item.details);
        // check for and remove empty details object
        remove_if_empty(item, "details");

        // skip adding to new data if required field not found
        if (!skip) {
            let result = validator.validate(item, schema, { required: true });
            if (!result.valid) {
                errors.push({ type: "validation", validation_result: result, data_entry: d })
            } else {
                new_data.push(item);
            }
        }
    })

    // return data and convert to string if enabled
    if (stringify) {
        new_data = JSON.stringify(new_data, null);
    }

    return { data: new_data, errors: errors };
}

return filter;