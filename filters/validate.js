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
        console.log("PARSING SCHEMA");
        let json_schema = JSON.parse(params.schema);
        schema = json_schema;
        schemaType = "json";
        console.log("SCHEMA: " + schema);

        console.log("SELECTING VALIDATOR");
        if (params["jsonschema"]) {
            validator = params["jsonschema"];
            validatorType = "jsonschema";
        } else if (params["ajv"]) {
            console.log("AJV");
            validator = params["ajv"].compileSchema(schema);
            validatorType = "ajv";
            console.log("COMPILED SCHEMA");
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
                        console.log("RUNNING AJV ON" + JSON.stringify(d, null));
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