const filter = function (data, stringify) {
  if (typeof data === "string" || data instanceof String) {
    data = JSON.parse(data);
  }

  let new_data = [];

  data.map((d) => {
    let item = {};
    item.name = d.list_title;
    if (item.name === undefined) {
      console.log(`Data name not found for art with url ${d.url}`);
    }
    let coordinates = {
      longitude: d.longitude,
      latitude: d.latitude,
    };
    if (
      coordinates.longitude === undefined ||
      coordinates.latitude === undefined
    ) {
      console.log(`Data coordinates not found for art with url ${d.url}`);
    }
    item.coordinates = coordinates;
    new_data.push(item);
  });

  if (stringify) {
    return JSON.stringify(new_data, null);
  }

  return new_data;
};

fetch("https://data.cambridgema.gov/resource/p4zn-aid4.json") // your dataset json
  .then((response) => response.json())
  .then((data) => {
    console.log(filter(data));
  })
  .catch((error) => {
    console.error(error);
  });

return filter;
