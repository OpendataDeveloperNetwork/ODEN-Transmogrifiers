const filter = function (data, std_lib, schema, validator, stringify) {
    if (typeof data === 'string' || data instanceof String) {
        data = JSON.parse(data);
    }

    if (!std_lib) {
        throw "standard library not provided";
    }
    let validate_params = std_lib.get("validate_params");

    // validate parameters object
    schema = validate_params(schema, validator);

    let new_data = [];
    let errors = [];

    data.map(d => {
        let result = validator.validate(item, schema, { required: true });
        if (!result.valid) {
            errors.push({ type: "validation", validation_result: result, data_entry: d })
        } else {
            new_data.push(item);
        }
    })

    if (stringify) {
        new_data = JSON.stringify(new_data, null);
    }
    return { data: new_data, errors: errors };
}
return filter;