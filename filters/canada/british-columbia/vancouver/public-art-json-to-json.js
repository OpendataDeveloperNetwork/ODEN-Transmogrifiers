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
  
    // iterate through each data entry
    data.map(d => {
        let item = {};
        let skip = false;
  
        // add name (required)
        if (!add_required(item, "name", d, d.title_of_work, errors)) {
            skip = true;
        }
  
        // add coordinates (required)
        let coordinates = {};
        if (!add_required(coordinates, "longitude", d, d.geo_point_2d?.lon, errors)) {
            skip = true;
        }
        if (!add_required(coordinates, "latitude", d, d.geo_point_2d?.lat, errors)) {
            skip = true;
        }
        item.coordinates = coordinates;
  
        // add optional fields
  
        // add details sequentially example
        item.details = {};
        add_if_not_null(item.details, "description", d.descriptionofwork);
        add_if_not_null(item.details, "artists_description", d.artistprojectstatement);
  
        // reset details for batch example
        item.details = {};
  
        // add details batch example
        item.details.description = d.descriptionofwork;
        item.details.artists_description = d.artistprojectstatement;
        item.details = remove_if_null(item.details);
  
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