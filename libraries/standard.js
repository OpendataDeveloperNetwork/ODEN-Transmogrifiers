const lib = new Map();

// Description: Parse a CSV string into an array of objects
const csv_parser = function (csv_string) {
  // Source: https://stackoverflow.com/questions/8493195/how-can-i-parse-a-csv-string-with-javascript-which-contains-comma-in-data
  var re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;

  if (!re_valid.test(csv_string)) {
    throw new Error("Invalid CSV string");
  }

  let new_data = [];
  let lines = csv_string.split(/\r|\n/); // Current delimiters is return or newline
  let headers = lines[0].split(",");
  lines.shift();

  lines.map(d => {
    let obj = {};
    let currentline = d.split(",");
    headers.map((h, i) => {
      let temp_num = Number(currentline[i]);
      if (temp_num) {
        obj[h] = temp_num;
      } else {
        obj[h] = currentline[i];
      }
    })
    new_data.push(obj);
  })
  return new_data;
}


// check if read values are null, undefined or blank (empty string)
// dst: destination object, data: data item being processed, 
// data_field: field being processed, skip_errors: boolean, errors: array of bad data items
const add_required = (dst, dst_field, data, data_field, skip_errors, errors) => {
  // data is null, undefined or an empty object
  if (!data || Object.keys(data).length === 0) {
    throw new Error("No data or data field given")
  }
  if (data_field) {
    dst[dst_field] = data_field
    return true
  }
  // null data_field and skip errors
  if (!data_field && skip_errors) {
    console.log(`A required field ${dst_field} was undefined or null. Skipping entry`)
  } else {
    // null data_field and no skip errors
    let err = { missing_field: dst_field, data_entry: data }
    errors.push(err);
  }
  return false
}

const add_if_not_null = (dst, dst_field, src) => {
  if (src) {
    dst[dst_field] = src
    return true
  }
  return false
}

// takes the whole details object and removes any null values
// use case: item.details = remove_if_null(details);
const remove_if_null = function (details_obj) {
  // go through the details object and remove any null, undefined, length 0, and if its a string with only white spaces (trim begin and end spaces, and if length is 0 then we know that the string is just white spaces)
  Object.keys(details_obj).forEach(key => {
    if (details_obj[key] === null || details_obj[key] === undefined || details_obj[key].length <= 0 || details_obj[key].trim().length === 0) {
      delete details_obj[key];
    }
  });
  // return the details object without null values
  return details_obj
}

const remove_if_empty = function (object, field) {
  if (Object.keys(object[field]).length <= 0) {
    delete object[field];
  }
}


const create_dates_template = function() {
  return {
    created: {
      day: 0,
      month: 0,
      year: 0,
      date_string: "",
    },
    installed: {
        day: 0,
        month: 0,
        year: 0,
        date_string: "",
    },
    commissioned: {
        day: 0,
        month: 0,
        year: 0,
        date_string: "",
    }
  }
}

const remove_null_date_fields = function(item) {
  for (const property in item.dates) {
    remove_if_zero(item.dates[property]);
  }
  for (const att in item.dates) {
      if (Object.keys(item.dates[att]).length == 0) {
          delete item.dates[att];
      }
  }
  if (Object.keys(item.dates).length == 0) {
      delete item.dates;
  }
  return item;
}

const remove_if_zero = function(object) {
  for (const prop in object) {
      if (object[prop] == 0) delete object[prop];
      else if (object[prop] == "") delete object[prop];
  }
}

const validate_params = function (params) {
  // handle no passed options
  if (!params) {
    let empty_params = {};
    empty_params.stringify = false;
    empty_params.skip_errors = false;
    empty_params.validate = false;
    return empty_params;
  }

  // validation with schema
  if (params.schema && !params.validator) {
    throw "schema provided with no validator";
  } else if (!params.schema && params.validator) {
    throw "validator provided with no schema";
  } else if (params.schema && params.validator) {
    params.schema = JSON.parse(params.schema);
    params.validate = true;
  } else {
    params.validate = false;
  }

  return params;
}

lib.set("csv_parser", csv_parser);
lib.set("add_required", add_required);
lib.set("add_if_not_null", add_if_not_null);
lib.set("remove_if_null", remove_if_null);
lib.set("remove_if_empty", remove_if_empty);
lib.set("validate_params", validate_params);
lib.set("remove_null_date_fields", remove_null_date_fields);
lib.set("create_dates_template", create_dates_template);

return lib;
