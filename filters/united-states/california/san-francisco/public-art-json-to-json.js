const filter = function (data, params) {
    // check for standard library and pull out required functions
    if (!params.lib) {
        throw "ODEN library not provided";
    }
    let add_required = params.lib.get("add_required");
    let add_if_not_null = params.lib.get("add_if_not_null")
    let remove_if_empty = params.lib.get("remove_if_empty");

    if (typeof data === 'string' || data instanceof String) {
        data = JSON.parse(data);
    }
    
    let new_data = [];
    let errors = [];
    
    data.map(d => {
        let item = {};
        let skip = false;

        let name;
        let artist;

        const title_field = d.title;
        if (title_field && title_field.includes("by")) {
            name_artist = title_field.split("by")
            name = name_artist[0].replace(/[^a-zA-Z 0-9]+/g,'').trim();
            artist = name_artist[1].trim(); 
        } else {
            name = title_field;
        }
        
        // add name (required)
        if (!add_required(item, "name", d, name, errors)) {
            skip = true;
        }

        // add coordinates (required)
        let coordinates = {};
        if (!add_required(coordinates, "longitude", d, d.the_geom.coordinates[0], errors)) {
            skip = true;
        }
        if (!add_required(coordinates, "latitude", d, d.the_geom.coordinates[1], errors)) {
            skip = true;
        }
        item.coordinates = coordinates;

        //optional fields
        add_if_not_null(item, "artist", artist);
        add_if_not_null(item, "description", d.descriptio);
        add_if_not_null(item, "type", d.type);
        add_if_not_null(item, "material", d.medium);
        add_if_not_null(item, "area", d.location);
        
        item.address = {};
        add_if_not_null(item.address, "street_address", d.name);
        remove_if_empty(item, "address");

        // skip adding to new data if required field not found
        if (!skip) {
            new_data.push(item);
        }
    })

    return {data: new_data, errors: errors};
}

return filter;