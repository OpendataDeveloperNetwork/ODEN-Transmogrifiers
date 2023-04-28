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
const null_check = (dst, data, data_field, skip_errors, errors) => {
  // data is null, undefined or an empty object
  if (!data || Object.keys(data).length === 0) {
    throw new Error("No data or data field given")
  }
  if (data_field) {
    dst = data_field
    return true
  }
  // null data_field and skip errors
  if (!data_field && skip_errors) {
    console.log(`A required value was undefined in the data. The field ${data_field} was skipped.`)
  } else {
    // null data_field and no skip errors
    errors.push(data)
  }
  return false  
}

// takes the whole details object and removes any null values
// use case: item.details = remove_if_null(details);
const remove_if_null = function(details_obj){
  // go through the details object and remove any null, undefined, length 0, and if its a string with only white spaces (trim begin and end spaces, and if length is 0 then we know that the string is just white spaces)
  Object.keys(details_obj).forEach(key => {
      if (details_obj[key] === null || details_obj[key] === undefined || details_obj[key].length <= 0 || details_obj[key].trim().length === 0) {
        delete details_obj[key];
      }
    });
    // return the details object without null values
    return details_obj
}

lib.set("csv_parser", csv_parser);
lib.set("null_check", null_check);
lib.set("remove_if_null", remove_if_null);
return lib;
