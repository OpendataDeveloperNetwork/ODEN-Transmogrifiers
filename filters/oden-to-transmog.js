const library_url = "https://raw.githubusercontent.com/OpendataDeveloperNetwork/ODEN-Transmogrifiers/dev/libraries/standard.js";
const collector_url = "https://raw.githubusercontent.com/OpendataDeveloperNetwork/ODEN-Transmogrifiers/dev/collectors/collector-json.js";
const label_url = "https://raw.githubusercontent.com/OpendataDeveloperNetwork/ODEN-Transmogrifiers/dev/filters/label.js";
const validate_url = "https://raw.githubusercontent.com/OpendataDeveloperNetwork/ODEN-Transmogrifiers/dev/filters/validate.js";
const stringify_url = "https://raw.githubusercontent.com/OpendataDeveloperNetwork/ODEN-Transmogrifiers/dev/filters/stringify.js";

const filter = function (data, params) {
    if (typeof data === 'string' || data instanceof String) {
        data = JSON.parse(data);
    }

    // ordered specifically for readablity
    let schema_entry_obj = {schema: ""};
    
    collector_filter = {func: collector_url};
    validate_filter = {func: validate_url, params: {validator: "json"}};
    // stringify_filter = {func: stringify_url, params: {indent: true}};
    
    schema_entry_obj.filters = [collector_filter, validate_filter];

    // schema_entry_obj.sinks = [{func: "file_write", params: {path: "public-art-data.json"}}];

    schema_entry_obj.entries = [];

    let category = params.category
    data.map((item) => {
        if (item.labels.category === category) {
            let skip = false;
            schema_entry_obj.schema = item.data.schema;

            let entry_obj = {};
            
            // source
            if (item.data.datasets.json?.url){
                entry_obj.source = {func: "url_read", params: {path: item.data.datasets.json.url}};
            } else {
                skip = true;
            }
            
            // filters
            entry_obj.filters = [];
            
            // standardize filter
            if (item.data.datasets.json?.filters?.json){
                standardize_filter = {func: item.data.datasets.json.filters.json, params:{"library": library_url}};
                entry_obj.filters.push(standardize_filter);
            } else {
                skip = true;
            }

            // label filter
            label_filter = {func: label_url, params: {labels: item.labels}};
            entry_obj.filters.push(label_filter);
            
            if (!skip) {
                schema_entry_obj.entries.push(entry_obj);
            }
        }
    })
    return schema_entry_obj;
}
return filter;