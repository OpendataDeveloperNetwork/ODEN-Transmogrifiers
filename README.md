# Transmogrifiers
This repo contains the filters, standard library, and schema files to properly process public dataset json files retrieved from open data sets provided by municipalities.

## Functionality
The filter folder contains javascript files used to process json files for dataset standardization; these files are retrieved from open datasets. The output json is defined in the `schemas` folder.

### Public Art
ODEN currently works with public art datasets. The output json for this format is defined in `schemas/public-art.json` and defines required and optional attributes that are most likely to be desired by developers. 


## Directory Structure
```
project
│   README.md   
│
└───filters { Filters for available public data sets }
│   └─── (country) 
|           └─── (region)
|                   └─── (city)
|                           | public-(dataset)-json-to-json.js
│
└───libraries { standard libraries }
│   │   standard.js
│
└───schemas { standard schemas for different datasets }
    │   public-(dataset).json
```
The country, region, and city are placeholders for the actual city's information.
The dataset is a placeholder for the information the dataset contains.
The files located under each city follow the format of: 
`[what_the_filter_is_used_for]-[input_type]-to-[output_type].js`

For example, `bike-paths-geojson-to-json.js` or `public-restrooms-json-to-json.js`.