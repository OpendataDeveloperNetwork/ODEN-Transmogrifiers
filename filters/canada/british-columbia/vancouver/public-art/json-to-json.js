const filter = async function(axios, Validator, data) {
    let new_data = [];
    data = JSON.parse(data);

    let schema = await axios({
        url: "https://raw.githubusercontent.com/OpendataDeveloperNetwork/ODEN-Transmogrifiers/prototype/schemas/public_art.schema.json", 
        method: 'GET',
        responseType: 'blob',
    })
    schema = JSON.parse(schema.data);
    
    data.map(d => {
        let item = {};
        item.name = d.title_of_work;
        item.location = d.geo_point_2d;
        new_data.push(item);
    })

    let v = new Validator();
    v.validate(new_data, schema, {required: true, throwFirst: true});

    return JSON.stringify(new_data, null);
}
return filter;