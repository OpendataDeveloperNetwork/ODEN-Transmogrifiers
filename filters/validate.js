const filter = function (data, params) {
    // check for schema
    if (!params.schema) {
        throw "schema not found";
    }

    // detect schema type and parse schema
    let schema;
    let validator;
    let schemaType;
    let validatorType;
    try {
        let json_schema = JSON.parse(params.schema);
        schema = json_schema;
        schemaType = "json";
    } catch { };

    // get validator for schema type
    switch (schemaType) {
        case "json": {
            if (params["jsonschema"]) {
                validator = params["jsonschema"];
                validatorType = "jsonschema";
            } else if (params["ajv"]) {
                validator = params["ajv"].compile(schema);
                validatorType = "ajv";
            }
        }
    }

    // check for unsupported schema type (!schema) or missing validator for schema type (!validator)
    if (!schema) {
        "validate: unknown/unsupported schema type"
    }
    if (!validator) {
        throw "validate: validator for schema type not found"
    }
    console.log("passed check")
    console.log(typeof data.entries)
    let valid_data = [];
    
    data.entries.map(d => {
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
                    default: {
                        throw "validate: validator not supported"
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
