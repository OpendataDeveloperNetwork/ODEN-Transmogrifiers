const filter = function (data, params) {
    // check for standard library and pull out required functions
    if (!params.library) {
        throw "ODEN library not provided";
    }
    let add_required = params.library.get("add_required");
    let add_if_not_null = params.library.get("add_if_not_null")
    let remove_if_null = params.library.get("remove_if_null");
    let remove_if_empty = params.library.get("remove_if_empty");
    let create_dates_template = params.library.get("create_dates_template");
    let remove_null_date_fields = params.library.get("remove_null_date_fields");
    
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
        item.coordinates = {};
        if (!add_required(item.coordinates, "longitude", d, parseFloat(d.longitude?.longitude), errors)) {
            skip = true;
        }
        if (!add_required(item.coordinates, "latitude", d, parseFloat(d.longitude?.latitude), errors)) {
            skip = true;
        }
        
        add_if_not_null(item, "description", d.description);
        add_if_not_null(item, "artist", d.artist);
        add_if_not_null(item, "material", d.medium);
        add_if_not_null(item, "area", d.suburb);

        item.dates = create_dates_template();
        add_if_not_null(item.dates.installed, "year", d.date);
        remove_null_date_fields(item);

        item.misc = {}
        add_if_not_null(item.misc, "acquisition_details", d.acquisition_details)
        remove_if_empty(item, "misc");
    
        // skip adding to new data if required field not found
        if (!skip) {
            new_data.push(item);
        }
    })

    return {data: new_data, errors: errors};
}
return filter;