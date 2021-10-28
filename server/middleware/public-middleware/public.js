const path = require('path');
function fGetPublicData(req, res) {

    let filePath = path.resolve(__dirname, "..", "..", "public", "data", req.params.filename);
    // res.status(200);
    res.download(filePath, function (err) {
        if (err) {
          // Handle error, but keep in mind the response may be partially-sent
          // so check res.headersSent
        } else {
          // decrement a download credit, etc.
        }
      });
}

module.exports = {fGetPublicData};