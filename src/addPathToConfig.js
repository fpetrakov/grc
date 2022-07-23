const addPathToConfig = (configPath, path, key) => {
  if (!fs.existsSync(configPath)) {
    const config = {};

    fs.writeFileSync(configPath, JSON.stringify(config));
  }

  const config = JSON.parse(fs.readFileSync(configPath));

  if (config[key]) throw Error("path with that key already exists");

  config[key] = path;

  fs.writeFileSync(configPath, JSON.stringify(config));

  console.log("Key was successfully added to config");
};

module.exports = addPathToConfig;
