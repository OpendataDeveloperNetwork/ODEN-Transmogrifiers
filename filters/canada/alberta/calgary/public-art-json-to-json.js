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

    // iterate through each data entry
    data.map(d => {
        let item = {};
        let skip = false;

        // add name (required)
        if (!add_required(item, "name", d, d.title, errors)) {
            skip = true;
        }
  
        // add coordinates (required)
        let coordinates = {};
        if (!add_required(coordinates, "longitude", d, d.point.coordinates[0], errors)) {
            skip = true;
        }
        if (!add_required(coordinates, "latitude", d, d.point.coordinates[1], errors)) {
            skip = true;
        }
        item.coordinates = coordinates;

        add_if_not_null(item, "artist", d.artist);
        add_if_not_null(item, "description", d.desc1);
    
        item.address = {}
        add_if_not_null(item.address, "street_address", d.address);
        remove_if_empty(item, "address");

        item.dates = create_dates_template();
        let given_date = d.modified_dt.split("T")[0];
        let date = given_date.split("-");
        add_if_not_null(item.dates.installed, "year", parseInt(date[0]));
        add_if_not_null(item.dates.installed, "month", parseInt(date[1]));
        add_if_not_null(item.dates.installed, "day", parseInt(date[2]));
        remove_null_date_fields(item);

        item.image_urls = []
        if (d.website.url) {
            item.image_urls.push(d.website.url);
        }
        remove_if_empty(item, "image_urls");

        item.misc = {}
        add_if_not_null(item.misc, "art_id", d.art_id);
        add_if_not_null(item.misc, "tab_name", d.tab_name);
        add_if_not_null(item.misc, "short_description", d.short_desc);

        item.misc = remove_if_null(item.misc);

        // check for and remove empty misc object
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