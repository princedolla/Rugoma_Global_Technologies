const router = require("express").Router();
const db = require("../config/db");
const verifyToken = require("../middleware/authMiddleware");
// REPORT SUMMARY
router.get("/summary", verifyToken, (req, res) => {
  // TOTAL PURCHASED STOCK
  const purchasedSql = ` SELECT  COUNT(*) AS totalPurchased, IFNULL(SUM(amount),0) AS purchaseAmount FROM purchased_stock`;
  // TOTAL SOLD STOCK
  const soldSql = ` SELECT  COUNT(*) AS totalSold, IFNULL(SUM(amount),0) AS salesAmount FROM sold_stock`;
  db.query(purchasedSql, (err, purchasedResult) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    db.query(soldSql, (err, soldResult) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      const summary = {
        totalPurchased: purchasedResult[0].totalPurchased,
        purchaseAmount: purchasedResult[0].purchaseAmount,
        totalSold: soldResult[0].totalSold,
        salesAmount: soldResult[0].salesAmount,
      };
      res.json(summary);
    });
  });
});

module.exports = router;
