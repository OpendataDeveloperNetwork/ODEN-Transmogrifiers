const filter = function (data, std_lib, schema, validator, stringify) {
  // check for standard library and pull out required functions
  if (!std_lib) {
    throw "standard library not provided";
  }
  let add_required = std_lib.get("add_required");
  let add_if_not_null = std_lib.get("add_if_not_null")
  let remove_if_null = std_lib.get("remove_if_null");
  let remove_if_empty = std_lib.get("remove_if_empty");
  let validate_params = std_lib.get("validate_params");
  let create_dates_template = std_lib.get("create_dates_template");
  let remove_null_date_fields = std_lib.get("remove_null_date_fields");

  // validate parameters object
  schema = validate_params(schema, validator);

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

    let details = {};
    details.item_name = properties.Item_Name
    details.condition = properties.Condition
    details.approximate_value = properties.Approximate_value
    details.stock_item_or_custom_item = properties.Stock_Item_or_Custom_Item
    details.facility_id = properties.FACILITYID
    details.x_coord = properties.XCoord
    details.y_coord = properties.YCoord
    details.category_main_type = properties.CategoryMainType
    details.owner_private = properties.OwnerPrivate
    details.commission_amount = properties.CommissionAmount
    item.details = remove_if_null(details);
    // check for and remove empty details object
    remove_if_empty(item, "details");

    // skip adding to new data if required field not found
    if (!skip) {
      let result = validator.validate(item, schema, {
        required: true
      });
      if (!result.valid) {
        errors.push({
          type: "validation",
          validation_result: result,
          data_entry: d
        })
      } else {
        new_data.push(item);
      }
    }
  })


  // return data and convert to string if enabled
  if (stringify) {
    new_data = JSON.stringify(new_data, null);
  }

  return {
    data: new_data,
    errors: errors
  };
}

return filter;