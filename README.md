# Static File Host
This is a simple app for hosting static files and listing them in a table.

Written by [Brian Mitchell](https://brianm.me)

## Use

`npm install`

`npm start`

## JSON File Schema

For each file that you want to appear in the table, add a JSON file with the following format:

```json
{
  "title": "Name of Game",
  "os": "macOS",
  "filename": "installer.zip",
  "url": "http://store.steampowered.com/app/123456789", //optional
  "note": "This file has a note" //optional
}
```

Each JSON file is read on every page load to generate the table. The files that they are providing metadata to are also checked on every page load for a file size. This allows for the ability to add a new file or make changes without restarting the server.

To change the port, edit the appreciate line in `bin/www` or store the desired port in a `PORT` environmental variable.