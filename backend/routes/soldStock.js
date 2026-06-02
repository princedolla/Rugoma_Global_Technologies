const router = require("express").Router();
const db = require("../config/db");
const verifyToken = require("../middleware/authMiddleware");


// ======================
// GET SOLD STOCK
// ======================
router.get("/", verifyToken, (req, res) => {
  const sql = `
    SELECT 
      s.s_id,
      s.p_id,
      s.sale_date,
      s.quantity,
      s.amount,
      p.stock_name
    FROM sold_stock s
    JOIN purchased_stock p ON s.p_id = p.p_id
    WHERE s.user_id = ?
    ORDER BY s.s_id DESC
  `;

  db.query(sql, [req.user.id], (err, result) => {
    if (err) return res.status(500).json({ message: "DB error" });
    res.json(result);
  });
});


// ======================
// SELL STOCK (USING PURCHASE AMOUNT)
// ======================
router.post("/", verifyToken, (req, res) => {
  let { p_id, sale_date, quantity } = req.body;

  p_id = Number(p_id);
  quantity = Number(quantity);

  if (!p_id || !sale_date) {
    return res.status(400).json({ message: "Select stock and date" });
  }

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ message: "Invalid quantity" });
  }

  // 1. GET PURCHASE DATA
  const checkSql =
    "SELECT * FROM purchased_stock WHERE p_id=? AND user_id=?";

  db.query(checkSql, [p_id, req.user.id], (err, result) => {
    if (err) return res.status(500).json({ message: "DB error" });

    if (result.length === 0) {
      return res.status(404).json({ message: "Stock not found" });
    }

    const stock = result[0];

    // 2. CHECK STOCK
    if (stock.quantity < quantity) {
      return res.status(400).json({
        message: "Not enough stock available",
      });
    }

    // 3. CALCULATE AMOUNT FROM PURCHASE RECORD (PROPORTIONAL)
    const totalAmount =
      (stock.amount / stock.quantity) * quantity;

    // 4. UPDATE STOCK
    const updateSql =
      "UPDATE purchased_stock SET quantity = quantity - ? WHERE p_id=? AND user_id=?";

    db.query(updateSql, [quantity, p_id, req.user.id], (err2) => {
      if (err2) return res.status(500).json({ message: "Update error" });

      // 5. INSERT SOLD
      const insertSql = `
        INSERT INTO sold_stock
        (p_id, sale_date, quantity, amount, user_id)
        VALUES (?, ?, ?, ?, ?)
      `;

      db.query(
        insertSql,
        [p_id, sale_date, quantity, totalAmount, req.user.id],
        (err3) => {
          if (err3) return res.status(500).json({ message: "Insert error" });

          res.json({
            message: "Stock sold successfully",
            amount: totalAmount,
          });
        }
      );
    });
  });
});


// ======================
// DELETE SOLD STOCK
// ======================
router.delete("/:id", verifyToken, (req, res) => {
  db.query(
    "DELETE FROM sold_stock WHERE s_id=? AND user_id=?",
    [req.params.id, req.user.id],
    (err) => {
      if (err) return res.status(500).json({ message: "Delete error" });
      res.json({ message: "Deleted successfully" });
    }
  );
});

module.exports = router;