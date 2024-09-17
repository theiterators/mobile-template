#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

// Get the app name from the command-line arguments (passed by React Native)
const appName = process.argv[2];

console.log(appName);
// // Path to `app.json` and `package.json`
// const appJsonPath = path.join(__dirname, 'app.json');
// const packageJsonPath = path.join(__dirname, 'package.json');

// // Function to update `app.json`
// const updateAppJson = () => {
//   fs.readFile(appJsonPath, 'utf8', (err, data) => {
//     if (err) {
//       console.error('Error reading app.json:', err);
//       return;
//     }
//     const appJson = JSON.parse(data);
//     appJson.name = appName; // Update the app name
//     appJson.displayName = appName;

//     fs.writeFile(appJsonPath, JSON.stringify(appJson, null, 2), (err) => {
//       if (err) {
//         console.error('Error writing app.json:', err);
//       } else {
//         console.log(`app.json updated with app name: ${appName}`);
//       }
//     });
//   });
// };

// // Function to update `package.json`
// const updatePackageJson = () => {
//   fs.readFile(packageJsonPath, 'utf8', (err, data) => {
//     if (err) {
//       console.error('Error reading package.json:', err);
//       return;
//     }
//     const packageJson = JSON.parse(data);
//     packageJson.name = appName; // Update the app name

//     fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), (err) => {
//       if (err) {
//         console.error('Error writing package.json:', err);
//       } else {
//         console.log(`package.json updated with app name: ${appName}`);
//       }
//     });
//   });
// };

// // Run both updates
// updateAppJson();
// updatePackageJson();
