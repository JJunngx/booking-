const fs = require("fs").promises;

const cityAll = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.log(err);
  }
};
module.exports = cityAll;
