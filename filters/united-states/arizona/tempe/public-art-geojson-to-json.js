const filter = function (data, params) {
    // check for standard library and pull out required functions
    if (!params.library) {
        throw "ODEN library not provided";
    }
    let add_required = params.library.get("add_required");
    let add_if_not_null = params.library.get("add_if_not_null")
    let remove_if_null = params.library.get("remove_if_null");
    let remove_if_empty = params.library.get("remove_if_empty");
    let remove_null_date_fields = params.library.get("remove_null_date_fields");
    let create_dates_template = params.library.get("create_dates_template");

    if (typeof data === 'string' || data instanceof String) {
        data = JSON.parse(data);
    }
    
    let new_data = [];
    let errors = [];

    data.features?.map(d => {
        let item = {};
        let skip = false;
        
        // add name (required)
        if (!add_required(item, "name", d, d.properties.Name, errors)) {
            skip = true;
        }

        // add coordinates (required)
        let coordinates = {};
        if (!add_required(coordinates, "longitude", d, d.properties.Longitude, errors)) {
            skip = true;
        }
        if (!add_required(coordinates, "latitude", d, d.properties.Latitude, errors)) {
            skip = true;
        }
        item.coordinates = coordinates;

        //optional fields
        // item.artist = d.properties.ARTIST_FIRST_NAME + " " + d.properties.ARTIST_LAST_NAME
        add_if_not_null(item, "artist", d.properties.Artist);
        add_if_not_null(item, "material", d.properties.Hours);
        add_if_not_null(item, "area", d.properties.Neighborhood);
        item.image_urls = [];
        if (d.properties.Pic_URL) {
            item.image_urls.push(d.properties.Pic_URL);
        }
        remove_if_empty(item, "image_urls");

        item.dates = create_dates_template();
        add_if_not_null(item.dates.installed, "year", d.properties.Year_Sort_FirstYr);
        remove_null_date_fields(item);

        item.address = {}
        add_if_not_null(item.address, "street_address", d.properties.Address);
        remove_if_empty(item, "address");

        item.misc = {}
        add_if_not_null(item.misc, "developer", d.properties.Developer);
        add_if_not_null(item.misc, "desc1", d.properties.Desc1);
        add_if_not_null(item.misc, "desc2", d.properties.Desc2);
        add_if_not_null(item.misc, "desc3", d.properties.Desc3);
        add_if_not_null(item.misc, "desc4", d.properties.Desc4);
        add_if_not_null(item.misc, "desc5", d.properties.Desc5);
        remove_if_empty(item, "misc");

        // skip adding to new data if required field not found
        if (!skip) {
            new_data.push(item);
        }
    })

    return {data: new_data, errors: errors};
}

return filter;