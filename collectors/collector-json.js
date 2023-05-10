const collector_json = function (data, params) {
    if (typeof data === 'string' || data instanceof String) {
        data = JSON.parse(data);
    }

    let combined_data = [];
    let combined_errors = [];

    data.map(d => {
        d.data.map(valid_entry => {
            combined_data.push(valid_entry)
        })
        d.errors.map(error => {
            combined_errors.push(error)
        })
    })

    let data_and_errors = {data: combined_data, errors: combined_errors};

    if (params.stringify && params.indent) {
        data_and_errors = JSON.stringify(data_and_errors, null, "    ");
    }else if (params.stringify && !params.indent) {
        data_and_errors = JSON.stringify(data_and_errors, null, "");
    } else {
        data_and_errors = JSON.stringify(data_and_errors, null);
    }
    return data_and_errors;
}