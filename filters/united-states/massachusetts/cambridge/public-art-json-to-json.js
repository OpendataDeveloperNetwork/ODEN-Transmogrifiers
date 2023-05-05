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

  // iterate through each data entry
  data.map(d => {
      let item = {};
      let skip = false;

      // add name (required)
      if (!add_required(item, "name", d, d.list_title, errors)) {
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
  
      add_if_not_null(item, "artist", d.artist_ful);
      add_if_not_null(item, "material", d.detailed_m);
      add_if_not_null(item, "type", d.object_typ);
      add_if_not_null(item, "area", d.neighborho);
      
      if(d.created_da && d.created_da.includes("T")){
          item.dates = create_dates_template();
          regular_date = d.created_da.split("T")[0]
          add_if_not_null(item.dates.created, "year", parseInt(regular_date.split("-")[0]));
          add_if_not_null(item.dates.created, "month", parseInt(regular_date.split("-")[1]));
          add_if_not_null(item.dates.created, "date", parseInt(regular_date.split("-")[2]));
          remove_null_date_fields(item)
      }
      
      item.image_urls = [];
      image_urls = [d.photo_webs];
      for (let i = 0; i < image_urls.length; i++) {
        if (image_urls[i] != null) {
          item.image_urls.push(image_urls[i])
        }
      }
      remove_if_empty(item, "image_urls")
      
      //other item.misc
      item.misc = {};
      add_if_not_null(item.misc, "location", d.location);
      add_if_not_null(item.misc, "art_year", d.art_year);
      add_if_not_null(item.misc, "dimensions", d.dimensions);
      item.misc = remove_if_null(item.misc);

      // check for and remove empty misc object
      remove_if_empty(item, "misc");

      // skip adding to new data if required field not found
      if (!skip) {
          let result = validator.validate(item, schema, { required: true });
          if (!result.valid) {
              errors.push({type: "validation", validation_result: result, data_entry: d})
          } else {
              new_data.push(item);
          }
      }
  })

  // return data and convert to string if enabled
  if (stringify) {
      new_data = JSON.stringify(new_data, null);
  }
  return {data: new_data, errors: errors};
}
return filter;