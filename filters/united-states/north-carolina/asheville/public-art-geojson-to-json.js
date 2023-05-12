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
        if (!add_required(item, "name", d, d.properties.name, errors)) {
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

        if(d.properties.artist == "string" && d.properties.artist.trim().length !== 0){
            add_if_not_null(item, "artist", d.properties.artist);
        }

        item.dates = create_dates_template();
        let unix_timestamp = d.properties.edit_date
        if (unix_timestamp) {
            let date = new Date(unix_timestamp).toLocaleDateString();
            let parsed_date = date.split("-")
            item.dates.created = {
                year: parsed_date[0],
                month: parsed_date[1],
                day: parsed_date[2]
            }
        }
        remove_null_date_fields(item)

        add_if_not_null(item, "type", d.properties.type);

        item.image_urls = [];
        image_urls = [d.properties.image];
        for (let i = 0; i < image_urls.length; i++) {
            if (image_urls[i] != null) {
                item.image_urls.push(image_urls[i])
            }
        }
        remove_if_empty(item, "image_urls")

        // other item.misc
        item.misc = {};
        add_if_not_null(item.misc, "location", d.properties.location);
        add_if_not_null(item.misc, "objectid", d.properties.objectid);
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