const express = require('express');

const router = express.Router();
const fs = require('fs');
const path = require('path');
const filesize = require('file-size');

/* GET home page. */
router.get('/', (req, res) => {
  const p = 'public/files';
  const jsons = [];
  fs.readdir(
    p, (err, files) => {
      if (err) throw err;

      files
        .map(file => path.join(p, file))
        .filter(file => fs.statSync(file).isFile() && path.extname(file) === '.json')
        .forEach((file) => {
          fs.readFile(file, 'utf8', (e, data) => {
            if (e) throw e;
            const tempFile = JSON.parse(data);
            const sizeInBytes = fs.statSync(`${p}/${tempFile.filename}`).size;
            tempFile.filesize = filesize(sizeInBytes).human('si');
            tempFile.downloads = tempFile.filename in req.app.locals.stats
              ? req.app.locals.stats[tempFile.filename]
              : 0;
            jsons.push(tempFile);
          });
          console.log('Found %s', file);
        });
    },
    res.render('index', {
      title: 'LAN Party Resources',
      subtitle: 'Games and other resources to alleviate our time distributing files.',
      description: 'Each file <em>should</em> contain instructions on how to install.',
      bandwidth: `We have served ${filesize(req.app.locals.stats.bandwidth).human('si')} since ${req.app.locals.stats.startup.toLocaleString()}`,
      files: jsons.sort((a, b) => a.title.localeCompare(b.title)),
    }),
  );
});

module.exports = router;
