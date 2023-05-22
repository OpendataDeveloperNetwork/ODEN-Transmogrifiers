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

        item.dates = create_dates_template();
        add_if_not_null(item.dates.installed, "year", d.date)
        remove_null_date_fields(item)

        add_if_not_null(item, "artist", d.creator);
        add_if_not_null(item, "description", d.description);
        add_if_not_null(item, "area", d.location);
        add_if_not_null(item, "type", d.discipline);
        if (d.imagefile) {
            item.image_urls = [d.imagefile]
        }

        // add detamiscils sequentially
        item.misc = {}

        add_if_not_null(item.misc, "credit", d.credit);
        add_if_not_null(item.misc, "objectid", d.objectid);
        add_if_not_null(item.misc, "access", d.access);

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