const filter = function (data, stringify) {
    if (typeof data === 'string' || data instanceof String) {
        data = JSON.parse(data);
    }

    let new_data = [];

    data.map(d => {
        let item = {};

        item.name = d.title;
        if (item.name === undefined) {
            item.name = "";
            console.log(`Data name not found for art with description:\n ${d.description}`);
        }

        let coordinates = { longitude: parseFloat(d.longitude), latitude: parseFloat(d.latitude) };
        if (coordinates.longitude === undefined || coordinates.latitude === undefined) {
            console.log(`Data coordinates not found for art with description:\n ${d.description}`);
        }
        item.coordinates = coordinates;

        let details = {
            creator: d.creator,
            credit: d.credit,
            date: d.date,
            description: d.description,
            location: d.location,
            imagefile: d.imagefile,
            objectid: d.objectid,
            discipline: d.discipline,
            access: d.access
        };
        
        item.details = details;

        new_data.push(item);
    })

    if (stringify) {
        return JSON.stringify(new_data, null);
    }

    return new_data;
}

return filter;