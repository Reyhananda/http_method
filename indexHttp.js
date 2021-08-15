// Import modul dari Node.js
const http = require("http");
// fs mengakses data
const fs = require("fs");
// manipulate input url dari user
const url = require("url");
// alamat port yang akan menjalankan aplikasi
const port = 2600;

const server = http.createServer((req, res) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Method": "GET,POST,PATCH,PUT,DELETE",
  };

  if (req.url.includes("/products")) {
    // Define productsnya
    var products = fs.readFileSync("./data/products.json");

    // Method apa yang digunakan
    if (req.method == "GET") {
      res.writeHead(200, headers);
      res.end(products);
    } else if (req.method == "POST") {
      // Variable untuk memapung data
      let body = [];
      products = JSON.parse(products);
      req
        .on("data", (chunk) => {
          body.push(chunk);
        })
        .on("end", () => {
          // Convert dari biner ke string
          body = Buffer.concat(body).toString();
          products.push(JSON.parse(body));
          fs.writeFileSync("./data/products.json", JSON.stringify(products));
          res.writeHead(201, headers);
          res.end(fs.readFileSync("./data/products.json"));
        });
    } else if (req.method == "PUT") {
      // Kirim Query Parameters melalui URL
      req.query = url.parse(req.url, true).query;
      // Ganti id jadi string
      req.query.id = parseInt(req.query.id);

      let body = [];
      products = JSON.parse(products);
      req
        .on("data", (chunk) => {
          body.push(chunk);
        })
        .on("end", () => {
          // ambil index data baru diubah
          body = JSON.parse(Buffer.concat(body).toString());
          let idx = products.findIndex((item) => item.id == req.query.id);
          products[idx] = body;
          fs.writeFileSync("./data/products.json", JSON.stringify(products));
          res.writeHead(200, headers);
          res.end(fs.readFileSync("./data/products.json"));
        });
    } else if (req.method == "PATCH") {
      req.query = url.parse(req.url, true).query;
      req.query.id = parseInt(req.query.id);
      // menyimpan data
      let body = [];
      // Membaca data
      products = JSON.parse(products);
      req
        .on("data", (chunk) => {
          body.push(chunk);
        })
        .on("end", () => {
          body = JSON.parse(Buffer.concat(body).toString());
          let idx = products.findIndex((item) => item.id == req.query.id);
          // Membandingkan pakah properti yang dikirmkan oleh body == propeties yg telah disimpan
          for (let prop in products[idx]) {
            for (let bodyProp in body) {
              // Jika properti sama maka diperbaharui
              if (prop == bodyProp) {
                // Dua duana berbentuk string
                products[idx][prop] = body[bodyProp];
              }
            }
          }
          fs.writeFileSync("./data/products.json", JSON.stringify(products));
          res.writeHead(200, headers);
          res.end(fs.readFileSync("./data/products.json"));
        });
    } else if (req.method == "DELETE") {
      // Mencari index & hapus dengan metode splice
      req.query = url.parse(req.url, true).query;
      req.query.id = parseInt(req.query.id);

      // mengahpus data
      products = JSON.parse(products);
      let idx = products.findIndex((item) => item.id == req.query.id);
      products.splice(idx, 1);

      //Menulis datanya
      fs.writeFileSync("./data/products.json", JSON.stringify(products));
      res.writeHead(200, headers);

      // Mengirim data baru & memastikan datanya paling baru
      res.end(fs.readFileSync("./data/products.json"));
    }
  }
});

// Jalankan Servernya
server.listen(port, () => console.log("Server Running:", port));
