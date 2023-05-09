const filter = function (data, params) {
    let stringified = false;
    try {
        let new_data = JSON.stringify(data.data, null);
        data.data = new_data;
        stringified = true;
    } catch {};

    if (!stringified) {
        data.errors.push({type: "stringify", reason: "unknown/unsupported input data", data_entry: data.data});
        data.data = []; // should we clear this?
    }

    return data;
}
return filter;