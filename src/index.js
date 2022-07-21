#!/usr/bin/env node

const { Command } = require("commander");
const generateComponentFiles = require("./generateComponentFiles.js");

const program = new Command();

program
  .name("grc")
  .description("CLI to create React component files")
  .version("0.0.1");

program
  .argument("<path>", "path to folder with components")
  .argument("<name>", "name of the component")
  .action((path, name) => {
    generateComponentFiles(path, name);
  });

program.parse();
