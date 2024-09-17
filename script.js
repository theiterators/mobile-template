#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const chalk = require("chalk");

const { prompt } = inquirer.default;
const rootPath = process.cwd();
const ciCdFolder = path.join(rootPath, "ci-cd");

// File options based on choice
const choices = {
  Expo: {
    source: "expo.gitlab-ci.yml",
    destination: ".gitlab-ci.yml",
  },
  "Bare fastlane": {
    source: "fastlane.gitlab-ci.yml",
    destination: ".gitlab-ci.yml",
  },
};
// Prompt user for CI/CD option
const questionMessage = chalk.red.bold(
  "Which CI/CD setup would you like to use?"
);
prompt([
  {
    type: "list",
    name: "ciOption",
    message: questionMessage,
    choices: Object.keys(choices),
  },
])
  .then((answers) => {
    const { ciOption } = answers;
    const sourcePath = path.join(ciCdFolder, choices[ciOption].source);
    const destinationPath = path.join(rootPath, choices[ciOption].destination);
    switch (ciOption) {
      case "Expo":
        fs.copyFile(sourcePath, destinationPath, (err) => {});
        fs.rmSync(path.join(rootPath, "fastlane"), {
          recursive: true,
          force: true,
        });
        break;
      case "Bare fastlane":
        fs.copyFile(sourcePath, destinationPath, (err) => {});
        break;
      default:
        break;
    }
    fs.rmSync(ciCdFolder, { recursive: true, force: true });
  })
  .catch((error) => {
    console.error("Error during CI/CD setup:", error);
  });
