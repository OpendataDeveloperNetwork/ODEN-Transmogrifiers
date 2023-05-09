const filter = function (data, params) {
    // check for schema
    if (!params.schema) {
        throw "schema not found";
    }

    // detect the schema type, and get the corresponding validator
    let schema;
    let validator;
    let type;
    try {
        let json_schema = JSON.parse(params.schema);
        schema = json_schema;
        type = "JSON";
        validator = params.json_validator;
    } catch { };

    // check for unsupported schema type (!schema) or missing validator for schema type (!validator)
    if (!schema) {
        "unknown/unsupported schema type"
    }
    if (!validator) {
        throw "validator for schema type not found"
    }

    let valid_data = [];
    data.data.map(d => {
        switch (type) {
            case "JSON": {
                let result = validator.validate(d, schema, { required: true });
                if (!result.valid) {
                    data.errors.push({ type: "validate-json", validation_result: result, data_entry: d })
                } else {
                    valid_data.push(d);
                }
            }
            default: {
                throw "data type not supported";
            }
        }
    })
    return { data: valid_data, errors: data.errors };
}
return filter;