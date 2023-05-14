const filter = function (data, params) {
    // check for schema
    if (!params.schema) {
        throw "schema not found";
    }

    // detect the schema type, and get the corresponding validator
    let schema;
    let validator;
    let schemaType;
    let validatorType;
    try {
        let json_schema = JSON.parse(params.schema);
        schema = json_schema;
        schemaType = "json";

        if (params["jsonschema"]) {
            validator = params["jsonschema"];
            validatorType = "jsonschema";
        } else if (params["ajv"]) {
            validator = params["ajv"].compileSchema(params.schema);
            validatorType = "ajv";
        }
    } catch { };

    // check for unsupported schema type (!schema) or missing validator for schema type (!validator)
    if (!schema) {
        "validate: unknown/unsupported schema type"
    }
    if (!validator) {
        throw "validate: validator for schema type not found"
    }

    let valid_data = [];
    data.data.map(d => {
        switch (schemaType) {
            case "json": {
                switch (validatorType) {
                    case "jsonschema": {
                        let result = validator.validate(d, schema, { required: true });
                        if (!result.valid) {
                            data.errors.push({ type: "validate-json", validation_result: result, data_entry: d });
                        } else {
                            valid_data.push(d);
                        }
                        break;
                    }
                    case "ajv": {
                        let valid = validator(d);
                        if (!valid) {
                            data.errors.push({ type: "validate-json", validation_result: validator.errors, data_entry: d });
                        } else {
                            valid_data.push(d);
                        }
                        break;
                    }
                }
                break;
            }
            default: {
                throw "validate: data type not supported";
            }
        }
    })
    return { data: valid_data, errors: data.errors };
}
return filter;