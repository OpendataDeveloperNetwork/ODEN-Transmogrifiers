const filter = function (data, std_lib, stringify, skip_errors) {
    if (typeof data === 'string' || data instanceof String) {
        data = JSON.parse(data);
    }
    
    let new_data = [];

    data.features?.map(data => {
        let d = data.properties || {}
        let item = {};
        
        item.name = d.Name;
        if (item.name === undefined) {
            console.log(`Data name not found for art with ID ${d.OBJECTID}`);
        }

        let coordinates = { longitude: d.Longitude, latitude: d.Latitude };
        if (coordinates.longitude === undefined || coordinates.latitude === undefined) {
            console.log(`Data coordinates not found for art with ID ${d.OBJECTID}`);
        }
        item.coordinates = coordinates;

        item.details = {
          artist: d.Artist,
          year: d.Year,
          address: d.Address,
          hours: d.Hours,
          tab_name: d.Tab_Name,
          short_desc: d.Short_Desc,
          desc1: d.Desc1,
          desc2: d.Desc2,
          desc3: d.Desc3,
          desc4: d.Desc4,
          desc5: d.Desc5,
          neighborhood: d.Neighborhood,
          developer: d.Developer,
          website: d.Website,
          pic_url: d.Pic_URL,
        }

        new_data.push(item);
    })

    if (stringify) {
        return JSON.stringify(new_data, null);
    }

    return new_data;
}
    
return filter;