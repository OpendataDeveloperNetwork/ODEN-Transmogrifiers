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

  data.features.map(d => {
    let item = {};
    let skip = false;
    let properties = d.properties
    // add name (required)
    if (!add_required(item, "name", properties, properties.TitleOfWork, errors)) {
      skip = true;
    }

    // add coordinates (required)
    let coordinates = {};
    if (!add_required(coordinates, "longitude", d, d.geometry.coordinates[1], errors)) {
      skip = true;
    }
    if (!add_required(coordinates, "latitude", d, d.geometry.coordinates[0], errors)) {
      skip = true;
    }
    item.coordinates = coordinates;

    item.image_urls = [];
    image_urls = [properties.FrontPhoto, properties.BackPhoto, properties.DamagePhoto, properties.GeneralPhoto, properties.LocationPhoto]
    for (let i = 0; i < image_urls.length; i++) {
      if (image_urls[i] != null) {
        item.image_urls.push(image_urls[i])
      }
    }
    remove_if_empty(item, "image_urls")

    add_if_not_null(item, "artist", properties.Artist)
    add_if_not_null(item, "value", properties.CurrentValue)
    add_if_not_null(item, "owner", properties.Owner)

    item.dates = create_dates_template();
    add_if_not_null(item.dates.installed, "date_string", properties.YearInstalled)
    remove_null_date_fields(item);

    let misc = {};
    misc.item_name = properties.Item_Name
    misc.condition = properties.Condition
    misc.approximate_value = properties.Approximate_value
    misc.stock_item_or_custom_item = properties.Stock_Item_or_Custom_Item
    misc.facility_id = properties.FACILITYID
    misc.x_coord = properties.XCoord
    misc.y_coord = properties.YCoord
    misc.category_main_type = properties.CategoryMainType
    misc.owner_private = properties.OwnerPrivate
    misc.commission_amount = properties.CommissionAmount
    item.misc = remove_if_null(misc);
    // check for and remove empty misc object
    remove_if_empty(item, "misc");

    // skip adding to new data if required field not found
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