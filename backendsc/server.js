// import modul
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

// inisialisasi aplikasi
const app = express();
const port = 3001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// url koneksi ke database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sinkcaredb",
});

connection.connect((error) => {
  if (error) {
    console.error("Error connecting to database", error);
  } else {
    console.log("connected to database");
  }
});

// menambahkan middleware cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //mengizinkan permintaan dari asal apapun
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// POST /product
app.post("/pemesanan", (req, res) => {
  const { nama, alamat, telp, ukuran, kodepr, waktutgl } = req.body;

  const query = "INSERT INTO formpemesanan (nama, alamat, telp, ukuran, kodepr, waktutgl) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [nama, alamat, telp, ukuran, kodepr, waktutgl];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error("Error posting product: ", err);
      res.status(500).send("Error posting product");
    } else {
      console.log("Product posted successfully");
      res.status(200).send("Product posted successfully");
    }
  });
});

// GET /product
app.get("/pemesanan", (req, res) => {
  const query = "SELECT * FROM formpemesanan";

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error querying database:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(results).status(200);
    }
  });
});

// POST /pesanan
app.post("/order_product", (req, res) => {
    const { name, no_telp, tgl_kunjung } = req.body;
  
    const query = "INSERT INTO order_product (name, no_telp, tgl_kunjung) VALUES (?, ?, ?)";
    const values = [name, no_telp, tgl_kunjung];
  
    connection.query(query, values, (err, results) => {
      if (err) {
        console.error("Error to orders product: ", err);
        res.status(500).send("Error to orders product");
      } else {
        console.log("orders product successfully");
        res.status(200).send("orders product successfully");
      }
    });
  });
  
  // GET /product
  app.get("/order_product", (req, res) => {
    const query = "SELECT * FROM order_product";
  
    connection.query(query, (error, results) => {
      if (error) {
        console.error("Error querying database:", error);
        res.status(500).json({ error: "Internal server error" });
      } else {    
        res.json(results).status(200);
      }
    });
  });

app.listen(port, () => {
  console.log("Server running on port 3001");
});