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
        if (d.primary_artist_first && d.primary_artist_first != "NULL" && d.primary_artist_last && d.primary_artist_last != "NULL") {
            full_name = d.primary_artist_first + " " + d.primary_artist_last;
        } else if (d.primary_artist_last && d.primary_artist_last != "NULL") {
            full_name = d.primary_artist_last
        } else if (d.primary_artist_first && d.primary_artist_first != "NULL") {
            full_name = d.primary_artist_first
        }
        add_if_not_null(item, "artist", full_name);

        item.dates = create_dates_template();
        add_if_not_null(item.dates.created, "year", d.date_created !== "NULL" ? d.date_created : null );
        remove_null_date_fields(item)

        item.address = {};
        add_if_not_null(item.address, "street_address", d.address !== "NULL" ? d.address : null);
        add_if_not_null(item.address, "city", d.city !== "NULL" ? d.city : null);
        add_if_not_null(item.address, "state", d.state !== "NULL" ? d.state : null);
        add_if_not_null(item.address, "zipcode", d.zip_code !== "NULL" ? d.zip_code : null);
        remove_if_null(item.address);
        remove_if_empty(item, "address")

        add_if_not_null(item, "description", d.inscription.replaceAll("/", "") !== "NULL" ? d.inscription.replaceAll("/", "") : null)
        add_if_not_null(item, "material", d.material !== "NULL" ? d.material : null);
        add_if_not_null(item, "type", d.artwork_type1 !== "NULL" ? d.artwork_type1 : null);
        add_if_not_null(item, "area", d.borough) !== "NULL" ? d.borough : null;

        // other item.misc
        item.misc = {};
        add_if_not_null(item.misc, "location", d.location_name !== "NULL" ? d.location_name : null);
        add_if_not_null(item.misc, "managing_agency", d.managing_city_agency !== "NULL" ? d.managing_city_agency : null);
        add_if_not_null(item.misc, "foundry", d.foundry !== "NULL" ? d.foundry : null);
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