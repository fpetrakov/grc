#!/usr/bin/env node

const os = require("os");
const fs = require("fs");
const path = require("path");
const { Command } = require("commander");
const generateComponentFiles = require("./generateComponentFiles.js");

const program = new Command();

program
  .name("grc")
  .description("CLI to create React component files")
  .version("0.0.1");

program
  .argument("<name>", "name of the component")
  .option("-p, --path <path>", "path to folder with components")
  .action((name, options) => {
    const settingsFilePath = os.tmpdir() + "/.grcrc.json";

    if (!options.path && !fs.existsSync(settingsFilePath)) {
      throw Error("specify path to components folder");
    }

    if (options.path && !fs.existsSync(settingsFilePath)) {
      fs.writeFileSync(settingsFilePath, `{"path":"${options.path}"}`);
    }

    if (options.path && fs.existsSync(settingsFilePath)) {
      generateComponentFiles(options.path, name);
    } else {
      const { path } = JSON.parse(fs.readFileSync(settingsFilePath));
      generateComponentFiles(path, name);
    }
  });

program.parse();
