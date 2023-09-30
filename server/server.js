import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud_express",
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM student ORDER BY id DESC";
  db.query(sql, (err, result) => {
    if (err) return res.json({ message: "Error inside server" });
    return res.json(result);
  });
});

app.post("/student", (req, res) => {
  const sql = "INSERT INTO student (name,email) VALUES(?)";
  const values = [req.body.name, req.body.email];
  console.log(req.body);
  db.query(sql, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

app.get("/read/:id", (req, res) => {
  const sql = "SELECT * FROM student WHERE id = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ message: "Error inside server" });
    return res.json(result);
  });
});

app.put("/update/:id", (req, res) => {
  const sql = "UPDATE student SET name=?, email=? WHERE id =?";
  const id = req.params.id;
  db.query(sql, [req.body.name, req.body.email, id], (err, result) => {
    if (err) return req.json({ message: "error inside server" });
    return res.json(result);
  });
});

app.delete("/delete/:id", (req, res) => {
  const sql = "DELETE FROM student WHERE id = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ message: "Error inside server" });
    return res.json(result);
  });
});

// app.post("/student", (req, res) => {
//   const sql = "INSERT INTO student (name, email) VALUES (?, ?)";
//   const values = [req.body.name, req.body.email];

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error("Error inserting into the database:", err);
//       return res.status(500).json({ error: "Internal server error" });
//     }

//     console.log("User added:", result);
//     return res.status(201).json({ message: "User added successfully" });
//   });
// });

app.listen(8080, () => {
  console.log("Port listening at port 8080 ");
});
