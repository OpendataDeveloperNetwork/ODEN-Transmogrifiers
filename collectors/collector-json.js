const collector_json = function (datas, params) {
    // convert JSON data string to object form

    let json_data = [];
    for (let data of datas) {
        if (typeof data === 'string' || data instanceof String) {
            json_data.push(JSON.parse(data));
        } else {
            json_data.push(data);
        }
    }

    // create combined data and errors arrays
    let combined_data = [];
    let combined_errors = [];

    // for each entry in the data go through valid entries and errors and add
    // them to the combined arrays
    json_data.map(d => {
        d.data.map(valid_entry => {
            combined_data.push(valid_entry)
        })
        d.errors.map(error => {
            combined_errors.push(error)
        })
    })

    // add the combined data and errors into one object
    let data_and_errors = {data: combined_data, errors: combined_errors};
    return data_and_errors;
}
return collector_json;