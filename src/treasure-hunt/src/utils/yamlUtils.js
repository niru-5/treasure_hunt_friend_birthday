import yaml from 'js-yaml';

// Example utility function to load a YAML file
export const loadYAMLFile = (filePath) => {
  try {
    const fileData = require(filePath);  // Import YAML file
    return yaml.load(fileData);
  } catch (e) {
    console.error("Failed to load YAML file:", e);
  }
};
