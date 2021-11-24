var zip = require('express-easy-zip');
var express = require('express');
var formidable = require('formidable');
var temp = require('temp');
var exec = require('child_process').exec;

var app = express();
temp.track();

app.use(zip());

let newPath;

app.post('/qr', function(req, res) {
    var form = new formidable.IncomingForm();
    
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.filepath;
      
      temp.mkdir('cwa-qr-code', function(err, dirPath) {
        exec('cwa-event-qr-code poster --csv ' + oldpath + ' --dest ' + dirPath, function(err) {
            if (err) {
                throw err;
            }
            res.zip({
                files: [{
                    path: dirPath,
                    name: 'CWA-QR-Codes'
                }],
                filename: 'CWA-QR-Codes.zip'
            });
        });
      });
    });
    
});

app.get('/', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="qr" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
});

app.listen(8080);