const filter = function (data, params) {
    let stringified = false;
    try {
        let indent = "";
        if (params["JSON-indent"] === true) {
            indent = "    ";
        }
        let new_data = JSON.stringify(data, null, indent);
        data = new_data;
        stringified = true;
    } catch {};

    if (!stringified) {
        throw "stringify: unknown/unsupported data type"
    }

    return data;
}
return filter;