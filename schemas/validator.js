const { default: axios } = require("axios");
const validator = require('jsonschema').Validator;

const test_validate = async function() {
    let schema = await axios({
        url: "https://raw.githubusercontent.com/OpendataDeveloperNetwork/ODEN-Transmogrifiers/main/schemas/public-art.json",
        method: 'GET',
        responseType: 'blob',
    })
    schema = JSON.parse(schema.data);

    // filter data and assign result to my_new_data

    const v = new validator();
    my_new_data.map(d => {
        v.validate(d, schema, {required: true, throwFirst: true});
    })
}