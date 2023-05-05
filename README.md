# Transmogrifiers
This repo contains the filters, standard library, and schema files to properly process public art json files retrieved from open data sets provided by municipalities.

## Functionality
The filter folders contains javascript files designed to process json files that are retrieved from open public art datasets into a format that is much more usable for developeres to consume. This format is defined in `schemas/public-art.json` and defines required and optional attributes that are most likely to be desired by developers. 


## Directory Structure
```
project
│   README.md   
│
└───filters { Filters for available public art data sets }
│   └─── (country) 
|           └─── (region)
|                   └─── (city)
|                           | public-art-json-to-json.js
│
└───libraries { standard libraries }
│   │   standard.js
│
└───schemas { standard schemas for different datasets }
    │   public-art.json
```
The country, region, and city are placeholders for the actual city's information.
The files located under each city follow the format of: 
*what the filter is used for*-*input type*-to-*output type*.js