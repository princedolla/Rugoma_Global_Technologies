const router = require("express").Router();
const db = require("../config/db");
const verifyToken = require("../middleware/authMiddleware");

// ======================
// GET PURCHASED STOCK
// ======================
router.get("/", verifyToken, (req, res) => {
  const sql = `
    SELECT * 
    FROM purchased_stock 
    WHERE user_id = ?
    ORDER BY p_id DESC
  `;

  db.query(sql, [req.user.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// ======================
// ADD PURCHASED STOCK
// ======================
router.post("/", verifyToken, (req, res) => {
  const { stock_name, purchase_date, quantity, amount } = req.body;

  const sql = `
    INSERT INTO purchased_stock
    (stock_name, purchase_date, quantity, amount, user_id)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [stock_name, purchase_date, quantity, amount, req.user.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json("Stock Added");
    },
  );
});

// ======================
// UPDATE PURCHASED STOCK
// ======================
router.put("/:id", verifyToken, (req, res) => {
  const { stock_name, purchase_date, quantity, amount } = req.body;

  const sql = `
    UPDATE purchased_stock
    SET stock_name=?, purchase_date=?, quantity=?, amount=?
    WHERE p_id=? AND user_id=?
  `;

  db.query(
    sql,
    [stock_name, purchase_date, quantity, amount, req.params.id, req.user.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json("Updated");
    },
  );
});

// ======================
// DELETE PURCHASED STOCK
// ======================
router.delete("/:id", verifyToken, (req, res) => {
  const sql = `
    DELETE FROM purchased_stock 
    WHERE p_id=? AND user_id=?
  `;

  db.query(sql, [req.params.id, req.user.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json("Deleted");
  });
});

module.exports = router;
