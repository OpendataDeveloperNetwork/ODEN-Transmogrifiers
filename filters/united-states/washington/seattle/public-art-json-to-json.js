const filter = function (data, params) {
    // check for standard library and pull out required functions
    if (!params.lib) {
        throw "ODEN library not provided";
    }
    let add_required = params.lib.get("add_required");
    let add_if_not_null = params.lib.get("add_if_not_null")
    let remove_if_null = params.lib.get("remove_if_null");
    let remove_if_empty = params.lib.get("remove_if_empty");
    let create_dates_template = params.lib.get("create_dates_template");
    let remove_null_date_fields = params.lib.get("remove_null_date_fields");

    if (typeof data === 'string' || data instanceof String) {
        data = JSON.parse(data);
    }

    // define new data and errors array
    let new_data = [];
    let errors = [];

    data.map(d => {
        let item = {};
        let skip = false;

        // add name field
        if (!add_required(item, "name", d, d.title, errors)) {
            skip = true;
        }

        // add coordinate field
        let coordinates = {};
        if (!add_required(coordinates, "longitude", d, parseFloat(d.longitude), errors)) {
            skip = true;
        }
        if (!add_required(coordinates, "latitude", d, parseFloat(d.latitude), errors)) {
            skip = true;
        }
        item.coordinates = coordinates;

        // add artist field
        artist_full_name = [d.first_name, d.last_name].filter(Boolean).join(" ");
        add_if_not_null(item, "artist", artist_full_name);

        // add defined field
        add_if_not_null(item, "description", d.description);
        add_if_not_null(item, "material", d.media);
        item.address = {};
        if (d.geolocation.human_address) {
            let human_address_parsed = JSON.parse(d.geolocation.human_address);
            add_if_not_null(item.address, "street_address", human_address_parsed.address);
            add_if_not_null(item.address, "city", human_address_parsed.city);
            add_if_not_null(item.address, "region", human_address_parsed.state);
            add_if_not_null(item.address, "zip", human_address_parsed.zip);
        }
        remove_if_empty(item, "address");

        if (d.date) {
            item.dates = create_dates_template();
            add_if_not_null(item.dates.installed, "date_string", d.date)
        }

        // add optional detail fields
        let misc = {};

        misc.saction_id = d.sac_id;
        misc.project_name = d.project;
        misc.classification = d.classification;
        misc.measurement = d.measurements;
        item.misc = remove_if_null(misc);
        remove_if_empty(item, "misc")


        if (!skip) {
            new_data.push(item);
        }
    })

    return {
        data: new_data,
        errors: errors
    };
}

return filter;