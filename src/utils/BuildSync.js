// this code should run together with npm run build, and should copy the build server to the public server of ../thesis-server
const fse = require("fs-extra");

const srcDir = `build`;
const destDir = `../../../thesis-server/public`;

// To copy a folder or file
fse.copySync(srcDir, destDir, { overwrite: true }, function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log("success!");
  }
});
