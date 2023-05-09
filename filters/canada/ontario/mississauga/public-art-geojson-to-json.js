const filter = function (data, params) {
    // check for standard library and pull out required functions
    if (!params.lib) {
        throw "ODEN ODEN library not provided";
    }
    let add_required = params.lib.get("add_required");
    let add_if_not_null = params.lib.get("add_if_not_null")
    let remove_if_empty = params.lib.get("remove_if_empty");
    let remove_null_date_fields = params.lib.get("remove_null_date_fields");
    let create_dates_template = params.lib.get("create_dates_template");

    if (typeof data === 'string' || data instanceof String) {
        data = JSON.parse(data);
    }
    
    let new_data = [];
    let errors = [];

    data["features"].map(d => {
        let item = {};
        let skip = false;
        
        // add name (required)
        if (!add_required(item, "name", d, d.properties["Name"], errors)) {
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
        add_if_not_null(item, "artist", d.properties.Artist_Name);
        add_if_not_null(item, "description", d.properties.Description);
        add_if_not_null(item, "owner", d.properties.Owner);
        add_if_not_null(item, "area", d.properties.Location);
        add_if_not_null(item, "material", d.properties.Media_or_Material_s_);
        
        item.dates = create_dates_template();
        add_if_not_null(item.dates.created, "year", d.properties.Year_Created);
        add_if_not_null(item.dates.installed, "year", d.properties.Year_Aquired_Installed);
        remove_null_date_fields(item);

        item.address = {};
        if (d.properties.Address) {
            address = d.properties.Address;
            address = address.split(",");
            if (address.length >= 4) {
                add_if_not_null(item.address, "street_address", address[0].trim());
                add_if_not_null(item.address, "city", address[1].trim());
                add_if_not_null(item.address, "region", address[2].trim());
                add_if_not_null(item.address, "zipcode", address[3].trim());
                add_if_not_null(item.address, "country", "Canada");
            } else {
                add_if_not_null(item.address, "street_address", address[0]);
            }
        }
        remove_if_empty(item, "address");

        // skip adding to new data if required field not found
        if (!skip) {
            new_data.push(item);
        }
    })

    return {data: new_data, errors: errors};
}

return filter;