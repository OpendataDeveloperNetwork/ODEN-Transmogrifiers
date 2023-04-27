const filter = function (data, std_lib, stringify, skip_errors) {
  if (typeof data === 'string' || data instanceof String) {
      data = JSON.parse(data);
  }
  
  let new_data = [];

  data.features.map(d => {
      let item = {};
      let attributes = d.attributes;
      item.name = attributes.TitleOfWork;
      if (item.name === undefined) {
        console.log(`Data name not found for art with url ${attributes.FrontPhoto}`);
      }
      let geometry = d.geometry
      let coordinates = { latitude: geometry?.x, longitude: geometry?.y};
      if (coordinates.latitude === undefined || coordinates.longitude === undefined) {
        console.log(`Data coordinates not found for art with url ${attributes.FrontPhoto}`);
      }
      item.coordinates = coordinates;
      let details = {};
      details.object_id = attributes.OBJECTID
      details.item_id = attributes.Item_ID
      details.updated = attributes.Updated
      details.item_name = attributes.Item_Name
      details.condition = attributes.Condition
      details.approximate_value = attributes.Approximate_value
      details.stock_item_or_custom_item = attributes.Stock_Item_or_Custom_Item
      details.facility_id = attributes.FACILITYID
      details.x_coord = attributes.XCoord
      details.y_coord = attributes.YCoord
      details.category_main_type = attributes.CategoryMainType
      details.front_photo = attributes.FrontPhoto
      details.back_photo = attributes.BackPhoto
      details.damage_photo = attributes.DamagePhoto
      details.general_photo = attributes.GeneralPhoto
      details.location_photo = attributes.LocationPhoto
      details.artist = attributes.Artist
      details.year_installed = attributes.YearInstalled
      details.com_source = attributes.ComSource
      details.owner_private = attributes.OwnerPrivate
      details.commission_amount = attributes.CommissionAmount
      details.current_value = attributes.CurrentValue
      details.int_ext = attributes.IntExt
      details.com_source_other = attributes.ComSourceOther
      details.owner = attributes.Owner

      item.details = details;
  
      new_data.push(item);
  })

  if (stringify) {
      return JSON.stringify(new_data, null);
  }

  return new_data;
}

return filter;