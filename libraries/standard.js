const lib = new Map();

// check if read values are null, undefined or blank (empty string)
// dst: destination object, data: data item being processed, 
// data_field: field being processed, skip_errors: boolean, errors: array of bad data items
const null_check_function = (dst, data, data_field, skip_errors, errors) => {
  // data or data_field are null or undefined, or data is empty object
  if (!data || Object.keys(data).length === 0 || !data_field) {
    console.log("No data or data field supplied")
    return false
  }
  if (data[data_field]) {
    dst = data[data_field]
    console.log(`${data[data_field]} has been added to the destination object.`)
    return true
  }
  // null data[data_field] and skip errors
  if (!data[data_field] && skip_errors) {
    console.log(`A required value was undefined in the data. The field ${data_field} was skipped.`)
  } else {
    // null data[data_field] and no skip errors
    errors.push(data_field)
    console.log(`A required value was undefined in the data. The field ${data_field} was added to the errors array.`)
  }  
}
lib.set("null_check_function", null_check_function);

// const example_function = function(example_parameter) {
//     console.log("some example behaviour " + example_parameter);
// }
// lib.set("example_function", example_function);
 
return lib;