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
        if (!add_required(item, "name", d, d.title_of_work, errors)) {
            skip = true;
        }
  
        // add coordinates (required)
        let coordinates = {};
        if (!add_required(coordinates, "longitude", d, d.geo_point_2d?.lon, errors)) {
            skip = true;
        }
        if (!add_required(coordinates, "latitude", d, d.geo_point_2d?.lat, errors)) {
            skip = true;
        }
        item.coordinates = coordinates;

        item.dates = create_dates_template();
        add_if_not_null(item.dates.installed, "year", d.yearofinstallation);
        remove_null_date_fields(item);
        
        add_if_not_null(item, "description", d.descriptionofwork);
        
        item.address = {}
        add_if_not_null(item.address, "street_address", d.streetaddress);
        remove_if_empty(item, "address");

        add_if_not_null(item, "material", d.primarymaterial);
        add_if_not_null(item, "owner", d.ownership);
        add_if_not_null(item, "type", d.type);
        add_if_not_null(item, "area", d.neighbourhood);
        item.image_urls = [];
        if (d.url) {
            item.image_urls.push(d.url);
        }
        remove_if_empty(item, "image_urls");

        // For misc details, you can add them using one of the following two ways:
        // 1) add misc sequentially example
        item.misc = {};
        add_if_not_null(item.misc, "artists_description", d.artistprojectstatement);    
        add_if_not_null(item.misc, "status", d.status);
        add_if_not_null(item.misc, "photo_credit", d.photocredits);
        add_if_not_null(item.misc, "site_name", d.sitename);
        add_if_not_null(item.misc, "location_site", d.locationonsite);
        add_if_not_null(item.misc, "geo_local_area", d.geo_local_area);

        // 2) add misc batch example
        item.misc = {
            artists_description: d.artistprojectstatement,
            status: d.status,
            photo_credit: d.photocredits,
            site_name: d.sitename,
            location_site: d.locationonsite,
            geo_local_area: d.geo_local_area,         
        };

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