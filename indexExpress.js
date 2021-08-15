// Import Library
const express = require("express");

// Library Cors ( Untuk Memberikan izin akses dari front end )
const cors = require("cors");

// Library bodyParser (menerjemahkan data body yang dikirim oleh url request front end )
const bodyParser = require("body-parser");

// Library fs & port
const fs = require("fs");
const PORT = 2601;

// Buat app Expressnya
const app = express();

// Menjalankan body-Parser dan Corse
app.use(cors());
app.use(bodyParser());

const { productsRouter } = require("./router");

app.use("/data", productsRouter);

// Running Servernya
app.listen(PORT, () => console.log("Server Running at PORT :", PORT));
