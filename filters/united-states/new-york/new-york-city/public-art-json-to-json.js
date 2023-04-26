const filter = function (data, stringify) {
    if (typeof data === 'string' || data instanceof String) {
        data = JSON.parse(data);
    }

    let new_data = [];

    data.map(d => {
        let item = {};
        item.name = d.title;
        if (item.name === undefined) {
            console.log(`Data name not found for art with url ${d.url}`);
        }
        let coordinates = { longitude: d.longitude, latitude: d.latitude };
        if (coordinates.longitude === undefined || coordinates.latitude === undefined) {
            console.log(`Data coordinates not found for art with url ${d.url}`);
        }
        item.coordinates = coordinates;

	item.details = {
		date_created : d.date_created,
		artwork_type1 : d.artwork_type1,
		artwork_type2 : d.artwork_type2,
		material : d.material,
		location_name : d.location_name,
		address : d.address,
		city : d.city,
		state : d.state,
		zip_code : d.zip_code,
		borough : d.borough,
		subject_keyword : d.subject_keyword,
		inscription : d.inscription,
		acquisition : d.acquisition
	}
        new_data.push(item);
    })

    if (stringify) {
        return JSON.stringify(new_data, null);
    }

    return new_data;
}

return filter;
