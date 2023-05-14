const library_url = "https://raw.githubusercontent.com/OpendataDeveloperNetwork/ODEN-Transmogrifiers/dev/libraries/standard.js";
const collector_url = "https://raw.githubusercontent.com/OpendataDeveloperNetwork/ODEN-Transmogrifiers/dev/collectors/collector-json.js";
const label_url = "https://github.com/OpendataDeveloperNetwork/ODEN-Transmogrifiers/blob/dev/filters/label.js";
const validate_url = "https://github.com/OpendataDeveloperNetwork/ODEN-Transmogrifiers/blob/dev/filters/validate.js";
const strigify_url = "https://raw.githubusercontent.com/OpendataDeveloperNetwork/ODEN-Transmogrifiers/dev/filters/stringify.js";

const filter = function (data, params) {
    if (typeof data === 'string' || data instanceof String) {
        data = JSON.parse(data);
    }

    // ordered specifically for readablity
    let output_obj = {schema: ""};
    
    collector_filter = {func: collector_url};
    validate_filter = {func: validate_url, params: {validator: "json"}};
    strigify_filter = {func: strigify_url, params: {indent: true}};
    
    output_obj.filters = [collector_filter, validate_filter, strigify_filter];

    output_obj.sinks = [{func: "file_write", params: {path: "public-art-data.json"}}];

    output_obj.entries = [];

    let category = params.category
    data.map((item) => {
        if (item.labels.category === category) {
            output_obj.schema = item.data.schema;

            let entry_obj = {};
            
            // source
            if (item.data.datasets.json.url){
                entry_obj.source = {func: "url_read", params: {path: item.data.datasets.json.url}};
            }
            
            // filters
            entry_obj.filters = [];
            
            // standardize filter
            if (item.data.datasets.json.filters.json){
                standardize_filter = {func: item.data.datasets.json.filters.json, params:{"library": library_url}};
                entry_obj.filters.push(standardize_filter);
            }

            // label filter
            label_filter = {func: label_url, params: {labels: item.labels}};
            entry_obj.filters.push(label_filter);
            
            output_obj.entries.push(entry_obj);
        }
    })
    return output_obj;
}
return filter;