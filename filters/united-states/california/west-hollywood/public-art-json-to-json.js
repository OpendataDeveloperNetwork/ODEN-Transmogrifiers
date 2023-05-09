const filter = function (data, params) {
  // check for standard library and pull out required functions
  if (!params.library) {
    throw "ODEN library not provided";
  }
  let add_required = params.library.get("add_required");
  let add_if_not_null = params.library.get("add_if_not_null");
  let remove_if_null = params.library.get("remove_if_null");
  let remove_if_empty = params.library.get("remove_if_empty");
  let create_dates_template = params.library.get("create_dates_template");
  let remove_null_date_fields = params.library.get("remove_null_date_fields");

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
    if (!add_required(item, "name", d, d.art_installation_name, errors)) {
      skip = true;
    }

    // add coordinates (required)
    let coordinates = {};
    if (!add_required(coordinates, "longitude", d, parseFloat(d.location.longitude), errors)) {
      skip = true;
    }
    if (!add_required(coordinates, "latitude", d, parseFloat(d.location.latitude), errors)) {
      skip = true;
    }
    item.coordinates = coordinates;

    item.address = {}
    add_if_not_null(item.address, "street_address", d.location_description);
    item.address = remove_if_null(item.address);
    // check for and remove empty address object
    remove_if_empty(item, "address")

    //check for null name and date
    if (d.artist_name_and_date) {
      let name_and_date = d.artist_name_and_date.split(",");
      add_if_not_null(item, "artist", name_and_date[0]);
      item.dates = create_dates_template();
      if (name_and_date[1]) {
        add_if_not_null(item.dates.installed, "year", name_and_date[1]);
        remove_null_date_fields(item);
      }
    }
    if (d.image_or_artist_site) {
      item.image_urls = [d.image_or_artist_site]
    }
    
    add_if_not_null(item, "type", d.art_type);


    // skip adding to new data if required field not found
    if (!skip) {
      new_data.push(item);
    }
  })

  return { data: new_data, errors: errors };
}
return filter;


