var builder = require('iconfont-builder');
var path = require('path');
var glob = require('glob');
var fs = require('fs');
var parser = require('argv-parser');

var params = parser.parse(process.argv, {
  rules: {
    src: {
      type: String,
      short: 's',
      value: (src, passed, tool) => {
        if (!src) {
          return;
        }

        if (!fs.existsSync(src)) {
          tool.error('Source directory is not exist');
          return;
        }

        return src;
      }
    },
    dest: {
      type: String,
      short: 'd',
      value: (dest, passed, tool) => {
        if (!dest) {
          return;
        }

        if (!fs.existsSync(dest)) {
          tool.error('Destination directory is not exist');
          return;
        }

        return dest;
      }
    },
    glyphMap: {
      type: String,
      short: 'gl',
      value: (dest, passed, tool) => {
        if (!dest) {
          return false;
        }

        if (!fs.existsSync(path.dirname(dest))) {
          tool.error('Directory of GlyphMap is not exist');
          return;
        }

        return dest;
      }
    },
    font: {
      type: String,
      short: 'f',
      value: (font, passed, tool) => {
        if (!font) {
          font = 'quangthinh';
        }

        return font;
      }
    }
  }
});

var sourcePath = params.parsed.src;
var destPath = params.parsed.dest;
var fontName = params.parsed.font;
var glyphMap = params.parsed.glyphMap;

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
      codepoint: codepoint++
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
      console.log('font generated');

      // gen glyph
      if (glyphMap) {
        // generate js charsheet file
        const iconsKv = {};
        icons.forEach(icon => {
          iconsKv[icon.name] = icon.codepoint;
        });

        // code => char
        fs.writeFileSync(glyphMap, JSON.stringify(iconsKv), {
          encoding: 'utf8'
        });

        console.log('glyph map generated');
      }
    })
    .catch();
});
