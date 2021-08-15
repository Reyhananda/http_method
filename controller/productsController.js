// Import Module Fs
const fs = require("fs");

// Export Fungsinya
module.exports = {
  getProducts: (req, res) => {
    let products = fs.readFileSync("./data/products.json");
    res.status(200).send(JSON.parse(products));
  },
  postProducts: (req, res) => {
    let products = JSON.parse(fs.readFileSync("./data/products.json"));
    // Push data ke products
    products.push(req.body);
    // Menulis kembali data yang sudah diubah
    fs.writeFileSync("./data/products.json", JSON.stringify(products));
    // Meminta Respon
    res.status(200).send(products);
  },
  patchProducts: (req, res) => {
    // Membaca data yang ada di Package.json
    let products = JSON.parse(fs.readFileSync("./data/products.json"));
    // Mencari index dari data & paramater query
    let idx = products.findIndex((item) => item.id == req.query.id);

    // Ubah data yg propertiesnya sama
    // Looping propertu di dalam products
    for (let prop in products[idx]) {
      // Looping properti di dalam request body
      for (let bodyProp in req.body) {
        // Bikin conditional u/ perbaharui data
        if (prop == bodyProp) {
          products[idx][prop] = req.body[bodyProp];
        }
      }
    }
    // Tulis Kembali data
    fs.writeFileSync("./data/products.json", JSON.stringify(products));
    // Kirim Respon
    res.status(200).send(products);
  },
};
