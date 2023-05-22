const filter = function (data, params) {
    let stringified = false;
    let new_data;
    try {
        let indent = "";
        if (params["indent"] === true) {
            indent = "    ";
        }
        new_data = JSON.stringify(data, null, indent);
        stringified = true;
    } catch {};

    if (!stringified) {
        throw "stringify: unknown/unsupported data type"
    }

    return new_data;
}
return filter;