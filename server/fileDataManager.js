const fs = require("fs");

const saveDataToFile = (data, mangaData) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(mangaData, JSON.stringify(data, null, 2), "utf8", (err) => {
      if (err) {
        console.error("Error writing file:", err);
      } else {
        console.log(`Data written to file ${mangaData}`);
        resolve();
      }
    });
  });
};
const loadDataFromFile = (mangaData) => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(mangaData)) {
      resolve([]);
    } else {
      fs.readFile(mangaData, "utf8", (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(data));
        }
      });
    }
  });
};

module.exports = {
  saveDataToFile,
  loadDataFromFile,
};
