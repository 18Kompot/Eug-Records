module.exports = {
  list: async function (request, result, next) {
    try {
      const client = request.client;
      var col = client.user().collection();
      col.getReleases(
        "Primo18",
        0,
        { page: 1, per_page: 75 },
        function (err, data) {
          result.json(data);
        }
      );
    } catch (err) {
      result.status(400).json({ error: `${err}` });
    }
  },
};
