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
  
    // convert JSON data to object form
    if (typeof data === 'string' || data instanceof String) {
        data = JSON.parse(data);
    }
  
    // define new data and errors array
    let new_data = [];
    let errors = [];

    data.features.map(d => {
        let item = {};
        let skip = false;
  
        // add name (required)
        if (!add_required(item, "name", d, d.attributes.ARTWORK_TITLE, errors)) {
            skip = true;
        }
  
        // add coordinates (required)
        let coordinates = {};
        if (!add_required(coordinates, "longitude", d, d.attributes.LONGITUDE, errors)) {
            skip = true;
        }
        if (!add_required(coordinates, "latitude", d, d.attributes.LATITUDE, errors)) {
            skip = true;
        }
        item.coordinates = coordinates;

        add_if_not_null(item, "description", d.attributes.DESCRIPTION);
        
        item.address = {
            street_address: d.attributes.STREET,
            zipcode: d.attributes.POSTAL_CODE,
            city: d.attributes.CITY,
            region: d.attributes.PROVINCE
        }
        item.address = remove_if_null(item.address);
        remove_if_empty(item, "address");

        item.details = {}
        add_if_not_null(item.details, "category", d.attributes.CATEGORY);
  
        // check for and remove empty details object
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
