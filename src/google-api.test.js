const {Client} = require("@googlemaps/google-maps-services-js");

test('test google api', async () => {

    const client = new Client();
    await client
    .placesNearby({
      params: {
        location: [50.11, 8.678],
        key: process.env.GOOGLE_API_KEY,
        radius: 1000,
        type: 'restaurant'
      }
    })
    .then((r) => {
      console.log(r.data.results.slice(0,3));
    })
    .catch((e) => {
      console.log(e.response);
    });
});