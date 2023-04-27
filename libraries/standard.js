const lib = new Map();

// check if read values are null, undefined or blank (empty string)
// dst: destination object, data: data item being processed, 
// data_field: field being processed, skip_errors: boolean, errors: array of bad data items
const null_check = (dst, data, data_field, skip_errors, errors) => {
  // data is null, undefined or an empty object
  if (!data || Object.keys(data).length === 0) {
    console.log("No data or data field supplied")
    return false
  }
  if (data_field) {
    dst = data_field
    console.log(`${data_field} has been added to the destination object.`)
    return true
  }
  // null data_field and skip errors
  if (!data_field && skip_errors) {
    console.log(`A required value was undefined in the data. The field ${data_field} was skipped.`)
  } else {
    // null data_field and no skip errors
    errors.push(data)
    console.log(`A required value was undefined in the data. The field ${data_field} was added to the errors array.`)
  }  
}
lib.set("null_check", null_check);

// const example_function = function(example_parameter) {
//     console.log("some example behaviour " + example_parameter);
// }
// lib.set("example_function", example_function);
 
return lib;