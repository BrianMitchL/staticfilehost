var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var filesize = require('file-size');

/* GET home page. */
router.get('/', function(req, res, next) {
  var p = 'public/files';
  var jsons = [];
  fs.readdir(p, function (err, files) {
    if (err) throw err;

    files.map(function (file) {
      return path.join(p, file);
    }).filter(function (file) {
      return fs.statSync(file).isFile();
    }).forEach(function (file) {
      if (path.extname(file) === '.json') {
        fs.readFile(file, 'utf8', function (err, data) {
          if (err) throw err;
          var tempFile = JSON.parse(data);
          var sizeInBytes = fs.statSync(p+'/'+tempFile['filename'])['size'];
          tempFile['filesize'] = filesize(sizeInBytes).human('si');
          jsons.push(tempFile);
        });
        console.log("%s (%s)", file, path.extname(file));
      }
    });
  },
    res.render('index', {
      title: 'LAN Party Resources',
      subtitle: 'Games and other resources to alleviate our time distributing files.',
      description: 'Each file <em>should</em> contain instruction on how to install.',
      files: jsons
    })
  );
});

module.exports = router;
