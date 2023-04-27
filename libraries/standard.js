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
lib.set("csv_parser", csv_parser);
return lib;
