const router = require("express").Router();
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ========================
// REGISTER
// ========================
router.post("/register", (req, res) => {
  const { username, password } = req.body;

  // VALIDATION
  if (!username || !password) {
    return res.status(400).json("Username and password are required");
  }
  const checkUser = "SELECT * FROM users WHERE username=?";
  db.query(checkUser, [username], async (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length > 0) {
      return res.status(400).json("Username already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO users(username,password) VALUES(?,?)";
    db.query(sql, [username, hashedPassword], (err) => {
      if (err) return res.status(500).json(err);

      res.json("Registered Successfully");
    });
  });
});

// ========================
// LOGIN
// ========================
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  // VALIDATION
  if (!username || !password) {
    return res.status(400).json("Username and password are required");
  }
  const sql = "SELECT * FROM users WHERE username=?";

  db.query(sql, [username], async (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0) {
      return res.status(404).json("User Not Found");
    }
    const user = result[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json("Invalid Password");
    }
    const token = jwt.sign({ id: user.user_id }, "secretkey", {
      expiresIn: "1d",
    });

    res.json({
      token,
      user,
    });
  });
});

module.exports = router;
