const filter = async function (axios, Validator, data) {
    let new_data = [];
    data = JSON.parse(data);

    schema = await axios({
        url: "https://raw.githubusercontent.com/OpendataDeveloperNetwork/ODEN-Transmogrifiers/prototype/schemas/public-art.schema.json",
        method: 'GET',
        responseType: 'blob',
    })
    schema = JSON.parse(schema.data);

    let v = new Validator();
    data.map(d => {
        let item = {};
        item.name = d.title_of_work;
        let coordinates = { longitude: d.geo_point_2d.lon, latitude: d.geo_point_2d.lat };
        item.coordinates = coordinates;
        v.validate(item, schema, { required: true, throwFirst: true });
        new_data.push(item);
    })

    return JSON.stringify(new_data, null);
}
return filter;