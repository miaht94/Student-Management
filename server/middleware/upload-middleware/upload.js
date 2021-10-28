const { RES_FORM } = require("../../configs/Constants");
const path = require('path')
const { v4: uuidv4 } = require('uuid');
/** Must call  handleUploadFile before*/
function fHandleUploadFile (req, res) {
    res.status(200);
    res.json(RES_FORM("Success", {link: "/public/data/" + req.fileName}));
}
/** Support upload file to public/data */
function handleUploadFile(req, res, next) {
    let sampleFile;
    let uploadPath;
    
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.file;
    var fileName = sampleFile.name.split(".");
    var ext = "."
    if (fileName.length > 0) {
        console.log(fileName);
        ext += fileName[fileName.length - 1];
        fileName = uuidv4() + ext;
    }
    else fileName = uuidv4();
    uploadPath = path.resolve(__dirname, "..", "..", "public", "data")
    uploadPath = uploadPath + "/" + fileName;
    console.log(uploadPath);
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function(err) {
        if (err)
            return res.status(500).send(err);
        req.fileUploadPath = uploadPath;
        req.fileName = fileName;
        next();
    });
}
module.exports = {fHandleUploadFile, fHandleUploadDSCV, handleUploadFile}