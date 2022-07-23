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
      throw Error("specify path to components folder or path key");
    }

    if (!options.path && !fs.existsSync(configPath) && options.key) {
      throw Error(`there is not such key`);
    }

    if (options.path && options.key) {
      addPathToConfig(configPath, options.path, options.key);
      generateComponentFiles(options.path, name);
      return;
    }

    if (options.path && !options.key) {
      generateComponentFiles(options.path, name);
      return;
    }

    if (!options.path && options.key) {
      const path = JSON.parse(fs.readFileSync(configPath));
      generateComponentFiles(path[options.key], name);
      return;
    }
  });

program.parse();
