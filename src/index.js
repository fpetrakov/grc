#!/usr/bin/env node

const os = require("os");
const fs = require("fs");
const { Command } = require("commander");

const addPathToConfig = require("./addPathToConfig");
const generateComponentFiles = require("./generateComponentFiles.js");

const program = new Command();

program
  .name("grc")
  .description("CLI to create React components")
  .version("0.1.0");

program
  .argument("<name>", "component's name")
  .option("-p, --path <path>", "components folder path")
  .option("-k, --key <key>", "key to path from config")
  .action((name, options) => {
    const configPath = os.tmpdir() + "/.grcrc.json";

    if (!options.path && !options.key) {
      console.error("specify path to components folder or path key");
      process.exit(1);
    }

    if (!options.path && !fs.existsSync(configPath) && options.key) {
      console.error(`there is not such key`);
      process.exit(1);
    }

    if (options.path && options.key) {
      addPathToConfig(configPath, options.path, options.key);
      generateComponentFiles(options.path, name);
      process.exit(0);
    }

    if (options.path && !options.key) {
      generateComponentFiles(options.path, name);
      process.exit(0);
    }

    if (!options.path && options.key) {
      const path = JSON.parse(fs.readFileSync(configPath));
      generateComponentFiles(path[options.key], name);
      process.exit(0);
    }
  });

program.parse();
