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
        if (!add_required(coordinates, "longitude", d, parseFloat(d.longitude), errors)) {
            skip = true;
        }
        if (!add_required(coordinates, "latitude", d, parseFloat(d.latitude), errors)) {
            skip = true;
        }
        item.coordinates = coordinates;
        
        let full_name = "";
        if (d.primary_artist_last && d.primary_artist_last != "NULL"){
          full_name = d.primary_artist_first + " " + d.primary_artist_last;
        } else if(d.primary_artist_first != "NULL"){
          full_name = d.primary_artist_first
        } else if(d.primary_artist_first != "NULL"){
          full_name = d.primary_artist_last  
        }
        add_if_not_null(item, "artist", full_name);
        
        item.dates = create_dates_template();
        add_if_not_null(item.dates.created, "year", d.date_created);
        remove_null_date_fields(item)
  
        item.address={};
        add_if_not_null(item.address, "street_address", d.address);
        add_if_not_null(item.address, "city", d.city);
        add_if_not_null(item.address, "state", d.state);
        add_if_not_null(item.address, "zipcode", d.zip_code);
        remove_if_empty(item, "address")
        
        add_if_not_null(item, "description", d.inscription.replaceAll("/", ""))
        add_if_not_null(item, "material", d.material);
        add_if_not_null(item, "type", d.artwork_type1);
        add_if_not_null(item, "area", d.borough);
      
        // other item.details
        item.details = {};
        add_if_not_null(item.details, "location", d.location_name);
        add_if_not_null(item.details, "managing_agency", d.managing_city_agency);
        add_if_not_null(item.details, "foundry", d.foundry);
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