const filter = function (data, stringify) {
    if (typeof data === 'string' || data instanceof String) {
        data = JSON.parse(data);
    }
    
    let new_data = [];

    data.features.map(d => {
        let item = {};
        item.name = d.properties.Title;
        if (item.name === undefined) {
            console.log(`Data name not found for art with url ${d.url}`);
        }
        let coordinates = { longitude: d.properties.Longitude, latitude: d.properties.Latitude};
        if (coordinates.longitude === undefined || coordinates.latitude === undefined) {
            console.log(`Data coordinates not found for art with url ${d.url}`);
        }
        item.coordinates = coordinates;

        let details = {};
        details.type = d.properties.Type;
        details.address = d.properties.Address;
        details.artist_first_name = d.properties.Artist_First;
        details.artist_last_name = d.properties.Artist_Last_;
        details.media = d.properties.media;
        details.year_created = d.properties.Year_Created;
        details.neighbourhood = d.properties.Neighbourhood;
        details.image_url = d.properties.Image_Url;

        item.details = details;
        new_data.push(item);
    })

    if (stringify) {
        return JSON.stringify(new_data, null);
    }

    return new_data;
}
// return filter;
let art = {
    "type": "FeatureCollection",
    "name": "Sheet1",
    "crs": {
        "type": "name",
        "properties": {
            "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
        }
    },
    "features": [
        {
            "type": "Feature",
            "properties": {
                "FID": 1,
                "Title": "The Grazers",
                "Type": "Sculpture",
                "Address": "317 East Jefferson St",
                "Latitude": 43.047076,
                "Longitude": "-76.14775",
                "Artist_Last_": "Reid IV",
                "Artist_First": "Leon",
                "Additional_Artists": null,
                "Media": "Parking  meters, steel, enamel, anchor bolts",
                "Year_Created": 2007,
                "Year_Erected": 2007,
                "TNT_Area": "Downtown",
                "Neighborhood": "Columbus Circle",
                "Specific_Location": "On sidewalk",
                "Image_Url": "https://www.syr.gov/files/sharedassets/public/1-boards-and-commissions/spac/public-art-images/grazers_leon-reid_2007.jpg"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.14775,
                    43.047076
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 2,
                "Title": "Taras H. Shevchenko",
                "Type": "Monument",
                "Address": "198 South Wilbur Ave",
                "Latitude": 43.048292,
                "Longitude": "-76.1796",
                "Artist_Last_": "Benedict",
                "Artist_First": "Dexter",
                "Additional_Artists": "~",
                "Media": null,
                "Year_Created": null,
                "Year_Erected": null,
                "TNT_Area": "Westside",
                "Neighborhood": "Tipperary Hill",
                "Specific_Location": "On an island at the intersection of West Fayette Street and Wilbur and Tennyson Avenues",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.1796,
                    43.048292
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 3,
                "Title": "Stone Throwers Monument",
                "Type": "Monument",
                "Address": "Milton Ave & Tompkins Ave",
                "Latitude": 43.046728,
                "Longitude": "-76.185513",
                "Artist_Last_": "Benedict",
                "Artist_First": "Dexter",
                "Additional_Artists": "~",
                "Media": null,
                "Year_Created": null,
                "Year_Erected": null,
                "TNT_Area": "Westside",
                "Neighborhood": "Tipperary Hill",
                "Specific_Location": "Stone Throwers Park",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.185513,
                    43.046728
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 4,
                "Title": "Clinton Serenade",
                "Type": "Mural",
                "Address": "126 South Salina Street",
                "Latitude": 43.051799,
                "Longitude": "-76.151894",
                "Artist_Last_": "Goss",
                "Artist_First": "Corky",
                "Additional_Artists": "Chip Miller",
                "Media": "Acrylic on Stucco",
                "Year_Created": 2009,
                "Year_Erected": 2009,
                "TNT_Area": "Downtown",
                "Neighborhood": "Clinton Square (near)",
                "Specific_Location": "On the side of First Niagra Bank (above the drive thru)",
                "Image_Url": "https://www.syr.gov/files/sharedassets/public/1-boards-and-commissions/spac/public-art-images/moonlight-serenade_goss-and-miller_2009.jpg"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.151894,
                    43.051799
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 5,
                "Title": "Onondaga County Korea–Vietnam Veterans Memorial",
                "Type": "Monument",
                "Address": "232 East Onondaga St",
                "Latitude": 43.045603,
                "Longitude": "-76.150646",
                "Artist_Last_": "Kane",
                "Artist_First": "Kevin L.",
                "Additional_Artists": null,
                "Media": "Polished red granite and aluminum",
                "Year_Created": null,
                "Year_Erected": 1984,
                "TNT_Area": "Downtown",
                "Neighborhood": "Columbus Circle",
                "Specific_Location": "Directly in Front of Plymouth Congregational Church",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.150646,
                    43.045603
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 6,
                "Title": "LeMoyne Drinking Fountain",
                "Type": "Monument",
                "Address": "232 Washington Sq",
                "Latitude": 43.070187,
                "Longitude": "-76.162312",
                "Artist_Last_": "Corbett",
                "Artist_First": "Gail Sherman",
                "Additional_Artists": null,
                "Media": "Bronze and Granite",
                "Year_Created": null,
                "Year_Erected": 1908,
                "TNT_Area": "Northside",
                "Neighborhood": "Near Northeast",
                "Specific_Location": "Washington Square Park",
                "Image_Url": "https://www.syr.gov/files/sharedassets/public/1-boards-and-commissions/spac/public-art-images/lemoyne-drinking-fountain_gail-corbett_1908.jpg"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.162312,
                    43.070187
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 7,
                "Title": "Cristoforo Colombo Discoverer of America",
                "Type": "Monument",
                "Address": "259 East Onondaga St",
                "Latitude": 43.046844,
                "Longitude": "-76.149104",
                "Artist_Last_": "Baldi",
                "Artist_First": "Lorenzo V.",
                "Additional_Artists": null,
                "Media": "Bronze, Pink Granite, Dark Grey Granite, Stone Cobbles and Cast Stone",
                "Year_Created": null,
                "Year_Erected": 1934,
                "TNT_Area": "Downtown",
                "Neighborhood": "Columbus Circle",
                "Specific_Location": null,
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.149104,
                    43.046844
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 8,
                "Title": "General Gustavus Sniper ",
                "Type": "Monument",
                "Address": "426 North Salina St",
                "Latitude": 43.056447,
                "Longitude": "-76.151855",
                "Artist_Last_": "Moynihan",
                "Artist_First": "Frederick",
                "Additional_Artists": null,
                "Media": "Bronze and Granite",
                "Year_Created": null,
                "Year_Erected": 1905,
                "TNT_Area": "Northside",
                "Neighborhood": "Little Italy",
                "Specific_Location": "in Schlosser Park",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.151855,
                    43.056447
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 9,
                "Title": "Rock of the Marne",
                "Type": "Monument",
                "Address": "760 South Warren St",
                "Latitude": 43.042526,
                "Longitude": "-76.151139",
                "Artist_Last_": "Perry",
                "Artist_First": "Roland Hinton",
                "Additional_Artists": null,
                "Media": "Bronze, Pink Granite and Concrete",
                "Year_Created": null,
                "Year_Erected": 1920,
                "TNT_Area": "Southside",
                "Neighborhood": "Gateway",
                "Specific_Location": "Billings Park",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.151139,
                    43.042526
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 10,
                "Title": "Spanish War Memorial",
                "Type": "Monument",
                "Address": "764 South Warren St",
                "Latitude": 43.041961,
                "Longitude": "-76.151029",
                "Artist_Last_": "Ruggles Kitson",
                "Artist_First": "Theodore Alice",
                "Additional_Artists": null,
                "Media": "Bronze and Granite",
                "Year_Created": null,
                "Year_Erected": 1924,
                "TNT_Area": "Southside",
                "Neighborhood": "Southwest",
                "Specific_Location": "Billings Park",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.151029,
                    43.041961
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 11,
                "Title": "Jerry Rescue Monument",
                "Type": "Monument",
                "Address": "Clinton Square (between Water, Clinton and Salina Streets downtown)",
                "Latitude": 43.050729,
                "Longitude": "-76.153327",
                "Artist_Last_": "BuMann",
                "Artist_First": "Sharon",
                "Additional_Artists": null,
                "Media": "Everdure bronze with patina",
                "Year_Created": null,
                "Year_Erected": 1990,
                "TNT_Area": "Downtown",
                "Neighborhood": "Clinton Square",
                "Specific_Location": "West end of Clinton Square",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.153327,
                    43.050729
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 12,
                "Title": "Libba Cotten Grove Memorial",
                "Type": "Sculpture",
                "Address": "East Castle St and South State St",
                "Latitude": 43.034322,
                "Longitude": "-76.147506",
                "Artist_Last_": null,
                "Artist_First": null,
                "Additional_Artists": null,
                "Media": null,
                "Year_Created": null,
                "Year_Erected": 1983,
                "TNT_Area": "Southside",
                "Neighborhood": "Gateway",
                "Specific_Location": "In the park at the corner of Castle and State Streets",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.147506,
                    43.034322
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 13,
                "Title": "Philip Eckel Memorial",
                "Type": "Monument",
                "Address": "East Genesee St, East Fayette St, and South Townsend St",
                "Latitude": 43.048339,
                "Longitude": "-76.146501",
                "Artist_Last_": "Carrick Brothers",
                "Artist_First": null,
                "Additional_Artists": null,
                "Media": "Westerly Granite and Barre Granite",
                "Year_Created": null,
                "Year_Erected": 1900,
                "TNT_Area": "Downtown",
                "Neighborhood": "Downtown",
                "Specific_Location": "Fayette Firefighters Memorial Park",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.146501,
                    43.048339
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 14,
                "Title": "Fireman's Bell Tower",
                "Type": "Monument",
                "Address": "East Genesee St, East Fayette St, and South Townsend St",
                "Latitude": 43.048341,
                "Longitude": "-76.146779",
                "Artist_Last_": null,
                "Artist_First": null,
                "Additional_Artists": "Foundry of Bronze Bell: Menely, Troy, NY",
                "Media": "Steel; Bronze",
                "Year_Created": null,
                "Year_Erected": 1979,
                "TNT_Area": "Downtown",
                "Neighborhood": "Downtown",
                "Specific_Location": "Fayette Firefighters Memorial Park",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.146779,
                    43.048341
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 15,
                "Title": "Hamilton White Memorial",
                "Type": "Monument",
                "Address": "East Genesee St, East Fayette St, and South Townsend St",
                "Latitude": 43.04835,
                "Longitude": "-76.14713",
                "Artist_Last_": "Corbett",
                "Artist_First": "Gail Sherman",
                "Additional_Artists": null,
                "Media": "Bronze; Pink Granite Base",
                "Year_Created": 1900,
                "Year_Erected": 1905,
                "TNT_Area": "Downtown",
                "Neighborhood": "Downtown",
                "Specific_Location": "Fayette Firefighters Memorial Park",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.14713,
                    43.04835
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 16,
                "Title": "Collins Block Memorial - \"Firemen's Memorial\"",
                "Type": "Monument",
                "Address": "East Genesee St, East Fayette St, and South Townsend St",
                "Latitude": 43.048332,
                "Longitude": "-76.14713",
                "Artist_Last_": "Cowie",
                "Artist_First": "William",
                "Additional_Artists": null,
                "Media": "Granite ",
                "Year_Created": null,
                "Year_Erected": 1939,
                "TNT_Area": "Downtown",
                "Neighborhood": "Downtown",
                "Specific_Location": "Fayette Firefighters Memorial Park",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.14713,
                    43.048332
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 17,
                "Title": "Redfield Monument ",
                "Type": "Sculpture",
                "Address": "Forman Park",
                "Latitude": 43.047183,
                "Longitude": "-76.141848",
                "Artist_Last_": "Landi",
                "Artist_First": "Fidardo",
                "Additional_Artists": null,
                "Media": "Bronze sculpture",
                "Year_Created": null,
                "Year_Erected": 1908,
                "TNT_Area": "Eastside",
                "Neighborhood": "Eastside",
                "Specific_Location": "Forman Park; west edge of park at Almond St",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.141848,
                    43.047183
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 18,
                "Title": "Benjamin Franklin Statue",
                "Type": "Monument",
                "Address": "Franklin Square Park",
                "Latitude": 43.057096,
                "Longitude": "-76.15683",
                "Artist_Last_": "Benedict",
                "Artist_First": null,
                "Additional_Artists": null,
                "Media": "Polished Granite Veneer; Bronze and Brick Pavers",
                "Year_Created": null,
                "Year_Erected": 1989,
                "TNT_Area": "Lakefront",
                "Neighborhood": "Franklin Square",
                "Specific_Location": "East Side of Franklin Square",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.15683,
                    43.057096
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 19,
                "Title": "Soldiers and Sailors Monument",
                "Type": "Sculpture",
                "Address": "Clinton Square (between Water, Clinton and Salina Streets downtown)",
                "Latitude": 43.051094,
                "Longitude": "-76.152937",
                "Artist_Last_": "Dallin",
                "Artist_First": "Cyrus",
                "Additional_Artists": "~",
                "Media": "Bronze and Connecticut White Granite",
                "Year_Created": 1909,
                "Year_Erected": 1910,
                "TNT_Area": "Downtown",
                "Neighborhood": "Clinton Square",
                "Specific_Location": "North side of Clinton Square",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.152937,
                    43.051094
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 20,
                "Title": "Goethe and Schiller",
                "Type": "Monument",
                "Address": "Highland St and Butternut St",
                "Latitude": 43.069573,
                "Longitude": "-76.141616",
                "Artist_Last_": "Friederich",
                "Artist_First": "Ernest",
                "Additional_Artists": "August Rietschel",
                "Media": "Bronze; Polished Gray Granite",
                "Year_Created": null,
                "Year_Erected": 1911,
                "TNT_Area": "Northside",
                "Neighborhood": "Northside",
                "Specific_Location": "Skylar Park",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.141616,
                    43.069573
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 21,
                "Title": "Italian-American War Veterans",
                "Type": "Monument",
                "Address": "North Salina St and Danforth St",
                "Latitude": 43.045599,
                "Longitude": "-76.150671",
                "Artist_Last_": "Pederson",
                "Artist_First": "Thorvald",
                "Additional_Artists": "~",
                "Media": "Indiana Limestone, Brick, Recessed wood panels, Glass panel covers and Bronze ",
                "Year_Created": null,
                "Year_Erected": 1946,
                "TNT_Area": "Northside",
                "Neighborhood": "Northside",
                "Specific_Location": "In the middle of Bennett Park",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.150671,
                    43.045599
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 22,
                "Title": "Four Seasons",
                "Type": "Mosaic",
                "Address": "229 Shonnard Street",
                "Latitude": 43.0412303,
                "Longitude": "-76.1624929",
                "Artist_Last_": "Zook",
                "Artist_First": "Eva",
                "Additional_Artists": "Mark Topp, Megan Connor and students",
                "Media": null,
                "Year_Created": 2000,
                "Year_Erected": 2001,
                "TNT_Area": "Westside",
                "Neighborhood": "Near Westside",
                "Specific_Location": "East end of Ward Bakery Park",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.16249289999996,
                    43.04123030000005
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 23,
                "Title": "Park History",
                "Type": "Mural",
                "Address": "Thornden Park Dr and Greenwood Pl",
                "Latitude": 43.042733,
                "Longitude": "-76.12441",
                "Artist_Last_": "Topp",
                "Artist_First": "Mark",
                "Additional_Artists": "Thornden Park Association",
                "Media": "Painted on Cement",
                "Year_Created": null,
                "Year_Erected": 2005,
                "TNT_Area": "Eastside",
                "Neighborhood": "Westcott",
                "Specific_Location": "Thornden Park Public Pool",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.12441,
                    43.042733
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 24,
                "Title": "Tectonic Sculpture 01 (The Hand)",
                "Type": "Sculpture",
                "Address": "City Hall Commons",
                "Latitude": 43.04967,
                "Longitude": "-76.150101",
                "Artist_Last_": "Rose",
                "Artist_First": "Brendan",
                "Additional_Artists": null,
                "Media": "Concrete, steel, wood",
                "Year_Created": 2008,
                "Year_Erected": 2008,
                "TNT_Area": "Downtown",
                "Neighborhood": "Downtown",
                "Specific_Location": "East side of City Hall Commons",
                "Image_Url": "https://www.syr.gov/files/sharedassets/public/1-boards-and-commissions/spac/public-art-images/tectonic-sculpture-01_roste_2008.jpg"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.150101,
                    43.04967
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 25,
                "Title": "O1101",
                "Type": "Sculpture",
                "Address": "Lemp Park",
                "Latitude": 43.048519,
                "Longitude": "-76.150608",
                "Artist_Last_": "Taskale",
                "Artist_First": "Tash",
                "Additional_Artists": null,
                "Media": "Steel",
                "Year_Created": 2009,
                "Year_Erected": 2009,
                "TNT_Area": "Downtown",
                "Neighborhood": "Downtown",
                "Specific_Location": "Corner of W. Fayette & S. Warren Streets",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.150608,
                    43.048519
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 26,
                "Title": "Rising",
                "Type": "Sculpture",
                "Address": "Finnegan Park",
                "Latitude": 43.041182,
                "Longitude": "-76.162281",
                "Artist_Last_": "Earle",
                "Artist_First": "Dennis",
                "Additional_Artists": null,
                "Media": "Steel, concrete ",
                "Year_Created": 201,
                "Year_Erected": 2011,
                "TNT_Area": "Northside",
                "Neighborhood": "Hawley-Green",
                "Specific_Location": "Lodi & Hawley, southern tip of park",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.162281,
                    43.041182
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 27,
                "Title": "Westside Geomatic",
                "Type": "Sculpture",
                "Address": "Hazard Branch Library",
                "Latitude": 43.052589,
                "Longitude": "-76.187373",
                "Artist_Last_": "Smith",
                "Artist_First": "James  Earle",
                "Additional_Artists": null,
                "Media": "Steel, aluminum, fiberglass, limeston",
                "Year_Created": 2010,
                "Year_Erected": 2010,
                "TNT_Area": "Westside",
                "Neighborhood": "Westside",
                "Specific_Location": "Plaza in front of library",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.187373,
                    43.052589
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 28,
                "Title": "Peace by Piece ",
                "Type": "Mural",
                "Address": "105 Victoria Place (Petit Library)",
                "Latitude": 43.040887,
                "Longitude": "-76.11844",
                "Artist_Last_": "Cofer",
                "Artist_First": "Annette",
                "Additional_Artists": "Mary Lynn Mahan",
                "Media": "Ceramic",
                "Year_Created": 2010,
                "Year_Erected": 2011,
                "TNT_Area": "Eastside",
                "Neighborhood": "Westcott",
                "Specific_Location": "East-facing wall of Petit Branch Library",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.11844,
                    43.040887
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 29,
                "Title": "Tectonic Sculpture 03 (Walt: The Lock Ness Monster)",
                "Type": "Sculpture",
                "Address": "W. Fayette St at Onondaga Creek",
                "Latitude": 43.046469,
                "Longitude": "-76.16935",
                "Artist_Last_": "Rose",
                "Artist_First": "Brendan",
                "Additional_Artists": null,
                "Media": "Concrete, steel, wood",
                "Year_Created": 2011,
                "Year_Erected": 2011,
                "TNT_Area": "Downtown",
                "Neighborhood": "Armory Square",
                "Specific_Location": "Onondaga Creekwalk",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.16935,
                    43.046469
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 30,
                "Title": "Honoring the Onondaga Creek",
                "Type": "Sculpture",
                "Address": "Meachum Field Park",
                "Latitude": 43.0011259,
                "Longitude": "-76.1524237",
                "Artist_Last_": "Michel",
                "Artist_First": "Peter",
                "Additional_Artists": null,
                "Media": "Aluminum",
                "Year_Created": 2011,
                "Year_Erected": 2011,
                "TNT_Area": "Valley",
                "Neighborhood": "Valley",
                "Specific_Location": "Northwest corner of Meachum Field Park, W. Seneca Turnpike at Onondaga Creek",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.15242369999999,
                    43.001125900000034
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 31,
                "Title": "Cycle",
                "Type": "Sculpture",
                "Address": "Henninger High School, 600 Robinson Street",
                "Latitude": 43.057583,
                "Longitude": "-76.117522",
                "Artist_Last_": "Roth",
                "Artist_First": "Jason",
                "Additional_Artists": null,
                "Media": "Steel and ceramic",
                "Year_Created": 2011,
                "Year_Erected": 2011,
                "TNT_Area": "Eastwood",
                "Neighborhood": "Eastwood",
                "Specific_Location": "West side of campus ",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.117522,
                    43.057583
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 32,
                "Title": "Community as Family",
                "Type": "Sculpture",
                "Address": "Beauchamp Branch Library, 2111 S Salina Street",
                "Latitude": 43.00114,
                "Longitude": "-76.147903",
                "Artist_Last_": "Michel",
                "Artist_First": "Peter",
                "Additional_Artists": null,
                "Media": "Aluminum",
                "Year_Created": 2010,
                "Year_Erected": 2010,
                "TNT_Area": "Southside",
                "Neighborhood": "Southside",
                "Specific_Location": "West of main entrance to library; in front lawn area",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.147903,
                    43.00114
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 33,
                "Title": "SyraViews Stereoscopes",
                "Type": "Sculpture",
                "Address": "Forman Park",
                "Latitude": 43.047149,
                "Longitude": "-76.141262",
                "Artist_Last_": "Woolpert",
                "Artist_First": "Colleen",
                "Additional_Artists": null,
                "Media": "Steel",
                "Year_Created": 2012,
                "Year_Erected": 2012,
                "TNT_Area": "Eastside",
                "Neighborhood": "East Genesee",
                "Specific_Location": "Westside of fountain circle in Forman Park",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.141262,
                    43.047149
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 34,
                "Title": "Bells of Surrender",
                "Type": "Sculpture",
                "Address": "412 University Avenue ",
                "Latitude": 43.045706,
                "Longitude": "-76.134479",
                "Artist_Last_": "Rose",
                "Artist_First": "Brendan",
                "Additional_Artists": null,
                "Media": "Steel and Concrete",
                "Year_Created": 2012,
                "Year_Erected": 2012,
                "TNT_Area": "Eastside",
                "Neighborhood": "University",
                "Specific_Location": "412 University Avenue in front of Grace Church's memorial garden",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.134479,
                    43.045706
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 35,
                "Title": "Let Us Continue",
                "Type": "Mural",
                "Address": "Onondaga Creek Walk",
                "Latitude": 43.048911,
                "Longitude": "-76.15704",
                "Artist_Last_": "Fletchall",
                "Artist_First": "Quinton",
                "Additional_Artists": "Nathan Li",
                "Media": "Acrylic boards",
                "Year_Created": 2014,
                "Year_Erected": 2014,
                "TNT_Area": "Downtown",
                "Neighborhood": "Armory Square, Creek Walk",
                "Specific_Location": "East facing wall between the SU Warehouse and Marriott Hotel garage",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.15704,
                    43.048911
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 36,
                "Title": "Current",
                "Type": "Sculpture",
                "Address": "Onondaga Creek Walk",
                "Latitude": 43.048891,
                "Longitude": "-76.157148",
                "Artist_Last_": "Hancock",
                "Artist_First": "Blessing",
                "Additional_Artists": null,
                "Media": "Stainless steel",
                "Year_Created": 2016,
                "Year_Erected": 2017,
                "TNT_Area": "Downtown",
                "Neighborhood": "Armory Square",
                "Specific_Location": "Onondaga Creek between Warehouse and Marriott Hotel Parking garage",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.157148,
                    43.048891
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 37,
                "Title": "DecoRated Wall",
                "Type": "Mural",
                "Address": "235 Harrison Street",
                "Latitude": 43.044626,
                "Longitude": "-76.149032",
                "Artist_Last_": "Meyer",
                "Artist_First": "Mike",
                "Additional_Artists": null,
                "Media": "Auto paint on steel panels",
                "Year_Created": 2017,
                "Year_Erected": 2017,
                "TNT_Area": "Downtown",
                "Neighborhood": "Downtown",
                "Specific_Location": "AXA Parking Garage curved wall facing Montgomery St",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.149032,
                    43.044626
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 38,
                "Title": "Mighty Salt City",
                "Type": "Mural",
                "Address": "420 E. Genesee Street",
                "Latitude": 43.047932,
                "Longitude": "-76.14676",
                "Artist_Last_": "Valenzuela",
                "Artist_First": "Cayetano",
                "Additional_Artists": null,
                "Media": "Acrylic",
                "Year_Created": 2016,
                "Year_Erected": 2016,
                "TNT_Area": "Downtown",
                "Neighborhood": "Downtown",
                "Specific_Location": "West façade of 420 E. Genesee St",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.14676,
                    43.047932
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 39,
                "Title": "Rose of No Man's Land",
                "Type": "Mural",
                "Address": "457 James Street",
                "Latitude": 43.053341,
                "Longitude": "-76.147016",
                "Artist_Last_": "Roe ",
                "Artist_First": "Paul",
                "Additional_Artists": "Elliott Mattice",
                "Media": "Acrylic",
                "Year_Created": 2016,
                "Year_Erected": 2016,
                "TNT_Area": "Downtown",
                "Neighborhood": "Downtown",
                "Specific_Location": "East façade of 457 James Street",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.147016,
                    43.053341
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 40,
                "Title": "Immersive Cloud",
                "Type": "Sculpture",
                "Address": "500 E. Genesee Street",
                "Latitude": 43.047782,
                "Longitude": "-76.145404",
                "Artist_Last_": "Park",
                "Artist_First": "Daekwon ",
                "Additional_Artists": null,
                "Media": "Galvanized and stainless steel",
                "Year_Created": 2017,
                "Year_Erected": 2017,
                "TNT_Area": "Downtown",
                "Neighborhood": "Downtown",
                "Specific_Location": "SE Corner of Townsend and E. Genesee Street",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.145404,
                    43.047782
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 41,
                "Title": "Syracuse Writers",
                "Type": "Sculpture",
                "Address": "700 block E. Genesee Street",
                "Latitude": 43.046871,
                "Longitude": "-76.141889",
                "Artist_Last_": "Sisko",
                "Artist_First": "Joseph",
                "Additional_Artists": null,
                "Media": "Aluminum panels",
                "Year_Created": 2019,
                "Year_Erected": null,
                "TNT_Area": "Eastside",
                "Neighborhood": "Eastside",
                "Specific_Location": "Along city-owned fence, south side of E. Genesee St across from Forman Park",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.141889,
                    43.046871
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 42,
                "Title": "Erie Canal Themed Poster",
                "Type": "Mural",
                "Address": "346 W. Fayette Street",
                "Latitude": 43.049185,
                "Longitude": "-76.15703",
                "Artist_Last_": "Grant",
                "Artist_First": "Alexandra",
                "Additional_Artists": "Shari Hemsley (poet)",
                "Media": "4x6 laminated Omegabond panel",
                "Year_Created": null,
                "Year_Erected": null,
                "TNT_Area": "Downtown",
                "Neighborhood": "Downtown",
                "Specific_Location": "Creekwalk between W. Washington and W. Fayette streets",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.15703,
                    43.049185
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 43,
                "Title": "Inventive Spirit",
                "Type": "Sculpture",
                "Address": "800 block E Geness St",
                "Latitude": 43.047086,
                "Longitude": "-76.139388",
                "Artist_Last_": "Ferro",
                "Artist_First": "Tino",
                "Additional_Artists": null,
                "Media": "Steel ",
                "Year_Created": 2021,
                "Year_Erected": 2022,
                "TNT_Area": "Eastside ",
                "Neighborhood": "Eastside",
                "Specific_Location": null,
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.139388,
                    43.047086
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 44,
                "Title": "Onondaga Creekwalk Poster",
                "Type": "Mural",
                "Address": "Creekwalk (Franklin Square)",
                "Latitude": 43.055394,
                "Longitude": "-76.157268",
                "Artist_Last_": "Thomas",
                "Artist_First": "Cecily",
                "Additional_Artists": "Jeffrey Corney (poet)",
                "Media": "4x6 laminated Omegabond panel",
                "Year_Created": 2022,
                "Year_Erected": 2022,
                "TNT_Area": "Franklin Square",
                "Neighborhood": "Franklin Square",
                "Specific_Location": "on concrete sidewall of ramp leading up to Franklin Square from Creekwalk",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.157268,
                    43.055394
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 45,
                "Title": "Project C-Inspiration Through Art",
                "Type": "Mural",
                "Address": "Schiller Park Community Center ",
                "Latitude": 43.065738,
                "Longitude": "-76.138537",
                "Artist_Last_": "Walker ",
                "Artist_First": "Ally ",
                "Additional_Artists": null,
                "Media": null,
                "Year_Created": 2022,
                "Year_Erected": 2022,
                "TNT_Area": "Northside",
                "Neighborhood": "Northside",
                "Specific_Location": "3 sides of the center",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.138537,
                    43.065738
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 46,
                "Title": "Palladium",
                "Type": "Monument",
                "Address": "555 South State St",
                "Latitude": 43.046178,
                "Longitude": "-76.147329",
                "Artist_Last_": "Lunt",
                "Artist_First": "Mary Lou",
                "Additional_Artists": "~",
                "Media": null,
                "Year_Created": null,
                "Year_Erected": 2002,
                "TNT_Area": "Downtown",
                "Neighborhood": "Municipal District",
                "Specific_Location": "In front of the Onondaga County Justice Center",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.147329,
                    43.046178
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 47,
                "Title": "One, Two, Three",
                "Type": "Sculpture",
                "Address": "100 South Clinton St",
                "Latitude": 43.0499,
                "Longitude": "-76.155051",
                "Artist_Last_": "Lewitt",
                "Artist_First": "Sol",
                "Additional_Artists": "~",
                "Media": "Painted Aluminum",
                "Year_Created": null,
                "Year_Erected": 1979,
                "TNT_Area": "Downtown",
                "Neighborhood": "Downtown",
                "Specific_Location": "James M. Hanley US Courthouse and Federal Building",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.155051,
                    43.0499
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 48,
                "Title": "Jerry Rescue Mural",
                "Type": "Mural",
                "Address": "1641 E Genesee St",
                "Latitude": 43.047337,
                "Longitude": "-76.123888",
                "Artist_Last_": "~",
                "Artist_First": null,
                "Additional_Artists": "Community Members assisted",
                "Media": null,
                "Year_Created": null,
                "Year_Erected": null,
                "TNT_Area": "Eastside",
                "Neighborhood": "Near Eastside",
                "Specific_Location": "On Richmark Building, opposite corner from Logan Park",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.123888,
                    43.047337
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 49,
                "Title": "Mountain Goat Monument",
                "Type": "Sculpture",
                "Address": "Onondaga Park",
                "Latitude": 43.026855,
                "Longitude": "-76.165307",
                "Artist_Last_": "BuMann",
                "Artist_First": "Sharon",
                "Additional_Artists": null,
                "Media": "Bronze & Stone",
                "Year_Created": 2015,
                "Year_Erected": 2017,
                "TNT_Area": "Southside",
                "Neighborhood": "Strathmore",
                "Specific_Location": "Little Round Top",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.165307,
                    43.026855
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 50,
                "Title": "East Onondaga Mural",
                "Type": "Mural",
                "Address": "262 East Onondaga St",
                "Latitude": 43.04629,
                "Longitude": "-76.149301",
                "Artist_Last_": "Matlow",
                "Artist_First": "Andy",
                "Additional_Artists": "Syracuse Art Squad",
                "Media": null,
                "Year_Created": null,
                "Year_Erected": null,
                "TNT_Area": "Downtown",
                "Neighborhood": "Columbus Circle",
                "Specific_Location": "South of Columbus Circle on east facing wall of the Cathedral Parish Center",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.149301,
                    43.04629
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 51,
                "Title": "Spirit of Light",
                "Type": "Sculpture",
                "Address": "300 Erie Blvd West",
                "Latitude": 43.051069,
                "Longitude": "-76.156092",
                "Artist_Last_": "King",
                "Artist_First": "Marvin L.",
                "Additional_Artists": "Bley & Lyman Architectural Firm",
                "Media": "Stainless Steel",
                "Year_Created": 1932,
                "Year_Erected": 1932,
                "TNT_Area": "Downtown",
                "Neighborhood": "Downtown",
                "Specific_Location": null,
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.156092,
                    43.051069
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 52,
                "Title": "Untitled Sculpture",
                "Type": "Sculpture",
                "Address": "444 East Genesee St",
                "Latitude": 43.047616,
                "Longitude": "-76.145877",
                "Artist_Last_": "Calcagnino",
                "Artist_First": "Steven",
                "Additional_Artists": "~",
                "Media": "Concrete",
                "Year_Created": null,
                "Year_Erected": 1975,
                "TNT_Area": "Downtown",
                "Neighborhood": "Municipal District",
                "Specific_Location": "On the McCarthy Avenue side of the building at 444 East Genesee Street",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.145877,
                    43.047616
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 53,
                "Title": "Waiting for the Night Train",
                "Type": "Sculpture",
                "Address": "400 Burnet Ave",
                "Latitude": 43.051894,
                "Longitude": "-76.141213",
                "Artist_Last_": "Epolito",
                "Artist_First": "Duke",
                "Additional_Artists": "Larry Zankowski",
                "Media": "Plaster, Polyurethane, Fiberglass",
                "Year_Created": null,
                "Year_Erected": 1982,
                "TNT_Area": "Eastside",
                "Neighborhood": "Near Eastside",
                "Specific_Location": "Old railroad tracks off Erie Blvd, where Time Warner Cable, News 10 Now is located ",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.141213,
                    43.051894
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 54,
                "Title": "Burrow Boy",
                "Type": "Monument",
                "Address": "301-31 Erie Blvd East",
                "Latitude": 43.051012,
                "Longitude": "-76.149001",
                "Artist_Last_": "Tischler",
                "Artist_First": "Tom",
                "Additional_Artists": null,
                "Media": "Onondaga Limestone and Bronze",
                "Year_Created": null,
                "Year_Erected": 1987,
                "TNT_Area": "Downtown",
                "Neighborhood": "Hanover Square",
                "Specific_Location": "Across from the Erie Canal Museum",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.149001,
                    43.051012
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 55,
                "Title": "Community Mural",
                "Type": "Mural",
                "Address": "South Beech St and Westcott St",
                "Latitude": 43.040378,
                "Longitude": "-76.119466",
                "Artist_Last_": "Moody",
                "Artist_First": "Michael",
                "Additional_Artists": null,
                "Media": "Paint on Cement",
                "Year_Created": null,
                "Year_Erected": 1997,
                "TNT_Area": "Eastside",
                "Neighborhood": "Westcott",
                "Specific_Location": "At corner of Beech and Westcott Streets",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.119466,
                    43.040378
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 56,
                "Title": "Boom Babies",
                "Type": "Mural",
                "Address": "Westcott St and Harvard Pl",
                "Latitude": 43.041605,
                "Longitude": "-76.119129",
                "Artist_Last_": null,
                "Artist_First": null,
                "Additional_Artists": null,
                "Media": "Paint on Cement",
                "Year_Created": null,
                "Year_Erected": null,
                "TNT_Area": "Eastside",
                "Neighborhood": "Westcott",
                "Specific_Location": null,
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.119129,
                    43.041605
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 57,
                "Title": "Mom's Diner Mosaic",
                "Type": "Mosaic",
                "Address": "110 Harvard Pl",
                "Latitude": 43.041378,
                "Longitude": "-76.118779",
                "Artist_Last_": null,
                "Artist_First": null,
                "Additional_Artists": null,
                "Media": "Glass, Cement, Paint",
                "Year_Created": null,
                "Year_Erected": null,
                "TNT_Area": "Eastside",
                "Neighborhood": "Westcott",
                "Specific_Location": "Backside of Mom's Diner",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.118779,
                    43.041378
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 58,
                "Title": "S.ALT City",
                "Type": "Mural",
                "Address": "300 S. Warren Street",
                "Latitude": 43.048499,
                "Longitude": "-76.151209",
                "Artist_Last_": "Snyder",
                "Artist_First": "Brett",
                "Additional_Artists": null,
                "Media": "Acrylic",
                "Year_Created": 2011,
                "Year_Erected": 2012,
                "TNT_Area": "Downtown",
                "Neighborhood": "Downtown",
                "Specific_Location": "West side of Lemp Jewelers Building",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.151209,
                    43.048499
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 59,
                "Title": "Lock Alley Mural",
                "Type": "Mural",
                "Address": "741 N Salina Street",
                "Latitude": 43.061094,
                "Longitude": "-76.154257",
                "Artist_Last_": "Echo",
                "Artist_First": null,
                "Additional_Artists": null,
                "Media": "Acrylic",
                "Year_Created": 2014,
                "Year_Erected": 2014,
                "TNT_Area": "Northside",
                "Neighborhood": "North Salina Street",
                "Specific_Location": "Northwest facing wall at the rear of the building facing a parking lot",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.154257,
                    43.061094
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 60,
                "Title": "Reach",
                "Type": "Mural",
                "Address": "508-510 Westcott Street",
                "Latitude": 43.041619,
                "Longitude": "-76.119923",
                "Artist_Last_": "Echo",
                "Artist_First": null,
                "Additional_Artists": null,
                "Media": "Acrylic",
                "Year_Created": 2015,
                "Year_Erected": 2015,
                "TNT_Area": "Eastside",
                "Neighborhood": "Westcott",
                "Specific_Location": "East facing wall in interior courtyard",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.119923,
                    43.041619
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 61,
                "Title": "You've Made It",
                "Type": "Mural",
                "Address": "321  W Fayette Street",
                "Latitude": 43.048497,
                "Longitude": "-76.156179",
                "Artist_Last_": "Bocksel",
                "Artist_First": "Jon",
                "Additional_Artists": null,
                "Media": "Acrylic",
                "Year_Created": 2016,
                "Year_Erected": 2016,
                "TNT_Area": "Downtown",
                "Neighborhood": "Armory Square",
                "Specific_Location": "West and east facing walls of 321 W Fayette St",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.156179,
                    43.048497
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 62,
                "Title": "Always Advance",
                "Type": "Mural",
                "Address": "350 W. Fayette Street",
                "Latitude": 43.048973,
                "Longitude": "-76.158146",
                "Artist_Last_": "Luke",
                "Artist_First": "Josh",
                "Additional_Artists": "Meredith Kasabian",
                "Media": "Acrylic",
                "Year_Created": 2017,
                "Year_Erected": 2017,
                "TNT_Area": "Downtown",
                "Neighborhood": "Armory Square",
                "Specific_Location": "West façade of 350 W. Fayette Street",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.158146,
                    43.048973
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 63,
                "Title": "Salmon Run Mosaic",
                "Type": "Mural",
                "Address": "Onondaga Creek Walk",
                "Latitude": 43.056433,
                "Longitude": "-76.161227",
                "Artist_Last_": "Hirsch",
                "Artist_First": "Jillian",
                "Additional_Artists": null,
                "Media": "Ceramic tiles",
                "Year_Created": 2017,
                "Year_Erected": 2017,
                "TNT_Area": "Lakefront",
                "Neighborhood": "Lakefront",
                "Specific_Location": "Pedestrian bridge sidewall at 507 Plum Street ",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.161227,
                    43.056433
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 64,
                "Title": "Bicylce Capital of the World",
                "Type": "Mural",
                "Address": "214 S. Geddes Street",
                "Latitude": 43.045117,
                "Longitude": "-76.171451",
                "Artist_Last_": "Roberts",
                "Artist_First": "Jacob",
                "Additional_Artists": null,
                "Media": "Acrylic",
                "Year_Created": 2018,
                "Year_Erected": 2018,
                "TNT_Area": "Westside",
                "Neighborhood": "Westside",
                "Specific_Location": "South façade of building",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.171451,
                    43.045117
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 65,
                "Title": "1022 W, Fayette St Mural",
                "Type": "Mural",
                "Address": "1022 W. Fayette Street",
                "Latitude": 43.046069,
                "Longitude": "-76.170632",
                "Artist_Last_": "Stetz",
                "Artist_First": "Eugene",
                "Additional_Artists": null,
                "Media": "Acrylic",
                "Year_Created": 2018,
                "Year_Erected": 2018,
                "TNT_Area": "Westside",
                "Neighborhood": "Westside",
                "Specific_Location": "East façade of building",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.170632,
                    43.046069
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 66,
                "Title": "Be Yourself/Umbrellove",
                "Type": "Mural",
                "Address": "713 E. Fayette Street",
                "Latitude": 43.048774,
                "Longitude": "-76.141028",
                "Artist_Last_": "Walker ",
                "Artist_First": "Ally ",
                "Additional_Artists": null,
                "Media": "Acrylic",
                "Year_Created": 2019,
                "Year_Erected": 2020,
                "TNT_Area": "Eastside",
                "Neighborhood": "Eastside",
                "Specific_Location": "East and west facades of building",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.141028,
                    43.048774
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 67,
                "Title": "Diversity Lives Heree",
                "Type": "Mural",
                "Address": "1415 Highland Street",
                "Latitude": 43.071981,
                "Longitude": "-76.14212",
                "Artist_Last_": "various",
                "Artist_First": null,
                "Additional_Artists": null,
                "Media": "Acrylic",
                "Year_Created": 2019,
                "Year_Erected": 2020,
                "TNT_Area": "Northside",
                "Neighborhood": "Northside",
                "Specific_Location": "West façade of building",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.14212,
                    43.071981
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 68,
                "Title": "Middle Eastern Dreams",
                "Type": "Mural",
                "Address": "501-507 Westcott Street",
                "Latitude": 43.041191,
                "Longitude": "-76.119034",
                "Artist_Last_": "Odeh",
                "Artist_First": "Nada",
                "Additional_Artists": null,
                "Media": "Acrylic",
                "Year_Created": 2020,
                "Year_Erected": 2020,
                "TNT_Area": "Eastside",
                "Neighborhood": "Eastside",
                "Specific_Location": "South façade of building",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.119034,
                    43.041191
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 69,
                "Title": "Lets Fly Syracuse",
                "Type": "Mural ",
                "Address": "547-53 N Salina St",
                "Latitude": 43.058666,
                "Longitude": "-76.152398",
                "Artist_Last_": "Colello",
                "Artist_First": "Jacqueline",
                "Additional_Artists": null,
                "Media": "latex paints",
                "Year_Created": 2021,
                "Year_Erected": 2021,
                "TNT_Area": "Northside",
                "Neighborhood": "Northside",
                "Specific_Location": "northside of property",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.152398,
                    43.058666
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 70,
                "Title": "Welcome Downtown",
                "Type": "Mural",
                "Address": "327 W. Fayette St",
                "Latitude": 43.048515,
                "Longitude": "-76.15657",
                "Artist_Last_": "Walker ",
                "Artist_First": "Ally ",
                "Additional_Artists": null,
                "Media": "latex paints",
                "Year_Created": 2021,
                "Year_Erected": 2021,
                "TNT_Area": "Downtown",
                "Neighborhood": null,
                "Specific_Location": null,
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.15657,
                    43.048515
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 71,
                "Title": "Eva's Mural",
                "Type": "Mural",
                "Address": "1305 Milton St",
                "Latitude": 43.059561,
                "Longitude": "-76.199771",
                "Artist_Last_": "Colello",
                "Artist_First": "Jacqueline",
                "Additional_Artists": null,
                "Media": "latex paints",
                "Year_Created": 2022,
                "Year_Erected": 2022,
                "TNT_Area": "Westside",
                "Neighborhood": "Westside",
                "Specific_Location": "East wall of property",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.199771,
                    43.059561
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 72,
                "Title": "And Still We Rise",
                "Type": "Mural",
                "Address": "509 W Fayette St",
                "Latitude": 43.047823,
                "Longitude": "-76.162124",
                "Artist_Last_": "Valenzuela",
                "Artist_First": "Cayetano",
                "Additional_Artists": null,
                "Media": "paint",
                "Year_Created": 2022,
                "Year_Erected": 2022,
                "TNT_Area": "Westside",
                "Neighborhood": "Westside",
                "Specific_Location": "West façade of building",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.162124,
                    43.047823
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 73,
                "Title": "Three Seas for Syracuse",
                "Type": "Mural",
                "Address": "1732 Erie Blvd E",
                "Latitude": 43.049369,
                "Longitude": "-76.120329",
                "Artist_Last_": "Burgevin",
                "Artist_First": "Daniel",
                "Additional_Artists": null,
                "Media": "latex paints",
                "Year_Created": null,
                "Year_Erected": 2022,
                "TNT_Area": "Eastside",
                "Neighborhood": "Eastside",
                "Specific_Location": "West façade of the building",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.120329,
                    43.049369
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 74,
                "Title": "This Must Be The Place",
                "Type": "Mural",
                "Address": "441 E. Washington Street",
                "Latitude": 43.049725,
                "Longitude": "-76.146012",
                "Artist_Last_": "Thomas",
                "Artist_First": "Cecily",
                "Additional_Artists": null,
                "Media": null,
                "Year_Created": 2022,
                "Year_Erected": 2022,
                "TNT_Area": "Downtown",
                "Neighborhood": "Downtown",
                "Specific_Location": "West facing wall",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.146012,
                    43.049725
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 75,
                "Title": "Salt City Market Mural",
                "Type": "Mural",
                "Address": "480 S. Salina Street",
                "Latitude": 43.044865,
                "Longitude": "-76.152691",
                "Artist_Last_": "Linsner",
                "Artist_First": "Audra",
                "Additional_Artists": null,
                "Media": null,
                "Year_Created": 2022,
                "Year_Erected": 2022,
                "TNT_Area": "Downtown",
                "Neighborhood": "Downtown",
                "Specific_Location": null,
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.152691,
                    43.044865
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 76,
                "Title": "We are the Village within the City",
                "Type": "Mural",
                "Address": "2384 James Street",
                "Latitude": 43.068128,
                "Longitude": "-76.112995",
                "Artist_Last_": "Bingham",
                "Artist_First": "Daniel",
                "Additional_Artists": null,
                "Media": null,
                "Year_Created": 2022,
                "Year_Erected": 2022,
                "TNT_Area": "Eastwood",
                "Neighborhood": "Eastwood",
                "Specific_Location": "east wall of Palace Theater",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.112995,
                    43.068128
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 77,
                "Title": "Southside Mural Project",
                "Type": "Mural",
                "Address": "Taylor Street Bridge St over S. Salina St",
                "Latitude": 43.039379,
                "Longitude": "-76.150402",
                "Artist_Last_": "Ladd",
                "Artist_First": "London",
                "Additional_Artists": null,
                "Media": "Acrylic",
                "Year_Created": 2017,
                "Year_Erected": 2017,
                "TNT_Area": "Southside",
                "Neighborhood": "Southisde",
                "Specific_Location": "Bridge underpass walls, both sides of S. Salina St",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.150402,
                    43.039379
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 78,
                "Title": "Syracuse Firsts",
                "Type": "Mural",
                "Address": "333 E Onondaga St",
                "Latitude": 43.047617,
                "Longitude": "-76.148531",
                "Artist_Last_": "Never",
                "Artist_First": "Jonas",
                "Additional_Artists": null,
                "Media": "spray paint on cement block",
                "Year_Created": null,
                "Year_Erected": null,
                "TNT_Area": "Downtown",
                "Neighborhood": "Downtown",
                "Specific_Location": "East façade of Monroe Building",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.148531,
                    43.047617
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 79,
                "Title": "24 Second Clock",
                "Type": "Sculpture",
                "Address": "290 West Jefferson St",
                "Latitude": 43.047776,
                "Longitude": "-76.155383",
                "Artist_Last_": null,
                "Artist_First": null,
                "Additional_Artists": null,
                "Media": null,
                "Year_Created": null,
                "Year_Erected": 2005,
                "TNT_Area": "Downtown",
                "Neighborhood": "Armory Square",
                "Specific_Location": "Corner of S. Franklin & W. Jefferson",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.155383,
                    43.047776
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "FID": 80,
                "Title": "Whales Tale",
                "Type": "Sculpture",
                "Address": "200-14 S Salina St",
                "Latitude": 43.04935,
                "Longitude": "-76.152557",
                "Artist_Last_": "Nelson",
                "Artist_First": "Miriam",
                "Additional_Artists": null,
                "Media": "Painted Aluminum",
                "Year_Created": 2003,
                "Year_Erected": 2021,
                "TNT_Area": "Downtown",
                "Neighborhood": "Downtown",
                "Specific_Location": "Perseverance Park",
                "Image_Url": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.152557,
                    43.04935
                ]
            }
        }
    ]
}
console.log(JSON.parse(JSON.stringify(filter(art))));