const filter = function (data, std_lib, params) {
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
    params = validate_params(params);
   
    // convert JSON data to object form
    if (typeof data === 'string' || data instanceof String) {
        data = JSON.parse(data);
    }
    
    // define new data and errors array
    let total_entries = 0;
    let new_data = [];
    let errors = [];

    // iterate through each data entry
    data.map(d => {
        let item = {};
        let skip = false;
        total_entries++;
        
        // add name (required)
        if (!add_required(item, "name", d, d.title_of_work, params.skip_errors, errors)) {
            skip = true;
        }
    
        // add coordinates (required)
        let coordinates = {};
        if (!add_required(coordinates, "longitude", d, d.geo_point_2d?.lon, params.skip_errors, errors)) {
            skip = true;
        }
        if (!add_required(coordinates, "latitude", d, d.geo_point_2d?.lat, params.skip_errors, errors)) {
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
            new_data.push(item);
        }
    })

    // check if errors occurred
    if (errors.length > 0) {
        // recording total entries and number of errors is needed for the validator
        let err = {message: "data entries missing required field(s) during filtering", total_entries: total_entries, num_errors: errors.length, errors: errors};
        throw err;
    }

    // validate new data against a schema
    if (params.validate) {
        new_data.map(d => {
            params.validator.validate(d, params.schema, {required: true, throwAll: true});
        })
    }

    // return data and convert to string if enabled
    if (params.stringify) {
        return JSON.stringify(new_data, null);
    }

    return new_data;
}
return filter;