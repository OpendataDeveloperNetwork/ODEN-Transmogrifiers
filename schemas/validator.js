const { default: axios } = require("axios");
const validator = require('jsonschema').Validator;


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
        let coordinates = { longitude: d.the_geom.coordinates[0], latitude: d.the_geom.coordinates[1]};
        if (coordinates.longitude === undefined || coordinates.latitude === undefined) {
            console.log(`Data coordinates not found for art with url ${d.url}`);
        }
        item.coordinates = coordinates;
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
    schema.properties.details.additionalProperties = true;

    // filter data and assign result to my_new_data
    my_new_data = filter(data)
    // console.log(my_new_data)

    const v = new validator();
    my_new_data.map(d => {
        v.validate(d, schema, {required: true, throwFirst: true});
    })
    console.log(my_new_data)
}

const data = [
    {
    "name": "600 California",
    "title": "'\"Guardian\"' by Bruce Beasley",
    "type": "Sculpture",
    "medium": "bronze",
    "location": "top of the stairs of the California St. open space",
    "accessibil": "open space and artwork are always accessible",
    "requiredar": "Yes, by Case No <a target='_blank' href='http://propertymap.sfplanning.org?search=1986.085X'>1986.085X</a>",
    "descriptio": "The proposed project would develop the building by adding approximately 221,430 gross square feet to the office space, 11 stories, and 22,200 square feet to the parking garage.",
    "artistlink": "http://en.wikipedia.org/wiki/Bruce_Beasley_(American_sculptor)",
    "the_geom": {
    "type": "Point",
    "coordinates": [
    -122.40485799999999,
    37.793109000000015
    ]
    },
    ":@computed_region_rxqg_mtj9": "10",
    ":@computed_region_yftq_j783": "3",
    ":@computed_region_jx4q_fizf": "1",
    ":@computed_region_ajp5_b2md": "6",
    ":@computed_region_bh8s_q3mv": "28857",
    ":@computed_region_jwn9_ihcz": "104",
    ":@computed_region_6qbp_sg9q": "104",
    ":@computed_region_qgnn_b9vv": "6",
    ":@computed_region_26cr_cadq": "3"
    },
    {
    "name": "474 Natoma",
    "title": "\"Global Garden\"",
    "type": "façade mural panel",
    "medium": "\"Optical tiles\":  digital images on metal",
    "location": "elevator tower facing Natoma Street",
    "accessibil": "artwork is always accessible",
    "requiredar": "Yes, by case No. <a target='_blank' href='http://propertymap.sfplanning.org?search=2007.1383X'>2007.1383X</a>",
    "descriptio": "A 100% affordable, 60-unit residential project.",
    "the_geom": {
    "type": "Point",
    "coordinates": [
    -122.40733,
    37.78055999999998
    ]
    },
    ":@computed_region_rxqg_mtj9": "9",
    ":@computed_region_yftq_j783": "14",
    ":@computed_region_jx4q_fizf": "2",
    ":@computed_region_ajp5_b2md": "34",
    ":@computed_region_bh8s_q3mv": "28853",
    ":@computed_region_jwn9_ihcz": "32",
    ":@computed_region_6qbp_sg9q": "32",
    ":@computed_region_qgnn_b9vv": "1",
    ":@computed_region_26cr_cadq": "10"
    },
    {
    "name": "343 Sansome",
    "title": "'\"Four Seasons\"' by Joan Brown",
    "type": "obelisk",
    "medium": "tile",
    "location": "roof garden",
    "accessibil": "artwork and open space are accessible from 9-5",
    "requiredar": "Yes, by Case No <a target='_blank' href='http://propertymap.sfplanning.org?search=1985.079X'>1985.079X</a>",
    "descriptio": "343 Sansome Street would concentrate both on the renovation of the existing 13- story office building, and the separation of one lot into two, 29- story office/ retail buildings with parking. The new building would be approximately 212 feet tall with app",
    "artistlink": "http://en.wikipedia.org/wiki/Joan_Brown",
    "the_geom": {
    "type": "Point",
    "coordinates": [
    -122.40157199999999,
    37.793615999999986
    ]
    },
    ":@computed_region_rxqg_mtj9": "10",
    ":@computed_region_yftq_j783": "4",
    ":@computed_region_jx4q_fizf": "1",
    ":@computed_region_ajp5_b2md": "8",
    ":@computed_region_bh8s_q3mv": "28854",
    ":@computed_region_jwn9_ihcz": "108",
    ":@computed_region_6qbp_sg9q": "108",
    ":@computed_region_qgnn_b9vv": "6",
    ":@computed_region_26cr_cadq": "3"
    },
    {
    "name": "125 Mason",
    "title": "'Untitled' by Mildred Howard",
    "type": "Facade",
    "medium": "various",
    "location": "facade of building",
    "accessibil": "artwork is always accessible",
    "requiredar": "Yes, by Case No <a target='_blank' href='http://propertymap.sfplanning.org?search=2006.0691X'>2006.0691X</a>",
    "descriptio": "The proposed project would demolish the existing parking lots on the Project Site and construct a fourteen story, 81 unit affordable family housing building including approximately 556 gsf of office space and 2,111 gsf of lounge and community meeting spa",
    "artistlink": "http://www.moellerfineart.com/artists/mildred-howard/",
    "the_geom": {
    "type": "Point",
    "coordinates": [
    -122.420388,
    37.77555899999999
    ]
    },
    ":@computed_region_rxqg_mtj9": "11",
    ":@computed_region_yftq_j783": "7",
    ":@computed_region_jx4q_fizf": "6",
    ":@computed_region_ajp5_b2md": "9",
    ":@computed_region_bh8s_q3mv": "28852",
    ":@computed_region_jwn9_ihcz": "21",
    ":@computed_region_6qbp_sg9q": "21",
    ":@computed_region_qgnn_b9vv": "4",
    ":@computed_region_26cr_cadq": "11"
    },
    {
    "name": "222 2nd Street",
    "title": "\"Riallaro,\" by Frank Stella",
    "type": "painting",
    "medium": "pixel painting on canvas",
    "location": "building lobby",
    "accessibil": "artwork is accessible during normal business hours, when POPOS is open, 8-6.",
    "requiredar": "Yes, by Case No. 2006.1106X",
    "descriptio": "New 26-story, 350-foot tall building containing approximately 430,650 gross square feet of office space, approximately 5,000 square feet of ground floor retail space, approximately 28,000 square feet of subterranean parking area, and approximately 8,600",
    "artistlink": "https://www.sfmoma.org/artist/Frank_Stella",
    "the_geom": {
    "type": "Point",
    "coordinates": [
    -122.39845742,
    37.78632839300002
    ]
    },
    ":@computed_region_rxqg_mtj9": "9",
    ":@computed_region_yftq_j783": "6",
    ":@computed_region_jx4q_fizf": "2",
    ":@computed_region_ajp5_b2md": "8",
    ":@computed_region_bh8s_q3mv": "28855",
    ":@computed_region_jwn9_ihcz": "32",
    ":@computed_region_6qbp_sg9q": "32",
    ":@computed_region_qgnn_b9vv": "1",
    ":@computed_region_26cr_cadq": "10"
    },
    {
    "name": "100 1st St",
    "title": "'\"Linear Fountain\"' by John Luebtow",
    "type": "water wall sculpture",
    "medium": "granite, glass",
    "location": "sun terrace",
    "accessibil": "artwork is always accessible.",
    "requiredar": "Yes by Case No 1983.331. Although this project preceded the adoption of the Downtown Plan, this project's approvals were guided by the spitit of the pending plan, resulting in public art at this site.",
    "descriptio": "The proposed project was to demolish 6, 40-year-old buildings, and erect a 27 story office building in its place. The new building would be 350 feet tall, and have 396,313 square feet of office space. In addition to the office space, there was planned to",
    "artistlink": "http://www.luebtow.com/",
    "the_geom": {
    "type": "Point",
    "coordinates": [
    -122.39749999999998,
    37.78960000000001
    ]
    },
    ":@computed_region_rxqg_mtj9": "9",
    ":@computed_region_yftq_j783": "12",
    ":@computed_region_jx4q_fizf": "2",
    ":@computed_region_ajp5_b2md": "8",
    ":@computed_region_bh8s_q3mv": "28855",
    ":@computed_region_jwn9_ihcz": "32",
    ":@computed_region_6qbp_sg9q": "32",
    ":@computed_region_qgnn_b9vv": "1",
    ":@computed_region_26cr_cadq": "10"
    },
    {
    "name": "560 Mission",
    "title": "'\"Annular Eclipse\"' by George Rickey",
    "type": "Sculpture",
    "medium": "aluminum",
    "location": "urban garden",
    "accessibil": "open space and artwork are always accessible",
    "requiredar": "Yes, by Case No <a target='_blank' href='http://propertymap.sfplanning.org?search=1998.321X'>1998.321X</a>",
    "descriptio": "The proposed project would demolish a 65,000 square foot building and parking lot to reconstruct an office building with 645,000 square feet for office space.",
    "artistlink": "http://en.wikipedia.org/wiki/George_Rickey",
    "the_geom": {
    "type": "Point",
    "coordinates": [
    -122.39908000000003,
    37.78899999999999
    ]
    },
    ":@computed_region_rxqg_mtj9": "9",
    ":@computed_region_yftq_j783": "12",
    ":@computed_region_jx4q_fizf": "2",
    ":@computed_region_ajp5_b2md": "8",
    ":@computed_region_bh8s_q3mv": "28855",
    ":@computed_region_jwn9_ihcz": "108",
    ":@computed_region_6qbp_sg9q": "108",
    ":@computed_region_qgnn_b9vv": "6",
    ":@computed_region_26cr_cadq": "10"
    },
    {
    "name": "49 Stevenson St",
    "title": "'\"Escalieta I\"' by Manuel Neri",
    "type": "sculpture",
    "medium": "ordinario marble",
    "location": "49 Stevenson entrance",
    "accessibil": "open space and artwork is always accessible",
    "requiredar": "Yes by Case No <a target='_blank' href='http://propertymap.sfplanning.org?search=1985.657'>985.657</a>",
    "descriptio": "The existing buildings (49, 53, and 55 Stevenson Street) would be demolished and replaced with a 15- story office building. 49 Stevenson would be 253 feet tall with about 169,600 gross square feet of office space. The ground and second floor of the new b",
    "artistlink": "http://en.wikipedia.org/wiki/Manuel_Neri",
    "the_geom": {
    "type": "Point",
    "coordinates": [
    -122.39936599999999,
    37.79000000000002
    ]
    },
    ":@computed_region_rxqg_mtj9": "9",
    ":@computed_region_yftq_j783": "12",
    ":@computed_region_jx4q_fizf": "2",
    ":@computed_region_ajp5_b2md": "8",
    ":@computed_region_bh8s_q3mv": "28855",
    ":@computed_region_jwn9_ihcz": "108",
    ":@computed_region_6qbp_sg9q": "108",
    ":@computed_region_qgnn_b9vv": "6",
    ":@computed_region_26cr_cadq": "10"
    },
    {
    "name": "1 Market",
    "title": "'\"Float\"' by Mark Lere",
    "type": "Sculpture",
    "medium": "metal, bronze",
    "location": "landmark office building interior open space",
    "accessibil": "artwork is available from 7:00 a.m. to 6:30 p.m.",
    "requiredar": "Yes, by Case No <a target='_blank' href='http://propertymap.sfplanning.org?search=1998.135X'>1998.135X</a>",
    "descriptio": "The proposed project would add 51,822 square feet of office space to an existing office building. This addition would include seismically upgrading two, multi-story, light courts of the existing building.",
    "artistlink": "http://www.marklere.com/",
    "the_geom": {
    "type": "Point",
    "coordinates": [
    -122.39423299999999,
    37.79337099999998
    ]
    },
    ":@computed_region_rxqg_mtj9": "9",
    ":@computed_region_yftq_j783": "12",
    ":@computed_region_jx4q_fizf": "2",
    ":@computed_region_ajp5_b2md": "8",
    ":@computed_region_bh8s_q3mv": "28855",
    ":@computed_region_jwn9_ihcz": "108",
    ":@computed_region_6qbp_sg9q": "108",
    ":@computed_region_qgnn_b9vv": "6",
    ":@computed_region_26cr_cadq": "10"
    },]
    

test_validate();


