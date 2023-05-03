const filter = function (data, std_lib, params) {
    // check for standard library and pull out required functions
    if (!std_lib) {
        throw "standard library not provided";
    }
    let add_required = std_lib.get("add_required");
    let add_if_not_null = std_lib.get("add_if_not_null")
    let remove_if_null = std_lib.get("remove_if_null");
    let remove_if_empty = std_lib.get("remove_if_empty");
    let validate_params = std_lib.get("validate_params");
    let remove_if_zero = std_lib.get("remove_if_zero");
    let remove_null_date_fields = std_lib.remove_null_date_fields;
    console.log(remove_null_date_fields)
    
    // validate parameters object
    params = validate_params(params);


    if (typeof data === 'string' || data instanceof String) {
        data = JSON.parse(data);
    }
    
    let new_data = [];

    data["features"].map(d => {
        let item = {};
        item.name = d.properties.MAP_LABEL;
        if (item.name === undefined) {
            console.log("Data name not found for art with url", d.url);
        }
        let coordinates = { longitude: d.geometry.coordinates[0], latitude: d.geometry.coordinates[1]};
        if (coordinates.longitude === undefined || coordinates.latitude === undefined) {
            console.log("Data coordinates not found for art with url", d.url);
        }
        item.coordinates = coordinates;

        //optional fields
        // item.artist = d.properties.ARTIST_FIRST_NAME + " " + d.properties.ARTIST_LAST_NAME
        let artist_name;
        if (d.properties.ARTIST_FIRST_NAME != null) artist_name = d.properties.ARTIST_FIRST_NAME;
        if (d.properties.ARTIST_LAST_NAME != null) artist_name += " " + d.properties.ARTIST_LAST_NAME;
        add_if_not_null(item, "artist", artist_name);


        item.dates = std_lib.dates_template

        add_if_not_null(item.dates.created, "year", d.properties["CONSTRUCTION_YEAR"]);
        add_if_not_null(item.dates.installed, "year", d.properties["INSTALLATION_YEAR"]);

        remove_null_date_fields(item);

        add_if_not_null(item.material, d.properties["MEDIUM"]);
        add_if_not_null(item.owner, d.properties["OWNERSHIP"]);
        add_if_not_null(item.area, d.properties["LOCATION"]);
        // add_if_not_null(item.address.street_address, d.properties["COMMON_LOCATION_REFERENCE"]);
        // add_if_not_null(item.address.city, d.properties["MUNICIPALITY"]);

        let details = {
            status: d.properties["STATUS"],
            landmark: d.properties["LANDMARK"]
        }

        details = remove_if_null(details);
        
        // remove_if_empty(item.date, "date_created");
        // remove_if_empty(item.date, "date_installed");
        // remove_if_empty(item, "date");
        item.details = details;
        new_data.push(item);
        console.log(item);
    })

    if (params.stringify) {
        return JSON.stringify(new_data, null);
    }

    return new_data;
}

return filter;
