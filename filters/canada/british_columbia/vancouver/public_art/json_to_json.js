let new_data = [];
data = JSON.parse(data);

// pull schema?

data.map(d => {
    let item = {};
    item.name = d.title_of_work;
    item.location = d.geo_point_2d;
    new_data.push(item);
})

// validate with schema?

return JSON.stringify(new_data, null);