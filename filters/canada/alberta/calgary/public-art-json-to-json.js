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
        if (!add_required(coordinates, "longitude", d, d.point.coordinates[0], errors)) {
            skip = true;
        }
        if (!add_required(coordinates, "latitude", d, d.point.coordinates[1], errors)) {
            skip = true;
        }
        item.coordinates = coordinates;

        add_if_not_null(item, "artist", d.artist);
        add_if_not_null(item, "description", d.desc1);
    
        item.address = {}
        add_if_not_null(item.address, "street_address", d.address);
        remove_if_empty(item, "address");

        item.dates = create_dates_template();
        let given_date = d.modified_dt.split("T")[0];
        let date = given_date.split("-");
        add_if_not_null(item.dates.installed, "year", parseInt(date[0]));
        add_if_not_null(item.dates.installed, "month", parseInt(date[1]));
        add_if_not_null(item.dates.installed, "day", parseInt(date[2]));
        remove_null_date_fields(item);

        item.image_urls = []
        if (d.website.url) {
            item.image_urls.push(d.website.url);
        }
        remove_if_empty(item, "image_urls");

        item.misc = {}
        add_if_not_null(item.misc, "art_id", d.art_id);
        add_if_not_null(item.misc, "tab_name", d.tab_name);
        add_if_not_null(item.misc, "short_description", d.short_desc);

        item.misc = remove_if_null(item.misc);

        // check for and remove empty misc object
        remove_if_empty(item, "misc");
        
        // skip adding to new data if required field not found
        if (!skip) {
            new_data.push(item);
        }
    })
  
    return {data: new_data, errors: errors};
}

return filter;