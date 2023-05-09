const filter = function (data, params) {
    // check for standard library and pull out required functions
    if (!params.library) {
        throw "library not provided";
    }
    let add_required = params.library.get("add_required");
    let add_if_not_null = params.library.get("add_if_not_null")
    let remove_if_null = params.library.get("remove_if_null");
    let remove_if_empty = params.library.get("remove_if_empty");
    let create_dates_template = params.library.get("create_dates_template");
    let remove_null_date_fields = params.library.get("remove_null_date_fields");

    // convert JSON data to object form
    if (typeof data === 'string' || data instanceof String) {
        data = JSON.parse(data);
    }

    // define new data and errors array
    let new_data = [];
    let errors = [];

    // iterate through each data entry
    data.features.map(d => {
        let item = {};
        let skip = false;

        // add name (required)
        if (!add_required(item, "name", d, d.properties.Title, errors)) {
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

        let full_name = ""
        if (d.properties.Artist_First && d.properties.Artist_Last_) {
            full_name = d.properties.Artist_First + " " + d.properties.Artist_Last_
        } else if (d.properties.Artist_First) {
            full_name = d.properties.Artist_First
        } else if (d.properties.Artist_Last_) {
            full_name = d.properties.Artist_Last_
        }
        add_if_not_null(item, "artist", full_name);

        item.dates = create_dates_template();
        add_if_not_null(item.dates.created, "year", d.properties.Year_Created);
        remove_null_date_fields(item)

        item.address = {};
        add_if_not_null(item.address, "street_address", d.properties.Address);
        remove_if_empty(item, "address")

        add_if_not_null(item, "material", d.properties.Media);
        add_if_not_null(item, "type", d.properties.Type);
        add_if_not_null(item, "area", d.properties.Neighborhood);

        item.image_urls = [];
        image_urls = [d.properties.Image_Url];
        for (let i = 0; i < image_urls.length; i++) {
            if (image_urls[i] != null) {
                item.image_urls.push(image_urls[i])
            }
        }
        remove_if_empty(item, "image_urls")

        // other item.misc
        item.misc = {};
        add_if_not_null(item.misc, "location", d.properties.Specific_Location);
        add_if_not_null(item.misc, "tnt_area", d.properties.TNT_Area);
        item.misc = remove_if_null(item.misc);

        // check for and remove empty misc object
        remove_if_empty(item, "misc");

        // skip adding to new data if required field not found
        if (!skip) {
            new_data.push(item);
        }
    })

    return { data: new_data, errors: errors };
}
return filter;