// Method GET gaperlu pake condition
app.get("/", (req, res) => {
  // Memberikan Respon & Bisa Bermacam Macam
  res.status(200).send(`<h2>Hello, Express</h2>`);
});

// Get dariproducts
app.get("/products", (req, res) => {
  // Ubah jadi JSON Objects
  let products = JSON.parse(fs.readFileSync("./data/products.json"));
  res.status(200).send(products);
});

// Ubah jadi JSON Objects
let products = JSON.parse(fs.readFileSync("./data/products.json"));

// Method POST
app.post("/products", (req, res) => {
  // Mengecek datanya dimana
  console.log(req.body);
  // Push data ke products
  products.push(req.body);
  // Menulis kembali data yang sudah diubah
  fs.writeFileSync("./data/products.json", JSON.stringify(products));
  // Meminta Respon
  res.status(200).send(products);
});

app.patch("/products", (req, res) => {
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
});

// Method DELETE
app.delete("/products", (req, res) => {
  // Membaca data yang ada di Package.json
  let products = JSON.parse(fs.readFileSync("./data/products.json"));
  // Mencari index dari data & paramater query
  let idx = products.findIndex((item) => item.id == req.query.id);
  // Menghapus data pake splice
  products.splice(idx, 1);
  // Tulis Kembali data
  fs.writeFileSync("./data/products.json", JSON.stringify(products));
  // Kirim Respon
  res.status(200).send(products);
});
