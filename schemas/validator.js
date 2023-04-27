const { default: axios } = require("axios");
const validator = require('jsonschema').Validator;


const filter = function(data, stringify) {
    if (typeof data === 'string' || data instanceof String) {
        data = JSON.parse(data);
    }
    
    let new_data = [];

    data["features"].map(d => {
        let item = {};
        item.name = d.properties["title"];
        if (item.name === undefined) {
            console.log(`Data name not found for art with url ${d.url}`);
        }
        let coordinates = { longitude: d.geometry.coordinates[0], latitude: d.geometry.coordinates[1]};
        if (coordinates.longitude === undefined || coordinates.latitude === undefined) {
            console.log(`Data coordinates not found for art with url ${d.url}`);
        }
        item.coordinates = coordinates;

        let details = {};
        if (d.properties["short_desc"] != null || d.properties["short_desc"] != undefined) {
            details.description = d.properties["short_desc"];
        }
        details.artist = d.properties.artist;
        details.website = d.properties.website["url"];

        item.details = details;
        new_data.push(item);
    })

    if (stringify) {
        return JSON.stringify(new_data, null);
    }

    return new_data;
}


const test_validate = async function() {
    let schema = await axios({
        url: "https://raw.githubusercontent.com/OpendataDeveloperNetwork/ODEN-Transmogrifiers/main/schemas/public-art.json",
        method: 'GET',
        responseType: 'blob',
    })
    schema = JSON.parse(schema.data);

    // filter data and assign result to my_new_data
    my_new_data = filter(data)
    // console.log(my_new_data)

    const v = new validator();
    my_new_data.map(d => {
        v.validate(d, schema, {required: true, throwFirst: true});
    })
    console.log(my_new_data)
}

const data = {
    "type": "FeatureCollection",
    "features": [
    {
    "type": "Feature",
    "geometry": {
    "type": "Point",
    "coordinates": [
    -114.0748777,
    51.0467936
    ]
    },
    "properties": {
    "desc5": null,
    "website": {
    "url": "https://www.calgary.ca/CSPS/Recreation/Documents/Public-art/Percent-for-Public-Art-SWARM.pdf"
    },
    "desc1": "Vibrant colours meld with a swarm of leaf seeds whose chaotic patterns are not unlike those of transit commuters during rush hour; rushing and intermingling to move from here to there. These leaf seeds are also commonly referred to as keys. Can you find the other hidden keys in this installation?",
    "tab_name": "Downtown",
    "short_desc": "Looking up and around, visitors to this LRT platform are surrounded by warmth and colour.",
    "desc2": null,
    "desc3": null,
    "artist": "Stuart Keeler",
    "art_id": "P2009.002.001",
    "address": "Sixth Street S.W. LRT Station",
    "desc4": null,
    "title": "SWARM",
    "modified_dt": "2022-03-29T16:44:20.000Z"
    }
    },
    {
    "type": "Feature",
    "geometry": {
    "type": "Point",
    "coordinates": [
    -114.0837359,
    51.0418405
    ]
    },
    "properties": {
    "desc5": null,
    "website": {
    "url": "https://www.calgary.ca/CSPS/Recreation/Pages/Public-Art/Chinook-Arc-Public-Artwork.aspx"
    },
    "desc1": "Illuminated at night, visitors have complete control over the lighting of the sculpture through an optical sensor that projects the movements and colors it sees onto the artwork's surface. Wave your hands, move colored objects or play a movie from your cell phone and witness the unique light sequence that takes shape.",
    "tab_name": "Southwest",
    "short_desc": "This artwork is an interactive, illuminated sculpture that responds to human interaction.",
    "desc2": "Here is a video with more information on this project: <a href=\"https://www.youtube.com/watch?v=_xRXzZmJAhc\" target=\"_blank\">Chinook Arc.</a>",
    "desc3": null,
    "artist": "Joe O'Connell and Blessing Hancock with Creative Machines (Technical Consultant)",
    "art_id": "P2014.001.001",
    "address": "Barb Scott Park (12th Avenue and Ninth Street S.W.)",
    "desc4": null,
    "title": "Chinook Arc",
    "modified_dt": "2022-03-28T17:15:48.000Z"
    }
    },
    {
    "type": "Feature",
    "geometry": {
    "type": "Point",
    "coordinates": [
    -114.0711883,
    51.0763265
    ]
    },
    "properties": {
    "desc5": null,
    "website": {
    "url": "https://www.calgary.ca/csps/recreation/public-art/mount-pleasant-fire-station-7-public-art-project.html"
    },
    "desc1": "Spanning the southwest stairwell, a series of painted aluminum panels depict images that celebrate the unique purpose of the building. The artwork focuses on community and connection and how the people and relationships are what hold it together.",
    "tab_name": "Northwest",
    "short_desc": "Located in Mount Pleasant Fire Station #7, this artwork captures the connection between citizens and the firefighters that strive to help them.",
    "desc2": null,
    "desc3": null,
    "artist": "Jennifer Stead",
    "art_id": "P2017.005.001A-D",
    "address": "Mount Pleasant Fire Station #7, 2708 Fourth St. N.W.",
    "desc4": null,
    "title": "Mount Pleasant Moments",
    "modified_dt": "2022-03-29T15:35:49.000Z"
    }
    }]
}


test_validate();


