const fs = require("fs");
const UglifyJS = require("uglify-js");

// Minify and obfuscate the contentScript.js file
const contentScript = fs.readFileSync("contentScript.js", "utf8");
const uglifiedContentScript = UglifyJS.minify(contentScript, { mangle: true });
fs.writeFileSync("contentScript.min.js", uglifiedContentScript.code);

// Minify and obfuscate the options.js file
const optionsScript = fs.readFileSync("options.js", "utf8");
const uglifiedOptionsScript = UglifyJS.minify(optionsScript, { mangle: true });
fs.writeFileSync("options.min.js", uglifiedOptionsScript.code);


const sass = require('node-sass');
const fs = require('fs');

// Compile the Sass files to CSS
const result = sass.renderSync({
  file: 'src/style.scss'
});
fs.writeFileSync('style.css', result.css);
