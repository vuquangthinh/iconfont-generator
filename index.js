var builder = require('iconfont-builder');
var path = require('path');
var glob = require('glob');
var fs = require('fs');

var sourcePath = path.join(__dirname, 'src');
var destPath = path.join(__dirname, 'dest');
var fontName = 'quangthinh';

// simple script to extract svg to icon font, good for react-native-vector-icons
// size of font: 512x512
glob(sourcePath + '/*.svg', function(err, files) {
  if (err) {
    console.log(err);
    return;
  }

  // start codepoint from space -> ...
  let codepoint = 40;
  const icons = files.map(file => {
    const filename = path.basename(file);
    const name = filename.substr(0, filename.length - '.svg'.length);

    return {
      name,
      file: filename,
      codepoint
    };
  });

  var options = {
    icons,
    src: sourcePath,
    fontName: fontName,
    descent: 0,
    dest: destPath
  };

  builder(options)
    .then(value => {
      // generate js charsheet file
      fs.writeFileSync(
        destPath + '/' + fontName + '.js',
        'module.exports = ' + JSON.stringify(icons.map(icon => icon)) + ';',
        { encoding: 'utf8' }
      );
    })
    .catch();
});
