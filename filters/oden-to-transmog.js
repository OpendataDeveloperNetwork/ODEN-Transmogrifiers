const filter = function (data, params) {
    if (typeof data === 'string' || data instanceof String) {
        data = JSON.parse(data);
    }

    let output_obj = {schema: "", entries: []};
    let category = params.category
    data.map((item) => {
        if (item.labels.category === category) {
            output_obj.schema = item.data.schema;

            let entry_obj = {};
            if (item.data.datasets.json.url){
                entry_obj.source = {func: "url_read", params: {path: item.data.datasets.json.url}};
            }
            if (item.data.datasets.json.filters.json){
                entry_obj.filters = {func: item.data.datasets.json.filters.json, params:{library: "https://raw.githubusercontent.com/OpendataDeveloperNetwork/ODEN-Transmogrifiers/dev/libraries/standard.js"}};
            }
            output_obj.entries.push(entry_obj);
        }
    })
    return output_obj;
}
return filter;