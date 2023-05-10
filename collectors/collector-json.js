const collector_json = function (data, params) {
    // convert JSON data string to object form
    if (typeof data === 'string' || data instanceof String) {
        data = JSON.parse(data);
    }

    // create combined data and errors arrays
    let combined_data = [];
    let combined_errors = [];

    // for each entry in the data go through valid entries and errors and add
    // them to the combined arrays
    data.map(d => {
        d.data.map(valid_entry => {
            combined_data.push(valid_entry)
        })
        d.errors.map(error => {
            combined_errors.push(error)
        })
    })

    // add the combined data and errors into one object
    let data_and_errors = {data: combined_data, errors: combined_errors};

    // stringify in different formats depending on params
    if (params["stringify"] === true && params["indent"] === true) {
        data_and_errors = JSON.stringify(data_and_errors, null, "    ");
    }else if (params["stringify"] === true && !params.indent) {
        data_and_errors = JSON.stringify(data_and_errors, null, "");
    } 
    return data_and_errors;
}
return collector_json;