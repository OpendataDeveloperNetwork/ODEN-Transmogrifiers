const collector_json = async function (datas, params) {
    if (!datas) {
            // Handle the case where datas is not defined or not an array
            console.error("Invalid or undefined datas:", datas);
            return { data: [], errors: ["Invalid or undefined datas"] };
    }

    // convert JSON data string to object form
    for (let [i, data] of datas.entries()) {
        console.log(data)
        if (typeof data === 'string' || data instanceof String) {
            datas[i] = JSON.parse(data);
        }
    }

    // create combined data and errors arrays
    let combined_data = [];
    let combined_errors = [];

    // for each entry in the data go through valid entries and errors and add
    // them to the combined arrays
    datas.map(d => {
        if (d && d.data && Array.isArray(d.data)) {
            d.data.map(valid_entry => {
                combined_data.push(valid_entry);
            });
        }

        if (d && d.errors && Array.isArray(d.errors)) {
            d.errors.map(error => {
                combined_errors.push(error);
            });
        }
    });

    // add the combined data and errors into one object
    let data_and_errors = { data: combined_data, errors: combined_errors };
    return data_and_errors;
};
return collector_json;
