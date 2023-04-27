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
        let coordinates = { longitude: d.latitude, latitude: d.longitude };
        if (coordinates.longitude === undefined || coordinates.latitude === undefined) {
            console.log(`Data coordinates not found for art with url ${d.url}`);
        }
        item.coordinates = coordinates;

        // for optional not currently standardized fields.
        let details = {};

        details.saction_id = d.sac_id;
        details.project_name = d.project;
        details.artist_first_name = d.artist_first_name;
        details.artist_last_name = d.artist_last_name;
        details.description = d.description;
        details.classification = d.classification;
        details.media = d.media;
        details.mesurement = d.measurements;
        details.date = d.date;
        details.address = d.address;
        details.geolocation = d.geolocation;        


        // add optional details
        item.details = details;

        // add the filtered item to the new data
        new_data.push(item);
    })

    if (stringify) {
        return JSON.stringify(new_data, null);
    }

    return new_data;
}

// for testing purposes, comment return
//return filter;

fetch("https://data.seattle.gov/resource/j7sn-tdzk.json")
.then(response => response.json())
.then(data => {
    console.log(filter(data));
})
.catch(error => console.log(error));
