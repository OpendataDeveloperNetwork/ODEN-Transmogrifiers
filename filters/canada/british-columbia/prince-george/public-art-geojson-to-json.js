const filter = function (data, params) {
    // check for standard library and pull out required functions
    if (!params.std_lib) {
        throw "standard library not provided";
    }
    let add_required = params.std_lib.get("add_required");
    let add_if_not_null = params.std_lib.get("add_if_not_null")
    let remove_if_null = params.std_lib.get("remove_if_null");
    let remove_if_empty = params.std_lib.get("remove_if_empty");
    let create_dates_template = params.std_lib.get("create_dates_template");
    let remove_null_date_fields = params.std_lib.get("remove_null_date_fields");
  
    // convert JSON data to object form
    if (typeof data === 'string' || data instanceof String) {
        data = JSON.parse(data);
    }
  
    // define new data and errors array
    let new_data = [];
    let errors = [];

    data.features?.map(d => {
        let item = {};
        let skip = false;

        // add name (required)
        if (!add_required(item, "name", d, d.properties.Title, errors)) {
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

        add_if_not_null(item, "artist", d.properties.Artist);
        add_if_not_null(item, "description", d.properties.Description);
        
        item.address = {};
        add_if_not_null(item.address, "street_address", d.properties.Location);
        remove_if_empty(item, "address");
        
        item.dates = create_dates_template();
        let unix_timestamp = d.properties.InstallDate;
        if (unix_timestamp) {
            let date = new Date(unix_timestamp).toLocaleDateString();
            let parsed_date = date.split("-");
            item.dates.installed = {
                year: parseInt(parsed_date[0]),
                month: parseInt(parsed_date[1]),
                day: parseInt(parsed_date[2])
            }
        }
        remove_null_date_fields(item);

        add_if_not_null(item, "value", d.properties.AcquisitionCost);
        add_if_not_null(item, "type", d.properties.SubType_TEXT);
        item.image_urls = [];
        if (d.properties.Photo) {
            item.image_urls.push(d.properties.Photo);
        }
        remove_if_empty(item, "image_urls");

        item.misc = {
            status: d.properties.LifeCycleStatus,
            administrative_area: d.properties.AdministrativeArea,
            asset_manager: d.properties.AssetManager,
            operational_area: d.properties.OperationalArea,
            warranty_date: d.properties.WarrantyDate,
            project_initiative: d.properties.ProjectInitiative,
            sponsor: d.properties.Sponsor,
            custodian: d.properties.Custodian,
            access: d.properties.Access,
            access_contact: d.properties.AccessContact,
            dimension: d.properties.Dimension,
            condition: d.properties.Condition,
            condition_date: d.properties.ConditionDate,
            deprecation_method: d.properties.DeprecationMethod,
            expected_life: d.properties.ExpectedLife,
            residual_valve: d.properties.ResidualValve
        };

        if (d.properties.Year) {
            item.misc.year = parseInt(d.properties.Year);
        }

        item.misc = remove_if_null(item.misc);
        remove_if_empty(item, "misc");

        // skip adding to new data if required field not found
        if (!skip) {
            new_data.push(item);
        }
    })
  
    return {data: new_data, errors: errors};
}
    
return filter;
