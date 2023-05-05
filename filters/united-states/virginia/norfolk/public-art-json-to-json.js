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
    let total_entries = 0;
    let new_data = [];
    let errors = [];

    data.map(d => {
        let item = {};
        let skip = false;
        let properties = d.properties

        // add name (required)
        if (!add_required(item, "name", properties, properties.artwork_name, errors)) {
            skip = true;
        }

        // add coordinates (required)
        let coordinates = {};
        if (!add_required(coordinates, "longitude", properties, parseFloat(properties.x_coordinate), errors)) {
            skip = true;
        }
        if (!add_required(coordinates, "latitude", properties, parseFloat(properties.y_coordinate), errors)) {
            skip = true;
        }
        item.coordinates = coordinates;

        item.address = {}
        add_if_not_null(item.address, "street_address", properties.street_address);
        remove_if_empty(item, "address")

        add_if_not_null(item, "artist", properties.artist);
        if (properties.installation_date) {
            item.dates = create_dates_template();
            if (properties.installation_date.includes("/\\")) {
                let date_split = properties.installation_date.split("/\\");
                add_if_not_null(item.dates.installed, "month", date_split[0]);
                add_if_not_null(item.dates.installed, "day", date_split[1]);
                add_if_not_null(item.dates.installed, "year", date_split[2]);
            } else {
                add_if_not_null(item.dates.installed, "year", properties.installation_date);
            }
        } else {
            item.dates.installed.date_string = properties.installation_date;
        }
        remove_null_date_fields(item);

        item.image_urls = []
        if (properties.weblink) {
            item.image_urls.push(properties.weblink);
        }
        remove_if_empty(item, "image_urls")

        add_if_not_null(item, "budget", parseInt(properties.budget.replace('$', '').replace(',', '')));


        let misc = {};
        misc.location = properties.location;
        misc.media = properties.media;
        misc.category = properties.category;
        misc.credit = properties.credit;
        misc.geocoded_column = properties.geocoded_column;
        item.misc = remove_if_null(misc);
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