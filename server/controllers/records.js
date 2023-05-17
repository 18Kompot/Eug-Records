module.exports = {
  list: async function (request, result, next) {
    try {
      var col = request.client.user().collection();
      col.getReleases("Primo18", 0, function (err, data) {
        // fs.writeFile('./records.json', JSON.stringify(data), (err) => {
        //   if (err) {
        //     console.error(err);
        //   }
        //   // file written successfully
        // });

        result.json(data);
      });
    } catch (err) {
      result.status(400).json({ error: `${err}` });
    }
  },

  details: async function (request, result, next) {
    try {
      var db = request.client.database();
      const id = parseInt(request.params.id);
      db.getRelease(id, function (err, data) {
        result.json({
          ...data,
          cover_image: data.images[0].resource_url,
        });
      });
    } catch (err) {
      result.status(400).json({ error: `${err}` });
    }
  },
};

// var db = new Discogs().database();
// db.getRelease(176126, function (err, data) {
//   console.log(data);
// });
